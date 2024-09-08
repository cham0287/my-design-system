import { ReactNode } from 'react';

type LabelHTMLAttributes = React.LabelHTMLAttributes<HTMLLabelElement>;
interface RootProps extends LabelHTMLAttributes {
  children: ReactNode;
}

const Root = ({ children, ...props }: RootProps) => {
  return <label {...props}>{children}</label>;
};

export { Root };
