/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useImperativeHandle } from 'react';
import { Form as AntForm } from 'antd';
import type { FormInstance } from 'antd';
import { componentMap } from './componentMap';
import type { SchemaFormProps, FormValues } from './types';

// SchemaForm组件 - 基于Ant Design Form的配置 驱动表单
export const SchemaForm = React.forwardRef<
  {
    validateFields: () => Promise<void>;
    form: FormInstance;
  },
  SchemaFormProps
>((props, ref) => {
  const { schemas, onSubmit, submitText = '提交', values, onValuesChange } = props;

  const [form] = AntForm.useForm();

  // 暴露 form 实例的方法给父组件
  useImperativeHandle(ref, () => ({
    validateFields: () => form.validateFields(),
    form: form,
  }));

  // 当 values 变化时，更新表单
  React.useEffect(() => {
    if (values) {
      form.setFieldsValue(values);
    }
  }, [values, form]);

  // 从schemas中提取初始值，构建initialValues 对象
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
      onFinish={handleSubmit} // Ant Design的onFinish
      onValuesChange={(changedValues, allValues) => {
        // 字段值变化时，调用父组件传入的回调
        if (onValuesChange) {
          onValuesChange(allValues);
        }
      }}
      layout="vertical" // 垂直布局
      style={{ width: '100%' }}
    >
      {/* 动态渲染引擎：遍历schemas，生成表单 项 */}
      {schemas.map((schema, index) => {
        // 1. 根据schema.type从映射表中拿到对 应的组件
        const Component = componentMap[schema.type];

        // 如果找不到对应的组件，就跳过（容错 处理）
        if (!Component) {
          console.warn(`未找到类型为 ${schema.type} 的组件，请检查 componentMap`);
          return null;
        }

        // 2. 准备传给组件的props
        const componentProps: Record<string, any> = {
          ...schema.props, // 先展开schema自定义的props（如disabled、maxLength）
          placeholder: schema.placeholder || `请输入${schema.label || schema.name}`, // 占位符
          style: { width: '100%', ...(schema.props?.style || {}) },
        };

        // 3. 处理options（支持下拉框）
        if (schema.options) {
          if (typeof schema.options === 'function') {
            // options是函数，使用useMemo缓存 计算结果
            const memoizedOptions = React.useMemo(
              () => schema.options!(componentMap),
              schema.dependencies || [],
            );
            componentProps.options = memoizedOptions;
          } else {
            // options是静态数组，直接使用
            componentProps.options = schema.options;
          }
        }

        // 4. 如果type是password，添加type="password"属性
        if (schema.type === 'password') {
          componentProps.type = 'password';
        }

        // 5. 判断是否有dependencies（字段联动）
        if (schema.dependencies && schema.dependencies.length > 0) {
          // 有dependencies - 使用Ant Design的Render Props模式
          return (
            <AntForm.Item
              key={schema.name || index}
              label={schema.label}
              noStyle
              dependencies={schema.dependencies}
            >
              {({ getFieldValue }) => {
                // Render Props函数：接收form 的API
                // 5.1 获取依赖字段的值
                const dependentValues: Record<string, any> = {};
                schema.dependencies.forEach((dep) => {
                  dependentValues[dep] = getFieldValue(dep);
                });

                // 5.2 如果有hidden函数，判断 是否隐藏
                if (schema.hidden) {
                  const shouldHide = schema.hidden(dependentValues);

                  if (shouldHide) {
                    return null; // 隐藏字段
                  }
                }

                // 5.3 渲染表单项
                return (
                  <AntForm.Item name={schema.name} label={schema.label} rules={schema.rules as any}>
                    <Component {...componentProps} />
                  </AntForm.Item>
                );
              }}
            </AntForm.Item>
          );
        }

        // 6. 没有dependencies - 正常渲染
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
