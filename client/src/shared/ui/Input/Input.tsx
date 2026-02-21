import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, leftIcon, rightIcon, fullWidth = false, className, id, ...props },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[rgb(var(--color-text-base))] mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[rgb(var(--color-text-tertiary))]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'block w-full rounded-xl border transition-all duration-200',
              'px-4 py-3 text-[rgb(var(--color-text-base))] placeholder-[rgb(var(--color-text-tertiary))]',
              'bg-[rgb(var(--color-bg))] focus:outline-none focus:ring-2 focus:ring-offset-0',
              error
                ? 'border-[rgb(var(--color-error))] focus:border-[rgb(var(--color-error))] focus:ring-[rgb(var(--color-error))]'
                : 'border-[rgb(var(--color-border))] focus:border-[rgb(var(--color-primary))] focus:ring-[rgb(var(--color-primary))]',
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[rgb(var(--color-text-tertiary))]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-[rgb(var(--color-error))]">{error}</p>}
        {helperText && !error && (
          <p className="mt-2 text-sm text-[rgb(var(--color-text-tertiary))]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
