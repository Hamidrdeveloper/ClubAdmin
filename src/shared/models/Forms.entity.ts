export interface FormProps<T> {
  initialValues?: T;
  isPending: boolean;
  onSubmit: (data: T) => void;
  onChange?:() => void;
}
