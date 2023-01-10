import React, { ReactElement, useRef } from 'react';
import ReactQuill from 'react-quill';

import { TextEditorProps } from './TextEditor.entity';
import Styles from './TextEditor.style';

export default function TextEditor({
  height = 450,
  value,
  onChange,
  disabled,
  placeholder,
}: Partial<TextEditorProps>): ReactElement {
  const editorRef = useRef(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const handleChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <Styles.MainContainer height={height}>
      <ReactQuill
        modules={modules}
        formats={[
          'header',
          'font',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'script',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
          'align',
          'color',
          'background',
        ]}
        ref={editorRef}
        theme="snow"
        bounds="root"
        value={value || ''}
        readOnly={disabled}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </Styles.MainContainer>
  );
}
