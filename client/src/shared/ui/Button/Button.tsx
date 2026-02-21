import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95';

  const variants = {
    primary:
      'bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary-hover))] focus:ring-[rgb(var(--color-primary))] shadow-sm hover:shadow-md',
    secondary:
      'bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-text-base))] hover:bg-[rgb(var(--color-bg-secondary))] focus:ring-gray-400',
    outline:
      'border border-[rgb(var(--color-border))] bg-transparent text-[rgb(var(--color-text-base))] hover:bg-[rgb(var(--color-bg-tertiary))] focus:ring-gray-400',
    ghost:
      'text-[rgb(var(--color-text-base))] hover:bg-[rgb(var(--color-bg-tertiary))] focus:ring-gray-400',
    danger:
      'bg-[rgb(var(--color-error))] text-white hover:opacity-90 focus:ring-[rgb(var(--color-error))] shadow-sm hover:shadow-md',
    success:
      'bg-[rgb(var(--color-success))] text-white hover:opacity-90 focus:ring-[rgb(var(--color-success))] shadow-sm hover:shadow-md',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Загрузка...
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
