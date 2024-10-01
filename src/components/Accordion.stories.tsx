// Accordion.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion.Root> = {
  title: 'Components/Accordion',
  component: Accordion.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion.Root>;

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <polyline points='6 9 12 15 18 9'></polyline>
  </svg>
);

const AccordionDemo = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (item: string) => {
    setOpenItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <Accordion.Root className='w-full max-w-md mx-auto'>
      {['item-1', 'item-2', 'item-3'].map((item, index) => (
        <Accordion.Item
          key={item}
          className='mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:ring-2 focus-within:ring-black'
        >
          <Accordion.Header>
            <Accordion.Trigger
              className='flex items-center justify-between w-full px-5 py-3 text-left bg-white hover:bg-gray-100'
              onClick={() => toggleItem(item)}
            >
              <span>{`Question ${index + 1}`}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  openItems.includes(item) ? 'transform rotate-180' : ''
                }`}
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            className={`transition-all duration-300 ease-in-out ${
              openItems.includes(item) ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <div className='p-5'>{`Answer to question ${index + 1}`}</div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export const Default: Story = {
  render: () => <AccordionDemo />,
};
