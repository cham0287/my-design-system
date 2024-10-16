import React from 'react';
import { Primitive } from './Primitive';
import { createContext } from '../context/src';
import { useId } from '../id/src';

const FORM_NAME = 'Form';

type FormRootElement = React.ElementRef<typeof Primitive.form>;
type PrimitiveFormProps = React.ComponentPropsWithoutRef<typeof Primitive.form>;

const Root = React.forwardRef<FormRootElement, PrimitiveFormProps>(
  (props: PrimitiveFormProps, forwardedRef) => {
    const { ...rootProps } = props;
    return <Primitive.form {...rootProps} ref={forwardedRef} />;
  }
);

Root.displayName = FORM_NAME;

const FIELD_NAME = 'FormField';

type FormFieldContextValue = {
  id: string;
  name: string;
};
const [FormFieldProvider, useFormFieldContext] =
  createContext<FormFieldContextValue>(FIELD_NAME);

type FormFieldElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface FormFieldProps extends PrimitiveDivProps {
  name: string;
}

const Field = React.forwardRef<FormFieldElement, FormFieldProps>(
  (props: FormFieldProps, forwardedRef) => {
    const { name, ...fieldProps } = props;
    const id = useId();

    return (
      <FormFieldProvider id={id} name={name}>
        <Primitive.div
          className='flex flex-col'
          {...fieldProps}
          ref={forwardedRef}
        />
      </FormFieldProvider>
    );
  }
);

Field.displayName = FIELD_NAME;

const LABEL_NAME = 'FormLabel';

type FormLabelElement = React.ElementRef<typeof Primitive.label>;
type LabelProps = React.ComponentPropsWithoutRef<typeof Primitive.label>;
interface FormLabelProps extends LabelProps {}

const Label = React.forwardRef<FormLabelElement, FormLabelProps>(
  (props: FormLabelProps, forwardedRef) => {
    const { ...labelProps } = props;
    const fieldContext = useFormFieldContext(LABEL_NAME);
    const htmlFor = labelProps.htmlFor || fieldContext.id;

    return (
      <Primitive.label {...labelProps} ref={forwardedRef} htmlFor={htmlFor} />
    );
  }
);

Label.displayName = LABEL_NAME;

const CONTROL_NAME = 'FormControl';

type FormControlElement = React.ElementRef<typeof Primitive.input>;
type PrimitiveInputProps = React.ComponentPropsWithoutRef<
  typeof Primitive.input
>;
interface FormControlProps extends PrimitiveInputProps {}

const Control = React.forwardRef<FormControlElement, FormControlProps>(
  (props: FormControlProps, forwardedRef) => {
    const { ...controlProps } = props;
    const fieldContext = useFormFieldContext(LABEL_NAME);
    const id = controlProps.id || fieldContext.id;
    return <Primitive.input {...controlProps} ref={forwardedRef} id={id} />;
  }
);

Control.displayName = CONTROL_NAME;

type FormSubmitElement = React.ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = React.ComponentPropsWithoutRef<
  typeof Primitive.button
>;
interface FormSubmitProps extends PrimitiveButtonProps {}

const Submit = React.forwardRef<FormSubmitElement, FormSubmitProps>(
  (props: FormSubmitProps, forwardedRef) => {
    const { ...submitProps } = props;
    return (
      <Primitive.button type='submit' {...submitProps} ref={forwardedRef} />
    );
  }
);

export { Root, Field, Label, Control, Submit };
