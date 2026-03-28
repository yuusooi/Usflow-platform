/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// 定义错误信息的类型
// key 是字段名，value 是错误信息字符串
export type FormErrors = Record<string, string>;

// 定义表单值的类型，key 是表单项的名字，value 是对应的值
export type FormValues = Record<string, any>;

// 定义 Form 组件接收的 props
export interface FormProps {
  // 初始表单数据
  initialValues?: FormValues;
  // 表单提交时的回调函数，参数是表单数据和阻止提交的函数
  onSubmit: (values: FormValues, event?: React.FormEvent) => void;
  // 表单的子元素（比如 FormItem、Input 等）
  children: React.ReactNode;
}

// 定义 FormContext 要传递的数据结构
export interface FormContextType {
  // 当前表单的所有数据
  values: FormValues;
  // 更新某个字段值的函数：name 是字段名，value 是新值，通知 Form 更新数据
  setFieldValue: (name: string, value: any) => void;
  // 所有字段的错误信息
  errors: FormErrors;
  // 设置某个字段的错误信息
  setFieldError: (name: string, error: string) => void;
  // 用户是否接触过某个字段 用来判断是否显示错误
  touched: Record<string, boolean>;
  // 标记某个字段为 已接触
  setFieldTouched: (name: string, touched: boolean) => void;
  // 注册字段到表单
  registerField: (name: string, initialValue?: any) => void;
  // 注册字段是否必填
  registerRequired: (name: string, required: boolean) => void;
}

// 创建 FormContext（先给一个默认值，后续会被 Form 组件覆盖）
export const FormContext = React.createContext<FormContextType>({
  values: {},
  setFieldValue: () => {}, // 空函数作为默认实现
  errors: {},
  setFieldError: () => {},
  touched: {},
  setFieldTouched: () => {},
  registerField: () => {},
  registerRequired: () => {},
});

// 定义 FormItem 组件接收的 props
export interface FormItemProps {
  // 表单项的字段名，用来从Form的values中取值
  name: string;
  // 显示的标签文字，比如 "用户名"、"密码"
  label?: string;
  // 是否必填，后面会用来做校验
  required?: boolean;
  // FormItem 的子元素，通常是一个表单控件如 <Input />
  children: React.ReactElement;
}

// 表单项的校验规则
export interface FormItemRule {
  // 是否必填
  required?: boolean;
  // 必填时的错误提示文案
  message?: string;
}

// 这是表单项的 Schema 配置类型（JSON 驱动的核心协议）
export interface FormItemSchema {
  // 组件类型 例如："input" 表示输入框，"password" 表示密码框
  type: string;
  // 字段名 表单数据的 key 例如"username"、"password"
  name: string;
  // 标签文字 显示在输入框旁边的提示 例如："用户名"、"密码"
  label?: string;
  // 占位符提示 例如"请输入用户名"
  placeholder?: string;
  // 初始值
  initialValue?: any;
  // 校验规则数组（可以有多个规则）
  rules?: FormItemRule[];
  // 组件的额外属性（透传给具体组件），例如：{ disabled: true, maxLength: 10 }
  props?: Record<string, any>;
  // 是否隐藏该表单项（可动态判断）
  hidden?: (values: FormValues) => boolean;
  // 支持下拉框选项 支持数组或函数
  options?:
    | Array<{ label: string; value: any }>
    | ((values: FormValues) => Array<{ label: string; value: any }>);
  // 依赖关系声明
  dependencies?: string[];
}

//  SchemaForm 组件的 props 类型定义
//  用户使用 <SchemaForm /> 时需要传入的参数
export interface SchemaFormProps {
  // Schema 配置数组
  // 每个元素代表一个表单项的配置（JSON）
  schemas: FormItemSchema[];
  // 表单提交回调
  // 参数 values 是收集到的所有表单数据
  onSubmit: (values: FormValues) => void;
  // 提交按钮的文字
  submitText?: string;
  // 支持动态设置表单值
  values?: FormValues;
  // 字段值变化时的回调
  onValuesChange?: (values: FormValues) => void;
}
