import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ToastFunction = (message: string) => void;

let globalToast: ToastFunction | undefined = undefined;

type ToastType = { id: number; message: string };

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast: ToastFunction = (message: string) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  };

  useEffect(() => {
    globalToast = addToast;
  }, []);

  return createPortal(
    <div style={containerStyle}>
      {toasts.map((toast) => (
        <div key={toast.id} style={toastStyle}>
          {toast.message}
        </div>
      ))}
    </div>,
    getToastRoot()
  );
};

export const toast: ToastFunction = (message) => {
  if (globalToast) {
    globalToast(message);
  } else {
    throw new Error(
      'Toast function cannot be called before ToastProvider was initialized'
    );
  }
};

/**
 * 토스트를 렌더링할 루트 요소를 가져오거나 없으면 생성
 */
function getToastRoot(): HTMLElement {
  let toastRoot = document.getElementById('toast-root');
  if (!toastRoot) {
    toastRoot = document.createElement('div');
    toastRoot.id = 'toast-root';
    document.body.appendChild(toastRoot);
  }
  return toastRoot;
}

const containerStyle: React.CSSProperties = {
  position: 'fixed',
  top: '1rem',
  right: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  zIndex: 9999,
};

const toastStyle: React.CSSProperties = {
  background: '#333',
  color: '#fff',
  padding: '0.75rem 1.25rem',
  borderRadius: '4px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  opacity: 0.9,
  transition: 'opacity 0.3s',
};
