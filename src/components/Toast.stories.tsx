import { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, toast } from './Toast';

const meta: Meta = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ToastProvider>;

// 기본 스토리 정의
export const Default: Story = {
  render: () => (
    <ToastProvider>
      <div style={{ padding: '2rem' }}>
        {/* 토스트를 트리거하는 버튼 */}
        <button
          onClick={() => toast('안녕하세요! 이것은 토스트 메시지입니다.')}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          토스트 표시하기
        </button>
      </div>
    </ToastProvider>
  ),
};
