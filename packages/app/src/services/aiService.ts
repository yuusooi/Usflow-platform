// AI智能填单服务
// 从用户的自然语言中提取表单数据

// AI提取的结果类型
interface AIExtractResult {
  leaveType: '病假' | '事假' | '年假' | null;
  days: number | null;
  reason: string | null;
}

// AI服务的配置选项
interface AIServiceOptions {
  maxRetries?: number;
  timeout?: number;
}

// 从环境变量读取 API Key
const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

// DeepSeek API 端点
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

// 从文本中提取请假信息
// 从用户的自然语言描述中提取请假信息 返回提取的结构化数据
export async function extractLeaveInfo(
  text: string,
  options: AIServiceOptions = {},
): Promise<AIExtractResult> {
  // 解构配置，设置默认值
  const { maxRetries = 2, timeout = 30000 } = options;

  // System Prompt（系统提示词）
  const systemPrompt = `你是一个企业级表单数据提取助手。你的任务是从用户的自然语言描述中提取请假信息。
  输出格式要求：
  1. 必须严格按照以下 JSON Schema 输出
  2. 不要输出任何 Markdown 标记（如 \`\`\`json）
  3. 不要输出任何解释性文字
  4. 直接输出 JSON 对象，不要有其他内容

  JSON Schema：
  {
    "leaveType": "病假" | "事假" | "年假" | null,
    "days": number | null,
    "reason": string | null
  }

  字段说明：
  - leaveType: 请假类型，必须是"病假"、"事假"、"年假"之一，如果用户没提到就是 null
  - days: 请假天数（数字），如果用户没提到就是 null
  - reason: 请假原因（字符串），如果用户没提到就是 null

  示例：
  输入："我因为感冒发烧需要请3天病假"
  输出：{"leaveType":"病假","days":3,"reason":" 感冒发烧"}

  输入："下周有事要请假5天"
  输出：{"leaveType":"事假","days":5,"reason":" 有事"}

  输入："我要申请年假"
  输出：{"leaveType":"年假","days":null,"reason":null}`;

  // 用户消息
  const userMessage = `请从以下文本中提取请假信息：${text}`;

  //调用DeepSeek API
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.1, // 温度越低输出越稳定
        max_tokens: 500,
      }),
      signal: AbortSignal.timeout(timeout),
    });

    // 检查HTTP状态码
    if (!response.ok) {
      throw new Error(`API 请求失败：${response.status}`);
    }

    // 解析响应
    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('AI 没有返回任何内容');
    }

    // 解析JSON
    const result = parseJSONWithRetry(content, maxRetries);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`AI 提取失败：${error.message}`);
    }
    throw new Error('AI 提取失败：未知错误');
  }
}

// 辅助函数：带重试的JSON解析
// 解析 JSON，如果失败则清理后重试
// @param content - AI 返回的内容
// @param retriesLeft - 剩余重试次数
// @returns 解析后的对象
function parseJSONWithRetry(content: string, retriesLeft: number): AIExtractResult {
  try {
    // 直接解析
    const parsed = JSON.parse(content);
    return parsed as AIExtractResult;
  } catch (error) {
    // 解析失败，尝试清理后重试
    if (retriesLeft > 0) {
      console.warn('JSON 解析失败，尝试清理后重试...', content);

      // 清理策略 1：去除 Markdown 代码块标记
      let cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');

      // 清理策略 2：去除开头和结尾的非 JSON  内容
      cleaned = cleaned.trim();

      // 重新尝试解析
      return parseJSONWithRetry(cleaned, retriesLeft - 1);
    }

    // 重试次数用完，抛出错误
    throw new Error(`JSON 解析失败：${content}`);
  }
}
