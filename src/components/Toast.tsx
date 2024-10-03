import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';

// Toast 함수 타입 정의
type ToastFunction = (message: string) => void;

// Context 생성
const ToastContext = createContext<ToastFunction | null>(null);

// 전역 toast 함수
let globalToast: ToastFunction | null = null;

type ToastType = { id: number; message: string };

// Toast Provider 컴포넌트
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast: ToastFunction = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  // 전역 toast 함수 설정
  useEffect(() => {
    globalToast = addToast;
    return () => {
      globalToast = null;
    };
  }, [addToast]);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

// useToast 훅 (React 컴포넌트 내에서 사용)
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === null) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// 전역에서 사용 가능한 toast 함수
export const toast: ToastFunction = (message) => {
  if (globalToast) {
    globalToast(message);
  } else {
    console.warn('Toast function called before ToastProvider was initialized');
  }
};

// ToastContainer 컴포넌트
const ToastContainer: React.FC<{ toasts: ToastType[] }> = ({ toasts }) => {
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

/**
 * 토스트를 렌더링할 루트 요소를 가져오거나 생성합니다.
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

// ------ 스타일 ------

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
