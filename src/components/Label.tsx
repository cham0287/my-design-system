import { forwardRef } from 'react';
import { Primitive } from './Primitive';

type LabelElement = React.ElementRef<typeof Primitive.label>;
type PrimitiveLabelProps = React.ComponentPropsWithoutRef<
  typeof Primitive.label
>;
interface LabelProps extends PrimitiveLabelProps {}

const Root = forwardRef<LabelElement, LabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <Primitive.label ref={ref} {...props}>
        {children}
      </Primitive.label>
    );
  }
);

Root.displayName = 'Root';

export { Root };
