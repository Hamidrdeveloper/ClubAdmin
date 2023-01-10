export interface TextEditorProps {
  height: number;
  value: string;
  disabled: boolean;
  placeholder: string;
  onChange: (value?: string) => void;
}
