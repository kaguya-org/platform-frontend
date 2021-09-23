import { HTMLAttributes } from 'react';
import { Container } from './styles';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  inputType?: 'input' | 'textarea';
  title?: string;
  defaultValue?: any;
  className?: string;
};

export function Input({name, title, inputType, defaultValue, className}: InputProps) {
  return (
    <Container htmlFor={name} className={`labelInput ${className}`}>
      {inputType === 'textarea' ? (
        <textarea 
          id={name} 
          name={name}
          placeholder=" "
          defaultValue={defaultValue} 
        ></textarea>
      ) : (
        <input 
          id={name} 
          type="text" 
          name={name}
          placeholder=" "
          defaultValue={defaultValue} 
        />
      )}
      {title && <span>{title}</span>}
    </Container>
  )
}