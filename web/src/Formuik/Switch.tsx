import FormControlLabel, {
  FormControlLabelProps
} from "@material-ui/core/FormControlLabel";
import SwitchBase from "@material-ui/core/Switch";
import { Field, FieldProps } from "formik";
import * as React from "react";

export const FormikSwitch: React.SFC<
  { name: string } & Partial<FormControlLabelProps>
> = props => {
  // Props will be passed down to the real component, the cast is safe.
  return <Field component={Switch} {...props as any} />;
};

export class Switch<T> extends React.Component<
  FieldProps<T> & FormControlLabelProps
> {
  public render() {
    const {
      form: { isSubmitting },
      field,
      ...rest
    } = this.props;

    return (
      <FormControlLabel
        control={
          <SwitchBase
            checked={field.value}
            name={field.name}
            onBlur={field.onBlur}
            onChange={field.onChange}
            color="primary"
          />
        }
        disabled={isSubmitting}
        {...rest}
      />
    );
  }
}

export default FormikSwitch;
