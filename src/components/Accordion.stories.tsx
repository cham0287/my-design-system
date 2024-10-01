import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion.Root> = {
  title: 'Components/Accordion',
  component: Accordion.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion.Root>;

export const Default: Story = {
  render: () => (
    <Accordion.Root className='w-full max-w-md mx-auto'>
      {['item-1', 'item-2', 'item-3'].map((item, index) => (
        <Accordion.Item
          key={item}
          value={item}
          className='mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:ring-2 focus-within:ring-black'
        >
          <Accordion.Header>
            <Accordion.Trigger>{`Item ${index + 1}`}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>{`Item ${index + 1} Content`}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  ),
};
