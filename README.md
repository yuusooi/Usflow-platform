# UsFlow Platform

**在线体验**: [UsFlow流程协作平台](https://usflow-platform.vercel.app/)

UsFlow 是一个基于现代前端技术栈构建的企业级流程协作中台工程实践。本项目采用 Monorepo 架构，重点对前端请求治理、配置驱动表单、RBAC 权限模型以及大模型（LLM）能力的业务集成进行了基础架构层面的封装。

---

## 技术栈

- **核心框架**: React 19.2.0, TypeScript 5.x
- **构建工具**: Vite 7.3.1
- **路由管理**: React Router 7.13.1
- **状态管理**: Zustand 5.0.11

---

## 工程架构 (Monorepo)

项目基于 `pnpm workspace` 进行模块化管理，按照领域驱动设计原则分离关注点，实现基础建设与业务逻辑的物理隔离：

```text
usflow-platform/
├── packages/
│   ├── app/                 # 应用层：包含路由装配、全局状态管理及具体业务页面
│   ├── pro-components/      # 业务组件层：封装复合型业务组件（如 ProTable、SchemaForm）
│   ├── components/          # 基础 UI 层：提供无状态的通用基础组件（如 AuthCode、ErrorBoundary）
│   └── utils/               # 基础设施层：纯函数工具集、HTTP 请求基座、通用 Hook (useVirtualList)
└── pnpm-workspace.yaml      # 工作区依赖配置
```

---

## 核心技术实现

### 1. 请求与异常治理体系

- **请求防重与并发控制**：基于 Axios 与 `AbortController`，通过 `method + url + data` 生成唯一哈希作为 Key，利用 Map 结构实现请求的精准去重与并发状态（Pending）锁定。
- **双 Token 无感刷新**：在 Axios 拦截器层捕获 401 状态码，配合请求队列（Queue）机制，实现 Refresh Token 的自动换取与失败请求的无感重发。
- **服务降级兜底**：构建全局错误边界（ErrorBoundary），并在 HTTP 层侦测到 500+ 状态码时，触发自定义 `SERVICE_DOWN` 全局事件，联动 UI 层展示降级状态。

### 2. RBAC 动态权限模型

- **安全存储**：采用 Zustand 结合 persist 中间件管理状态，底座接入 `crypto-js` 实现本地 AES 加密存储，支持菜单树（menuTree）与扁平权限码（permissionCodes）双模式。
- **细粒度访问控制**：
  - **路由级**：封装 `<Guard>` 组件包裹页面，在 React Router 渲染周期内执行运行时鉴权拦截。
  - **组件级**：提供 `<AuthCode>` 容器组件，实现按钮及微观 UI 元素的细粒度渲染控制。

### 3. Schema 驱动表单与 AI 填单集成

- **配置化表单引擎 (`SchemaForm`)**：构建基于 JSON Schema 驱动的表单渲染引擎。支持内部组件的自动映射，并提供 `dependencies` 数组声明与 `hidden/visible` 计算函数，解决复杂表单项之间的联动依赖问题。
- **大模型能力接入**：集成 DeepSeek API 用于非结构化文本的命名实体识别（NER）。通过 System Prompt 严格约束 JSON 输出格式，前端增加正则表达式清洗 Markdown 标记及 `try-catch` 解析兜底机制，目前应用于请假申请表单的自动化信息提取与回填。

### 4. 渲染与构建性能优化

- **长列表渲染机制**：不依赖第三方库，内部实现 `useVirtualList` 钩子。通过 `Math.floor(scrollTop / itemHeight)` 动态计算当前可视区域的 `startIndex`，将万级数据列表的 DOM 渲染规模稳定在常数级别（O(1) 复杂度）。
- **构建体积控制**：定制 Vite 的 `manualChunks` 分包策略，结合底层 Tree-Shaking 机制，分离第三方依赖与核心业务代码，优化首屏加载的关键渲染路径（LCP）。

---

## 快速开始

```bash
# 克隆项目
git clone https://github.com/xxx/usflow-platform.git

# 安装依赖
pnpm install

# 启动开发服务器
pnpm --filter @usflow/app run dev
```

---

## 待完善功能 (Roadmap)

本项目侧重于前端基础架构的搭建，部分涉及复杂业务链路的功能仍处于预留或开发阶段：

- **流程设计器**：ReactFlow 相关依赖已引入且路由已预留配置，具体节点编排逻辑待实现。
- **审批流引擎闭环**：当前提供请假申请作为 AI 与表单联动示例，尚未对接真实的后端工作流引擎 API。
- **工程化测试**：自动化单元测试需进一步补全。

## License

[MIT](./LICENSE) License © 2026-PRESENT
