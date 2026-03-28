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
  timeout?: number;
}

// API 端点：通过 Vercel Serverless Function 调用
const API_URL = '/api/extract-leave-info';

// 从文本中提取请假信息
export async function extractLeaveInfo(
  text: string,
  options: AIServiceOptions = {},
): Promise<AIExtractResult> {
  const { timeout = 30000 } = options;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(timeout),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `API 请求失败：${response.status}`);
    }

    const result = await response.json();
    return result as AIExtractResult;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`AI 提取失败：${error.message}`);
    }
    throw new Error('AI 提取失败：未知错误');
  }
}
