import { Meta, StoryObj } from '@storybook/react';
import * as Accordion from './Accordion';

const meta: Meta<typeof Accordion.Root> = {
  title: 'Components/Accordion',
  component: Accordion.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion.Root>;

export const Default: Story = {
  render: () => (
    <Accordion.Root className='border rounded-md w-[300px]'>
      <Accordion.Item value='item-1'>
        <Accordion.Trigger className='p-4'>Is it accessible?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It adheres to the WAI-ARIA design pattern.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value='item-2'>
        <Accordion.Trigger className='p-4'>Is it unstyled?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It's unstyled by default, giving you freedom over the look and
          feel.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value='item-3'>
        <Accordion.Trigger className='p-4'>
          Can it be animated?
        </Accordion.Trigger>
        <Accordion.Content>
          Yes! You can animate the Accordion with CSS or JavaScript.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
};
