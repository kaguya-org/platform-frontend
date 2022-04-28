import { useField } from '@unform/core';
import { useEffect, useRef, useState } from 'react';
import { AiFillCamera } from 'react-icons/all';
import { Tooltip } from '../..';
import { ContainerFile } from './styles';

type InputFileProps = {
  name: string;
}

export function InputFile({name}: InputFileProps) {
  const { fieldName, defaultValue, registerField, error, clearError } = useField(name);
  const inputRef = useRef(null);
  
  const [selectedFile, setSelectedFile] = useState<File>();
  const [filePreview, setFilePreview] = useState<string | undefined>(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField]);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setFilePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTypeAccepted = ['image/png', 'image/svg+xml', 'image/svg' ,'image/jpeg'];

    const oneFile = e.target.files?.item(0);

    if(oneFile) {
      if (!fileTypeAccepted.includes(oneFile?.type)) {
        setSelectedFile(undefined);
        return
      } else {
        setSelectedFile(oneFile);
        clearError();
      };
    };
  }

  return (
    <ContainerFile isError={!!error} className="file">
      <input 
        type="file" 
        name={name} 
        id="input_file"
        title={selectedFile?.name}
        onChange={(e) => onSelectFile(e)}
        ref={inputRef}
      />
      {filePreview && <img src={filePreview} alt="" />}
      <label htmlFor="input_file" />
      <AiFillCamera />
      {error && (
        <Tooltip 
          title={error}
          containerProps={{
            style: {
              zIndex: 25,
              width: 'min-content',
              top: '-12px',
              left: '90px',
              borderRadius: '50%',
              padding: '2px',
              background: 'var(--second-background)'
            },
          }}
          type="error"
        />
      )}
    </ContainerFile>
  )
}