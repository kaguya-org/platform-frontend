import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { 
  Container,
  Content
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
  defaultValue, 
  className,
  icon
}: InputProps) {
  return (
    <Container 
      htmlFor={name} 
      className={`labelInput ${className}`}
    >
      {icon && inputType !== 'textarea' && icon }
      <Content>
        {inputType === 'textarea' ? (
          <textarea 
            id={name} 
            name={name}
            placeholder=" "
            defaultValue={defaultValue} 
          />
        ) : (
          <>
            <input 
              id={name} 
              type={type} 
              name={name}
              placeholder=" "
              defaultValue={defaultValue} 
            />
          </>
        )}
        {title && <span>{title}</span>}
      </Content>
    </Container>
  )
}