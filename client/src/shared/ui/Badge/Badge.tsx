import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-[rgb(var(--color-bg-tertiary))] text-[rgb(var(--color-text-base))]',
    primary: 'bg-[rgba(var(--color-primary),0.1)] text-[rgb(var(--color-primary))]',
    success: 'bg-[rgba(var(--color-success),0.1)] text-[rgb(var(--color-success))]',
    warning: 'bg-[rgba(var(--color-warning),0.1)] text-[rgb(var(--color-warning))]',
    danger: 'bg-[rgba(var(--color-error),0.1)] text-[rgb(var(--color-error))]',
    info: 'bg-[rgba(var(--color-info),0.1)] text-[rgb(var(--color-info))]',
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs font-medium',
    md: 'px-3 py-1.5 text-sm font-medium',
    lg: 'px-4 py-2 text-base font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
