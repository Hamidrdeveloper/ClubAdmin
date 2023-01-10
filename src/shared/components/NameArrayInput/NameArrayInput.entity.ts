export interface NameArrayProps {
  hasLabel?: boolean;
  disabled?: boolean;
  inputName?: string;
  selectName?: string;
  placeholder?: string;
  name?: string | number | (string | number)[];
}

export interface LanguageSelectProps {
  value?: string;
  isFull?: boolean;
  onChange?: (data: string) => void;
}
