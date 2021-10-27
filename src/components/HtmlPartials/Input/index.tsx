import { HTMLAttributes, ReactElement, useRef, useEffect } from 'react';

import { useField } from '@unform/core';

import { 
  Container,
  Content,
} from './styles';

import { Tooltip } from '../../Tooltip';

interface InputProps extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  name: string;
  inputType?: 'input' | 'textarea';
  title?: string;
  
  containerProps?: {
    className?: string;
  };

  type?: string;
  icon?: ReactElement;
};

export function Input({
  name, 
  type, 
  title, 
  inputType, 
  icon,
  ...rest
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
      className={`labelInput`}
      isError={!!error}
      {...rest.containerProps}
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
            {...rest}
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
              {...rest}
            />
          </>
        )}
        {title && <span>{title}</span>}
      </Content>
      {error && (
        <Tooltip 
          title={error}
          type="error"
        />
      )}
    </Container>
  )
}