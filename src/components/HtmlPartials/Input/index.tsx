import { HTMLAttributes, ReactElement, useRef, useEffect } from 'react';

import { useField } from '@unform/core'

import { 
  Container,
  Content,
  InputError
} from './styles';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  inputType?: 'input' | 'textarea';
  title?: string;
  defaultValue?: any;
  className?: string;

  type?: string;
  icon?: ReactElement;
};

export function Input({
  name, 
  type, 
  title, 
  inputType, 
  className,
  icon
}: InputProps) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: ref => {
        return ref.current.value
      },
      setValue: (ref, value) => {
        ref.current.value = value
      },
      clearValue: ref => {
        ref.current.value = ''
      },
    })
  }, [fieldName, registerField]);

  return (
    <Container 
      htmlFor={name} 
      className={`labelInput ${className}`}
      isError={!!error}
    >
      {icon && inputType !== 'textarea' && icon }
      <Content>
        {inputType === 'textarea' ? (
          <textarea 
            id={name} 
            name={name}
            placeholder=" "
            defaultValue={defaultValue} 
            ref={inputRef}
          />
        ) : (
          <>
            <input 
              id={name} 
              type={type} 
              name={name}
              placeholder=" "
              defaultValue={defaultValue} 
              ref={inputRef}
            />
          </>
        )}
        {title && <span>{title}</span>}
      </Content>
      {error && <InputError title={error} />}
    </Container>
  )
}