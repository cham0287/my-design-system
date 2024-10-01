import React, { createContext, useContext, useState } from 'react';
import { Primitive } from './Primitive';
import type { PrimitivePropsWithRef } from './Primitive';

type AccordionRootProps = PrimitivePropsWithRef<typeof Primitive.div>;
type AccordionItemProps = PrimitivePropsWithRef<typeof Primitive.div> & {
  value: string;
};
type AccordionHeaderProps = PrimitivePropsWithRef<typeof Primitive.h3>;
type AccordionTriggerProps = PrimitivePropsWithRef<typeof Primitive.button>;
type AccordionContentProps = PrimitivePropsWithRef<typeof Primitive.div>;

type AccordionContextType = {
  openItems: string[];
  toggleItem: (item: string) => void;
};

type AccordionItemContextType = {
  value: string;
  isOpen: boolean;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);
const AccordionItemContext = createContext<
  AccordionItemContextType | undefined
>(undefined);

const Root = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ children, ...props }, forwardedRef) => {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (item: string) => {
      setOpenItems((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    };

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem }}>
        <Primitive.div {...props} ref={forwardedRef}>
          {children}
        </Primitive.div>
      </AccordionContext.Provider>
    );
  }
);

Root.displayName = 'Accordion.Root';

const Item = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, value, ...props }, forwardedRef) => {
    const context = useContext(AccordionContext);
    if (!context) {
      throw new Error('Accordion.Item must be used within Accordion.Root');
    }
    const { openItems } = context;
    const isOpen = openItems.includes(value);

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <Primitive.div
          {...props}
          ref={forwardedRef}
          className={`mt-px overflow-hidden ${props.className || ''}`}
        >
          {children}
        </Primitive.div>
      </AccordionItemContext.Provider>
    );
  }
);

Item.displayName = 'Accordion.Item';

const Header = React.forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  (props, forwardedRef) => <Primitive.h3 {...props} ref={forwardedRef} />
);

Header.displayName = 'Accordion.Header';

const Trigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, ...props }, forwardedRef) => {
    const accordionContext = useContext(AccordionContext);
    const itemContext = useContext(AccordionItemContext);

    if (!accordionContext || !itemContext) {
      throw new Error(
        'Accordion.Trigger must be used within Accordion.Item and Accordion.Root'
      );
    }

    const { toggleItem } = accordionContext;
    const { value, isOpen } = itemContext;

    const handleClick = () => {
      toggleItem(value);
    };

    return (
      <Primitive.button
        {...props}
        ref={forwardedRef}
        onClick={handleClick}
        className='flex items-center justify-between w-full px-5 py-3 text-left bg-white hover:bg-gray-100'
      >
        {children}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </Primitive.button>
    );
  }
);

Trigger.displayName = 'Accordion.Trigger';

const Content = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, ...props }, forwardedRef) => {
    const itemContext = useContext(AccordionItemContext);

    if (!itemContext) {
      throw new Error('Accordion.Content must be used within Accordion.Item');
    }

    const { isOpen } = itemContext;

    return (
      <Primitive.div
        {...props}
        ref={forwardedRef}
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] ${
          isOpen ? 'max-h-40' : 'max-h-0'
        } ${props.className || ''}`}
      >
        <div className='p-[15px]'>{children}</div>
      </Primitive.div>
    );
  }
);

Content.displayName = 'Accordion.Content';

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

export const Accordion = {
  Root,
  Item,
  Header,
  Trigger,
  Content,
};
