/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect } from 'react';
import { FormContext } from './types';
import type { FormItemProps } from './types';

export const FormItem: React.FC<FormItemProps> = ({ name, label, required, children }) => {
  //   从 Context 中获取表单数据和更新函数
  const {
    values,
    setFieldValue,
    errors,
    setFieldError,
    touched,
    setFieldTouched,
    registerField,
    registerRequired,
  } = useContext(FormContext);

  // 注册字段到表单
  useEffect(() => {
    registerField(name);
    registerRequired(name, required || false);
  }, [name, required, registerField, registerRequired]);

  // 获取当前字段的值
  const fieldValue = values[name]; // 比如 values['username']
  const fieldError = errors[name];
  const fieldTouched = touched[name];

  // 校验当前字段
  const validateField = () => {
    if (required && (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
      setFieldError(name, '该字段不能为空');
    } else {
      setFieldError(name, '');
    }
  };

  // 定义 onChange 处理函数（当 Input 输入变化时调用），需要处理 event 对象
  const handleChange = (eventOrValue: any) => {
    let value: any;

    // 判断：如果是事件对象，提取 event.target.value
    // 否则直接使用值（兼容其他组件可能直接传值的情况）
    if (eventOrValue && typeof eventOrValue === 'object' && 'target' in eventOrValue) {
      // React 的 ChangeEvent 对象
      value = eventOrValue.target.value;
    } else {
      value = eventOrValue;
    }
    setFieldValue(name, value); // 通知 Form 更新数据

    // 用户输入后，如果之前有错误，尝试重新校验
    if (fieldError) {
      validateField();
    }
  };

  // 3onBlur 处理函数（用户离开输入框时触发）
  const handleBlur = () => {
    // 标记该字段为"已接触"
    setFieldTouched(name, true);

    // 如果是必填字段，进行校验
    if (required) {
      validateField();
    }
  };

  // 克隆子元素，注入 value、onChange 和 onBlur
  const clonedChildren = React.cloneElement(
    children as React.ReactElement<any>,
    {
      value: fieldValue,
      onChange: handleChange,
      onBlur: handleBlur,
      ...(React.isValidElement(children) && (children.props as any).style ? { style: { width: '50%', ...(children.props as any).style } } : {}),
    }
  );

  // 渲染 label
  const renderLabel = () => {
    if (!label) return null;

    return (
      <label
        style={{
          display: 'block',
          marginBottom: '8px',
          color: fieldError && fieldTouched ? 'var(--error-color)' : 'var(--text-color)', // 使用 CSS 变量
        }}
      >
        {label}
        {required && <span style={{ color: 'var(--error-color)', marginLeft: '4px' }}>*</span>}
      </label>
    );
  };

  // 渲染错误信息
  const renderError = () => {
    // 只有当字段被接触过，且有错误信息时，才显示错误
    if (!fieldTouched || !fieldError) return null;

    return (
      <div
        style={{
          color: 'var(--error-color)',
          fontSize: '12px',
          marginTop: '4px',
        }}
      >
        {fieldError}
      </div>
    );
  };

  // 返回组件结构（用clonedChildren而不是children）
  return (
    <div style={{ marginBottom: '16px' }}>
      {renderLabel()}
      {clonedChildren} {/* 渲染被"改造"后的子组件 */}
      {renderError()}
    </div>
  );
};
