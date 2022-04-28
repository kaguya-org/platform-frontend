import { useField } from '@unform/core';
import { useEffect, useRef } from 'react';
import { Tooltip } from '../..';
import {
  Container
} from './styles';

type ContainerProps = React.HTMLAttributes<HTMLLabelElement>;

type InputCheckboxProps = {
  name: string;
  title?: string;
  containerProps?: ContainerProps;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function InputCheckbox({
  name,
  title,
  onChange,
  ...rest
}: InputCheckboxProps) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error, clearError } = useField(name);

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
      isError={!!error} 
      {...rest.containerProps}
    >
      <input
        defaultValue={defaultValue}
        id={name}
        type="checkbox"
        name={name}
        ref={inputRef}
        onChange={onChange}
        onFocus={() => clearError()}
      />
      <span className="checkmark" />
      {title}
      {error && (
        <Tooltip 
          title={error}
          type="error"
          containerProps={{
            style: {
              marginLeft: '0.8rem'
            }
          }}
          svgProps={{
            style: {
              width: '1.6rem',
              height: '1.6rem'
            }
          }}
        />
      )}
    </Container>
  );
}