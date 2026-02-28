import qs from 'qs';
import axios from 'axios';

// 定义 pendingMap 类型（Map<请求唯一标识, 中断控制器>)
const pendingMap = new Map<string, AbortController>();

// 是否正在刷新Token 防止多个请求同时触发刷新
let isRefreshing = false;

// 等待重发的请求队列 每个元素是一个函数，调用它会重新发请求
let requestsQueue: Array<() => void> = [];

// 生成请求唯一标识的工具函数
const getRequestKey = (config: any): string => {
  const { method, url, data } = config;
  return [method, url, qs.stringify(data)].join('&');
};

// 创建 axios 实例
const instance = axios.create({
  baseURL: '/api', // 基础 URL，所有请求都会自动加这个前缀
  timeout: 10000, // 请求超时时间（10秒）
});

// 请求拦截器
instance.interceptors.request.use(
  // 成功的回调
  (config) => {
    // 生成当前请求的唯一标识
    const requestKey = getRequestKey(config);

    // 检查这个请求是否正在进行中
    if (pendingMap.has(requestKey)) {
      // 如果已存在，说明是重复请求, 直接取消它
      const controller = new AbortController(); // 创建中断控制器
      config.signal = controller.signal; // 把信号绑定到请求配置上
      controller.abort('重复请求已取消'); // 立即中断请求
    } else {
      // 如果不存在，说明是新请求，给它创建一个 AbortController
      const controller = new AbortController();
      config.signal = controller.signal;
      pendingMap.set(requestKey, controller); //把请求标识和取消按钮存进pendingMap，方便后面检查和清理
    }

    // 返回配置，让请求继续发送
    return config;
  },
  // 失败的回调
  (error) => {
    // 如果拦截器本身出错了，直接抛出
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功时执行 比如返回200状态码
  (response) => {
    // 从响应对象里拿到原始请求配置
    // axios会把请求时的config保存在响应对象的config属性里
    const requestKey = getRequestKey(response.config);

    // 从Map里删除这个记录
    pendingMap.delete(requestKey);

    // 把响应数据返回给调用方
    // 返回response，否则调用request.get()时拿不到数据
    return response;
  },
  // 请求失败时执行 比如404、500、或者被abort
  async (error) => {
    // 判断是否是重复的请求
    // 判断是否有config 网络完全断开是undefined
    if (error.config) {
      // 生成请求key并从Map删除
      const requestKey = getRequestKey(error.config);
      pendingMap.delete(requestKey);
    }

    // 401 Token过期处理
    // 先解构出response和config
    const { response, config } = error;

    // 判断是否是401错误
    if (response && response.status === 401) {
      // 当前没有正在刷新的请求
      if (!isRefreshing) {
        // 标记正在刷新，防止其他请求也触发刷新
        isRefreshing = true;

        // 发起刷新Token的请求
        try {
          // 发起刷新Token请求 不能经过有401拦截的instance
          // 如果用await instance.post，instance有响应拦截器返回401，又进入刷新逻辑造成死循环
          const refreshToken = localStorage.getItem('refreshToken');
          const res = await axios.post('/api/refresh-token', {
            refreshToken: refreshToken,
          });

          // 保存新Token到localStorage
          const newToken = res.data.token; //服务器返回的数据
          localStorage.setItem('token', newToken); //浏览器本地存储，刷新页面后还在

          // 更新当前instance的请求头（后续请求要用新Token）
          instance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

          // 重发队列里等待的所有请求
          requestsQueue.forEach((cb) => cb());

          // 清空队列
          requestsQueue = [];

          // 重发当前这个报错的请求
          return instance(config);
        } catch (refreshError) {
          // 刷新Token失败，说明refreshToken也过期了
          // 清空所有存储的token 避免过期token导致死循环
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');

          // 跳转到登录页 用户需要重新登录获取新token
          window.location.href = '/login';

          // 抛出错误，停止队列重发等后续操作
          return Promise.reject(refreshError);
        } finally {
          // 3. 无论成功失败，都要重置状态
          isRefreshing = false;
        }
      }
      // 已经有请求在刷新了
      else {
        // 已经有请求在刷新Token了，当前请求加入队列等待
        return new Promise((resolve) => {
          requestsQueue.push(() => {
            // 刷新完成后，用新Token重发请求
            resolve(instance(config));
          });
        });
      }
    }

    // 判断是否是主动取消的请求
    if (axios.isCancel(error)) {
      // 如果是取消的请求，静默处理，不抛出错误
      // 这样控制台就不会显示红色的Uncaught Error
      console.log('重复请求已被拦截');
      return Promise.reject({ isCanceled: true, message: error.message });
    }

    // 其他真正的错误（404、500等），正常抛出
    return Promise.reject(error);
  },
);
