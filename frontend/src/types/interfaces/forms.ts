import { ZodSchema } from 'zod';

export type FieldType = 'text' | 'number' | 'textarea' | 'checkbox' | 'select' | 'password' | 'radio';

export interface SelectOption {
  label: string | number;
  value: string | number;
  checked?: boolean;
}

export interface Field {
  name: string;
  type: FieldType;
  placeholder?: string;
  label?: string;
  options?: SelectOption[];
  hidden?: boolean;
  group?: string;
  hideOnCheck?: {
    field: string;
    value?: any;
  };
}

export interface DynamicFormProps {
  fields: Field[] | undefined;
  initialValues?: Record<string, any>;
  onSubmit: (data: any, mode: string) => void;
  mode?: 'create' | 'update';
  onClose: () => void;
  validationSchema?: ZodSchema | null;
  title?: string;
  layout?: 'vertical' | 'horizontal';
}
