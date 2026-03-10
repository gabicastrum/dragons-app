import { type InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className= 'fieldGroup'>
      {label && <label className='label'>{label}</label>}
      
      <input 
        className='inputField'
        {...props}
      />
    </div>
  );
}