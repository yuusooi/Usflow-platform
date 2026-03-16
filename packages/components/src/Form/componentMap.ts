import React from 'react';
import { Input, Select, DatePicker } from 'antd'; // 🔥 改成全部从 antd 导入

export const componentMap: Record<string, React.FC<any>> = {
  input: Input, // Ant Design 的 Input
  password: Input, // Ant Design 的 Input
  textarea: Input.TextArea, // Ant Design 的 TextArea
  select: Select,
  'date-picker': DatePicker,
};
