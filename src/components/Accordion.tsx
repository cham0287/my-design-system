import React, { ReactNode, createContext, useContext, useState } from 'react';
import { ChevronDown } from 'lucide-react';

type AccordionContextType = {
  openItem: string | null;
  toggleItem: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

interface RootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Root = ({ children, ...props }: RootProps) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (value: string) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div {...props}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  value: string;
}

const Item = ({ children, value, ...props }: ItemProps) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('Item must be used within Root Component');

  const { openItem, toggleItem } = context;
  const isOpen = openItem === value;

  const childrenArray = React.Children.toArray(children);

  return (
    <div {...props}>
      <div onClick={() => toggleItem(value)} style={{ cursor: 'pointer' }}>
        {React.cloneElement(childrenArray[0] as React.ReactElement, { isOpen })}
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {childrenArray[1]}
      </div>
    </div>
  );
};

interface TriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpen?: boolean;
}

const Trigger = ({ children, isOpen, ...props }: TriggerProps) => {
  return (
    <div {...props} className='p-4 flex justify-between items-center'>
      <div>{children}</div>
      <ChevronDown
        size={20}
        className={`transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </div>
  );
};

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Content = ({ children, ...props }: ContentProps) => {
  return (
    <div className='p-4 border-y-2' {...props}>
      {children}
    </div>
  );
};

Root.Item = Item;
Root.Trigger = Trigger;
Root.Content = Content;

export { Root, Item, Trigger, Content };
