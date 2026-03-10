import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import  './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variante?: 'primary' | 'danger';
}

export function Button({ 
  children, 
  variante = 'primary', 
  type = 'button', 
  className = '',
  ...props
}: ButtonProps) {
  
  const classeFinal = `btn-base ${variante} ${className}`.trim();

  return (
    <button 
      type={type} 
      className={classeFinal} 
      {...props}
    >
      {children}
    </button>
  );
}