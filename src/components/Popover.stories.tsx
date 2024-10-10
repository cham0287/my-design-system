import { Meta, StoryObj } from '@storybook/react';
import { Root, Trigger, Content, Close } from './Popover';

const meta: Meta = {
  title: 'Components/Popover',
  component: Root,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Root>;

// 기본 스토리 정의
export const Default: Story = {
  render: () => (
    <div className='flex justify-center items-center h-1/3'>
      <Root>
        <Trigger asChild>
          <button className='p-2 border border-red-300'>Click</button>
        </Trigger>
        <Content>
          <div className='flex flex-col gap-2.5 border border-gray-200 p-4 rounded-md'>
            <Close />
            <p className='mb-2.5 text-[15px] font-medium leading-[19px] text-mauve12'>
              Dimensions
            </p>
            <fieldset className='flex items-center gap-5'>
              <label
                className='w-[75px] text-[13px] text-violet11'
                htmlFor='width'
              >
                Width
              </label>
              <input
                className='inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8'
                id='width'
                defaultValue='100%'
              />
            </fieldset>
            <fieldset className='flex items-center gap-5'>
              <label
                className='w-[75px] text-[13px] text-violet11'
                htmlFor='maxWidth'
              >
                Max. width
              </label>
              <input
                className='inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8'
                id='maxWidth'
                defaultValue='300px'
              />
            </fieldset>
            <fieldset className='flex items-center gap-5'>
              <label
                className='w-[75px] text-[13px] text-violet11'
                htmlFor='height'
              >
                Height
              </label>
              <input
                className='inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8'
                id='height'
                defaultValue='25px'
              />
            </fieldset>
            <fieldset className='flex items-center gap-5'>
              <label
                className='w-[75px] text-[13px] text-violet11'
                htmlFor='maxHeight'
              >
                Max. height
              </label>
              <input
                className='inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8'
                id='maxHeight'
                defaultValue='none'
              />
            </fieldset>
          </div>
        </Content>
      </Root>
    </div>
  ),
};
