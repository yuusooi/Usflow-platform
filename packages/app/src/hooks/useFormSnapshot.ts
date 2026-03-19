import { useEffect, useRef } from 'react';
import type { FormInstance } from 'antd';

// 定义 useFormSnapshot Hook 的参数类型
interface UseFormSnapshotOptions {
  // 表单的唯一标识
  formId: string;
  // 是否启用快照功能，默认启用
  enabled?: boolean;
  // 恢复快照时的回调函数
  onRestore?: (values: Record<string, unknown>) => void;
}

// useFormSnapshot Hook
// 用于自动保存表单数据到 sessionStorage，防止刷新丢失
export const useFormSnapshot = (
  form: FormInstance | null | undefined,
  options: UseFormSnapshotOptions,
) => {
  // 解构参数，从 options 对象中提取属性，设置默认值
  const { formId, enabled = true, onRestore } = options;

  // 生成 sessionStorage 的存储键名
  const STORAGE_KEY = `form_snapshot_${formId}`;

  // 使用 ref 记录上一次的表单数据
  const prevValuesRef = useRef<Record<string, unknown>>({});

  // 保存快照的逻辑（防抖处理）
  useEffect(() => {
    // 如果未启用快照功能，直接返回
    if (!enabled || !form) {
      return;
    }

    // 定义保存函数
    const saveSnapshot = () => {
      // 获取当前表单的所有字段值
      const currentValues = form.getFieldsValue();

      // 检查表单是否为空或所有字段都是空字符串
      const isEmpty = Object.values(currentValues).every(
        value => value === '' || value === null || value === undefined
      );

      if (isEmpty) {
        return;
      }

      // 对比当前值和上一次的值，如果没有变化则不保存
      // 使用 JSON.stringify 深度比较对象
      if (JSON.stringify(currentValues) === JSON.stringify(prevValuesRef.current)) {
        return;
      }

      // 保存到 sessionStorage
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentValues));

      // 更新 ref 中的值
      prevValuesRef.current = currentValues;
    };

    // 监听表单字段变化，使用防抖优化性能
    // 当表单值变化时，延迟 1000ms 后再保存
    // 这样用户连续输入时，不会每次按键都触发保存
    const timer = setTimeout(saveSnapshot, 1000);

    // 清理函数：组件卸载或依赖变化时，清除定时器
    return () => {
      clearTimeout(timer);
    };
  }, [form, enabled, STORAGE_KEY]);

  // 恢复快照的逻辑（组件挂载时执行一次）
  useEffect(() => {
    // 如果未启用快照功能，直接返回
    if (!enabled || !form) {
      return;
    }

    // 从 sessionStorage 读取旧数据
    const draft = sessionStorage.getItem(STORAGE_KEY);

    // 如果没有旧数据，直接返回
    if (!draft) {
      return;
    }

    try {
      // 解析 JSON 字符串，转换成对象
      const savedValues = JSON.parse(draft);

      // 检查解析后的数据是否是对象
      if (typeof savedValues !== 'object' || savedValues === null) {
        return;
      }

      // 检查是否有数据（空对象不做处理）
      if (Object.keys(savedValues).length === 0) {
        return;
      }

      // 如果有 onRestore 回调，通知父组件有旧数据需要恢复
      // 让父组件决定如何处理（比如显示自定义对话框）
      if (onRestore) {
        onRestore(savedValues);
        return;  // 不直接恢复，交给父组件处理
      }

      // 如果没有 onRestore，使用默认行为（window.confirm）
      const shouldRestore = window.confirm(
        '检测到您有未提交的表单数据，是否恢复？\n\n点击"确定"恢复数据\n点击"取消"删除旧数据',
      );

      if (shouldRestore) {
        // 用户点击了"确定"，恢复数据
        form.setFieldsValue(savedValues);

        // 更新 ref 中的值
        prevValuesRef.current = savedValues;
      } else {
        // 用户点击了"取消"，清除旧数据
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch (_error) {
      // JSON 解析失败，说明数据损坏
      // 清除损坏的数据
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [enabled, form, STORAGE_KEY]);

  // 返回清除快照的方法
  return {
    clearSnapshot: () => {
      sessionStorage.removeItem(STORAGE_KEY);
      prevValuesRef.current = {};
    },
  };
};
