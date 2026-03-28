// Vercel Serverless Function
// 位置：packages/app/api/extract-leave-info.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid text parameter' });
  }

  // 从服务端环境变量读取 API Key（不需要 VITE_ 前缀）
  const API_KEY = process.env.DEEPSEEK_API_KEY;

  if (!API_KEY) {
    console.error('DEEPSEEK_API_KEY not configured in environment variables');
    return res.status(500).json({ error: 'API key not configured on server' });
  }

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
输出：{"leaveType":"病假","days":3,"reason":"感冒发烧"}

输入："下周有事要请假5天"
输出：{"leaveType":"事假","days":5,"reason":"有事"}

输入："我要申请年假"
输出：{"leaveType":"年假","days":null,"reason":null}`;

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `请从以下文本中提取请假信息：${text}` },
        ],
        temperature: 0.1,
        max_tokens: 500,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error:', response.status, errorText);
      return res.status(response.status).json({ error: `API request failed: ${response.status}` });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ error: 'AI returned no content' });
    }

    // 解析 JSON（带容错）
    let cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(cleaned);

    return res.status(200).json(result);
  } catch (error) {
    console.error('AI extraction error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
