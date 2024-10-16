import type { Meta, StoryObj } from '@storybook/react';
import { Root, Field, Label, Control, Submit } from './Form';

const meta: Meta<typeof Root> = {
  title: 'Components/Form',
  component: Root,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Root>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className='p-2 w-80'>
        <Root {...args}>
          <Field name='firstName' className='mb-2.5 grid'>
            <Label>First Name</Label>
            <Control
              placeholder='Enter your first name'
              className='box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px_#3D357D] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]'
            />
          </Field>
          <Field name='lastName' className='mb-2.5 grid'>
            <Label>Last Name</Label>
            <Control
              placeholder='Enter your last name'
              className='box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px_#3D357D] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]'
            />
          </Field>
          <Field name='email' className='mb-2.5 grid'>
            <Label>Email</Label>
            <Control
              type='email'
              placeholder='Enter your email'
              className='box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-white shadow-[0_0_0_1px_#3D357D] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-white hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]'
            />
          </Field>
          <Submit className='className="mt-2.5 box-border inline-flex h-[35px] w-full items-center justify-center rounded bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"'>
            Submit
          </Submit>
        </Root>
      </div>
    );
  },
  args: {
    // Root 컴포넌트에 전달할 props가 있다면 여기에 추가하세요
  },
};
