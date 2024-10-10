import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { Primitive, PrimitivePropsWithRef } from './Primitive';
import { X } from 'lucide-react';

interface RootContextProps {
  showPopover: boolean;
  toggleShowPopover: () => void;
}

const RootContext = createContext<RootContextProps | undefined>(undefined);

const Root: React.FC<PropsWithChildren> = ({ children }) => {
  const [showPopover, toggleShowPopover] = useReducer((state) => !state, false);

  return (
    <RootContext.Provider value={{ showPopover, toggleShowPopover }}>
      <Primitive.div className='relative'>{children}</Primitive.div>
    </RootContext.Provider>
  );
};

type PopoverTriggerProps = PrimitivePropsWithRef<typeof Primitive.div>;

const Trigger = React.forwardRef<HTMLDivElement, PopoverTriggerProps>(
  ({ children, ...props }, forwardedRef) => {
    const context = useContext(RootContext);
    if (!context) {
      throw new Error('Trigger must be used within a Root component');
    }

    return (
      <Primitive.div
        onClick={context.toggleShowPopover}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </Primitive.div>
    );
  }
);

type PopoverContentProps = PrimitivePropsWithRef<typeof Primitive.div>;

const Content: React.FC<PropsWithChildren> = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(({ children, ...props }, forwardedRef) => {
  const context = useContext(RootContext);

  if (!context) {
    throw new Error('Content must be used within a Root component');
  }

  return (
    <Primitive.div
      className='absolute top-12 left-1/2 -translate-x-1/2 w-max'
      ref={forwardedRef}
      {...props}
    >
      {context.showPopover && children}
    </Primitive.div>
  );
});

type PopoverCloseProps = PrimitivePropsWithRef<typeof Primitive.button>;

const Close = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ children, ...props }, forwardedRef) => {
    const context = useContext(RootContext);

    if (!context) {
      throw new Error('Close must be used within a Root component');
    }

    const handleClose = () => {
      context.toggleShowPopover();
    };

    return (
      <Primitive.button
        className='absolute top-3 right-3'
        ref={forwardedRef}
        {...props}
        onClick={handleClose}
      >
        {children ? children : <X />}
      </Primitive.button>
    );
  }
);

export { Root, Trigger, Content, Close };
