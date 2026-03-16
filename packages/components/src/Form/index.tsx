/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { FormContext } from './types'
import type { FormProps, FormValues, FormErrors } from './types'

// 导出 Form 组件 外部才能使用它
export const Form: React.FC<FormProps> = ({
  initialValues,
  onSubmit,
  children,
}) => {
  // 用 useState 持有表单的所有数据
  // initialValues || {}  如果有初始值就用初始值，否则用空对象
  const [values, setValues] = useState<FormValues>(initialValues || {})

  // 持有错误信息
  const [errors, setErrors] = useState<FormErrors>({})

  // 记录用户是否接触过某个字段
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // 记录哪些字段是必填的
  const [requiredFields, setRequiredFields] = useState<Record<string, boolean>>({})

  // 注册字段到表单
  const registerField = (name: string, initialValue?: any) => {
    setValues((prevValues) => {
      // 如果字段已经存在，不覆盖
      if (name in prevValues) {
        return prevValues
      }
      // 使用传入的初始值，或者从 initialValues 中获取，或者使用空字符串
      const value =
        initialValue !== undefined
          ? initialValue
          : initialValues?.[name] !== undefined
            ? initialValues[name]
            : ''
      return {
        ...prevValues,
        [name]: value,
      }
    })
  }

  // 注册字段是否必填
  const registerRequired = (name: string, required: boolean) => {
    setRequiredFields((prev) => {
      // 如果值没有变化，不更新
      if (prev[name] === required) {
        return prev
      }
      return {
        ...prev,
        [name]: required,
      }
    })
  }

  // 实现字段更新逻辑
  const setFieldValue = (name: string, value: any) => {
    // 用展开运算符创建一个新对象，把旧数据和新数据合并
    setValues({
      ...values, // 保留旧数据：{ username: 'admin', age: 18 }
      [name]: value, // 覆盖或新增某个字段：{ password: '123456' }
    })

    // 用户输入时，如果该字段有错误，尝试清除错误
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '', // 清空错误
      })
    }
  }

  // 设置错误信息
  const setFieldError = (name: string, error: string) => {
    setErrors({
      ...errors,
      [name]: error,
    })
  }

  // 标记字段为"已接触"
  const setFieldTouched = (name: string, isTouched: boolean) => {
    setTouched({
      ...touched,
      [name]: isTouched,
    })
  }

  // 校验某个字段
  const validateField = (name: string, value: any): string => {
    // 只对必填字段进行校验
    if (requiredFields[name]) {
      if (value === undefined || value === null || value === '') {
        return '该字段不能为空'
      }
    }
    return '' // 没有错误
  }

  // 表单提交事件处理函数
  const handleSubmit = (event: React.FormEvent) => {
    // 阻止浏览器的默认行为（不会刷新页面）
    event.preventDefault()

    // 校验所有字段
    const newErrors: FormErrors = {}
    let hasError = false

    // 遍历所有字段
    Object.keys(values).forEach((name) => {
      const error = validateField(name, values[name])
      if (error) {
        newErrors[name] = error
        hasError = true
      }
    })

    // 如果有错误，更新错误信息并阻止提交
    if (hasError) {
      setErrors(newErrors)
      return // 阻止提交
    }

    // 调用父组件传入的 onSubmit 回调，把表单数据传出去
    onSubmit(values, event)
  }

  // 用FormContext.Provider包裹，把values和setFieldValue广播给所有子组件
  // 返回组件结构，value里增加了errors、setFieldError 、touched、setFieldTouched、registerField、registerRequired
  return (
    <FormContext.Provider
      value={{
        values,
        setFieldValue,
        errors,
        setFieldError,
        touched,
        setFieldTouched,
        registerField,
        registerRequired,
      }}
    >
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  )
}

export { SchemaForm } from './SchemaForm'
