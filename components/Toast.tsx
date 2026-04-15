'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({
  message,
  type = 'success',
  duration = 3000,
  isVisible,
  onClose,
}: ToastProps) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!shouldRender) return null;

  const bgColor = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  }[type];

  const iconColor = {
    success: 'text-green-600',
    error: 'text-red-600',
    info: 'text-blue-600',
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    info: 'text-blue-800',
  }[type];

  return (
    <div
      className={`fixed bottom-6 left-6 max-w-sm transition-all duration-300 ease-out ${
        isVisible
          ? 'translate-x-0 opacity-100'
          : '-translate-x-full opacity-0'
      }`}
    >
      <div
        className={`${bgColor} border rounded-lg p-4 shadow-lg flex items-start gap-3`}
      >
        <CheckCircle size={20} className={`${iconColor} flex-shrink-0 mt-0.5`} />
        <p className={`${textColor} text-sm font-medium flex-1`}>{message}</p>
        <button
          onClick={onClose}
          className={`${iconColor} hover:opacity-75 transition-opacity flex-shrink-0`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
