import { HTMLAttributes } from 'react';
import { Container } from './styles';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  inputType?: 'input' | 'textarea';
  title?: string;
};

export function Input({name, title, inputType}: InputProps) {
  return (
    <Container htmlFor={name} className="labelInput">
      {inputType === 'textarea' ? (
        <textarea 
          id={name} 
          name={name}
          placeholder=" " 
        ></textarea>
      ) : (
        <input 
          id={name} 
          type="text" 
          name={name}
          placeholder=" " 
        />
      )}
      {title && <span>{title}</span>}
    </Container>
  )
}