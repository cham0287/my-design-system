import React from 'react';
import { Primitive } from './Primitive';
import type { PrimitivePropsWithRef } from './Primitive';

type AccordionRootProps = PrimitivePropsWithRef<typeof Primitive.div>;
type AccordionItemProps = PrimitivePropsWithRef<typeof Primitive.div>;
type AccordionHeaderProps = PrimitivePropsWithRef<typeof Primitive.h3>;
type AccordionTriggerProps = PrimitivePropsWithRef<typeof Primitive.button>;
type AccordionContentProps = PrimitivePropsWithRef<typeof Primitive.div>;

const Root = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  (props, forwardedRef) => <Primitive.div {...props} ref={forwardedRef} />
);

Root.displayName = 'Accordion.Root';

const Item = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  (props, forwardedRef) => <Primitive.div {...props} ref={forwardedRef} />
);

Item.displayName = 'Accordion.Item';

const Header = React.forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  (props, forwardedRef) => <Primitive.h3 {...props} ref={forwardedRef} />
);

Header.displayName = 'Accordion.Header';

const Trigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, ...props }, forwardedRef) => (
    <Primitive.button {...props} ref={forwardedRef}>
      {children}
    </Primitive.button>
  )
);

Trigger.displayName = 'Accordion.Trigger';

const Content = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, ...props }, forwardedRef) => (
    <Primitive.div
      {...props}
      ref={forwardedRef}
      className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] data-[state=closed]:animate-accordionUp data-[state=open]:animate-accordionDown ${
        props.className || ''
      }`}
    >
      <div className='p-[15px]'>{children}</div>
    </Primitive.div>
  )
);

Content.displayName = 'Accordion.Content';

export const Accordion = {
  Root,
  Item,
  Header,
  Trigger,
  Content,
};
