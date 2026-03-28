/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useImperativeHandle } from 'react';
import { Form as AntForm } from 'antd';
import type { FormInstance } from 'antd';
import { componentMap } from './componentMap';
import type { SchemaFormProps, FormValues } from './types';

// 基于antd Form的配置 驱动表单
export const SchemaForm = React.forwardRef<
  {
    validateFields: () => Promise<void>;
    form: FormInstance;
  },
  SchemaFormProps
>((props, ref) => {
  const { schemas, onSubmit, submitText = '提交', values, onValuesChange } = props;

  const [form] = AntForm.useForm();

  // 暴露form实例的方法给父组件
  useImperativeHandle(ref, () => ({
    validateFields: () => form.validateFields(),
    form: form,
  }));

  // 当values变化时，更新表单
  React.useEffect(() => {
    if (values) {
      form.setFieldsValue(values);
    }
  }, [values, form]);

  // 从schemas中提取初始值，构建initialValues对象
  const initialValues: FormValues = React.useMemo(() => {
    const values: FormValues = {};

    // 遍历schemas，把每个schema的name和initialValue收集起来
    schemas.forEach((schema) => {
      // 如果这个schema有initialValue，就添加 到values对象中
      if (schema.initialValue !== undefined) {
        values[schema.name] = schema.initialValue;
      } else {
        // 如果没有initialValue，就给一个空字 符串作为默认值
        values[schema.name] = '';
      }
    });

    return values;
  }, [schemas]); // 当schemas变化时重新计算

  // 提交处理函数
  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <AntForm
      form={form}
      initialValues={initialValues}
      onFinish={handleSubmit} // antd的onFinish
      onValuesChange={(_changedValues, allValues) => {
        // 字段值变化时，调用父组件传入的回调
        if (onValuesChange) {
          onValuesChange(allValues);
        }
      }}
      layout="vertical" // 垂直布局
      style={{ width: '100%' }}
    >
      {/* 遍历schemas，生成表单项 */}
      {schemas.map((schema, index) => {
        // 根据schema.type从映射表中拿到对应的组件
        const Component = componentMap[schema.type];

        // 如果找不到对应的组件，就跳过（容错处理）
        if (!Component) {
          console.warn(`未找到类型为 ${schema.type} 的组件，请检查 componentMap`);
          return null;
        }

        // 准备传给组件的props
        const componentProps: Record<string, any> = {
          ...schema.props, // 先展开schema自定义的props（如disabled、maxLength）
          placeholder: schema.placeholder || `请输入${schema.label || schema.name}`, // 占位符
          style: { width: '100%', ...(schema.props?.style || {}) },
        };

        // 处理options（支持下拉框）
        if (schema.options) {
          if (typeof schema.options === 'function') {
            // options是函数，使用useMemo缓存计算结果
            const memoizedOptions = React.useMemo(
              // 是函数才调用，是数组就直接用
              () =>
                typeof schema.options === 'function'
                  ? schema.options(componentMap)
                  : schema.options,
              schema.dependencies || [],
            );
            componentProps.options = memoizedOptions;
          } else {
            // options是静态数组，直接使用
            componentProps.options = schema.options;
          }
        }

        // 根据type添加type="password"属性
        if (schema.type === 'password') {
          componentProps.type = 'password';
        }

        // 字段联动，判断是否有dependencies
        if (schema.dependencies && schema.dependencies.length > 0) {
          // 有dependencies，使用antd的Render Props模式
          return (
            <AntForm.Item
              key={schema.name || index}
              label={schema.label}
              noStyle
              dependencies={schema.dependencies}
            >
              {({ getFieldValue }) => {
                // Render Props函数：接收form的API
                // 获取依赖字段的值
                const dependentValues: Record<string, any> = {};
                schema.dependencies?.forEach((dep) => {
                  dependentValues[dep] = getFieldValue(dep);
                });

                // 如果有hidden函数，判断 是否隐藏
                if (schema.hidden) {
                  const shouldHide = schema.hidden(dependentValues);

                  if (shouldHide) {
                    return null; // 隐藏字段
                  }
                }

                // 渲染表单项
                return (
                  <AntForm.Item name={schema.name} label={schema.label} rules={schema.rules as any}>
                    <Component {...componentProps} />
                  </AntForm.Item>
                );
              }}
            </AntForm.Item>
          );
        }

        // 没有dependencies，正常渲染
        return (
          <AntForm.Item
            key={schema.name || index}
            name={schema.name}
            label={schema.label}
            rules={schema.rules as any}
          >
            <Component {...componentProps} />
          </AntForm.Item>
        );
      })}

      {/* 提交按钮 */}
      <AntForm.Item>
        <button type="submit" style={{ padding: '8px 24px', cursor: 'pointer' }}>
          {submitText}
        </button>
      </AntForm.Item>
    </AntForm>
  );
});

export default SchemaForm;
