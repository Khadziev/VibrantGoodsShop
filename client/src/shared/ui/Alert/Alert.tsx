import React from 'react';
import { cn } from '@/shared/lib/utils';
import { IoInformationCircle, IoCheckmarkCircle, IoWarning, IoCloseCircle } from 'react-icons/io5';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onClose?: () => void;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  onClose,
  children,
  className,
  ...props
}) => {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: <IoInformationCircle className="text-blue-500" size={20} />,
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: <IoCheckmarkCircle className="text-green-500" size={20} />,
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: <IoWarning className="text-yellow-500" size={20} />,
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: <IoCloseCircle className="text-red-500" size={20} />,
    },
  };

  const variantStyles = variants[variant];

  return (
    <div className={cn('rounded-lg border p-4', variantStyles.container, className)} {...props}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">{variantStyles.icon}</div>
        <div className="flex-1">
          {title && <h3 className="text-sm font-semibold mb-1">{title}</h3>}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-3 text-current opacity-70 hover:opacity-100"
          >
            <IoCloseCircle size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
