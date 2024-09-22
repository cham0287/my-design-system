import { ReactNode, forwardRef } from 'react';

type LabelHTMLAttributes = React.LabelHTMLAttributes<HTMLLabelElement>;
interface RootProps extends LabelHTMLAttributes {
  children: ReactNode;
}

const Root = forwardRef<HTMLLabelElement, RootProps>(
  ({ children, ...props }, ref) => {
    return (
      <label ref={ref} {...props}>
        {children}
      </label>
    );
  }
);

Root.displayName = 'Root';

export { Root };
