import type { Meta, StoryObj } from '@storybook/react';
import * as Label from './Label';
import './label.css';

const meta: Meta<typeof Label.Root> = {
  title: 'Components/Label',
  component: Label.Root,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label.Root>;

export const Default: Story = {
  args: {
    children: 'Label Text',
  },
};

export const WithInput: Story = {
  args: {
    children: 'First name',
    htmlFor: 'firstName',
    className: 'LabelRoot',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        padding: '0 20px',
        flexWrap: 'wrap',
        gap: 15,
        alignItems: 'center',
      }}
    >
      <Label.Root {...args} />
      <input
        className='Input'
        type='text'
        id={args.htmlFor}
        defaultValue='Pedro Duarte'
      />
    </div>
  ),
};
