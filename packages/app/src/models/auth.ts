/**
 * 菜单权限项的类型定义
 * 对应后端返回的树形结构中的每一个节点
 */
export interface MenuItem {
  // 权限标识，用于按钮级控制，如 'sys:user:add'
  code: string;
  // 菜单/权限名称，用于侧边栏显示
  name: string;
  // 路由路径，如 '/system/user'
  path?: string;
  // 图标名称
  icon?: string;
  // 子菜单列表（树形结构的核心）
  children?: MenuItem[];
}

/**
 * 用户信息类型定义
 * 登录成功后后端返回的用户基本信息
 */
export interface UserInfo {
  // 用户ID
  id: string | number;
  // 用户名
  username: string;
  // 真实姓名
  realName?: string;
  // 头像URL
  avatar?: string;
  // 角色ID列表，一个用户可能有多个角色 字符串或数字的数组
  roleIds?: (string | number)[];
}

// 登录表单需要提交给后端的数据结构
// 定义登录接口需要的参数
export interface LoginParams {
  // 用户名或邮箱
  username: string;
  // 密码
  password: string;
}

// 登录响应数据类型
// 后端登录接口返回的完整数据结构
export interface LoginResponse {
  // JSON Web Token JWT访问令牌
  token: string;
  // 用户基本信息
  userInfo: UserInfo;
  // 菜单权限树（嵌套结构） 菜单项数组
  menuTree: MenuItem[];
}
