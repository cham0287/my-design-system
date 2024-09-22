import type { Meta, StoryObj } from '@storybook/react';
import * as Label from './Label';

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

export const WithHtmlFor: Story = {
  args: {
    children: 'Email',
    htmlFor: 'email-input',
  },
  render: (args) => (
    <div>
      <Label.Root {...args}>
        hello
        <div>hello</div>
      </Label.Root>
      <input id='email-input' type='email' placeholder='Enter your email' />
    </div>
  ),
};
