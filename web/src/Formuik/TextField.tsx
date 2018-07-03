import TextFieldBase, { TextFieldProps } from "@material-ui/core/TextField";
import { Field, FieldProps } from "formik";
import * as React from "react";

export const FormikTextField: React.SFC<
  TextFieldProps & { name: string }
> = props => {
  // Props will be passed down to the real component, the cast is safe.
  return <Field component={TextField} {...props as any} />;
};

export class TextField<T> extends React.Component<
  FieldProps<T> & TextFieldProps
> {
  public render() {
    const {
      form: { touched, errors, isSubmitting },
      field,
      helperText,
      ...rest
    } = this.props;
    const { name } = field;

    return (
      <TextFieldBase
        error={touched[name] && !!errors[name]}
        disabled={isSubmitting}
        helperText={touched[name] && errors[name] ? errors[name] : helperText}
        {...rest}
        {...field}
      >
        {this.props.children}
      </TextFieldBase>
    );
  }
}

export default FormikTextField;
