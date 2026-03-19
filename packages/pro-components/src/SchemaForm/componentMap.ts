import React from 'react';
import { Input, Select, DatePicker } from 'antd';
export const componentMap: Record<string, React.FC<any>> = {
  input: Input,
  password: Input,
  textarea: Input.TextArea,
  select: Select,
  'date-picker': DatePicker,
};
