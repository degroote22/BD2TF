import { FormHelperText } from "@material-ui/core";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import { Field, FieldProps } from "formik";
import * as React from "react";

interface IOpt {
  label: string;
  value: string;
}
interface IOwnProps {
  label?: string;
  options: IOpt[];
}
export const FormikRadioLine: React.SFC<
  FormControlProps & { name: string } & IOwnProps
> = props => {
  // Props will be passed down to the real component, the cast is safe.
  return <Field component={RadioLine} {...props as any} />;
};

export class RadioLine<T> extends React.Component<
  FieldProps<T> & FormControlProps & IOwnProps
> {
  public render() {
    const {
      form: { isSubmitting, errors },
      field,
      options,
      ...rest
    } = this.props;
    const name = this.props.field.name;

    return (
      <FormControl error={!!errors[name]} {...rest} disabled={isSubmitting}>
        <FormLabel component="legend">{this.props.label}</FormLabel>
        <div>
          {options.map(item => {
            return (
              <React.Fragment key={item.value}>
                <Radio
                  disabled={isSubmitting}
                  checked={field.value === item.value}
                  onChange={this.onChange(item.value)}
                  value={field.value}
                  aria-label={field.name}
                  color="primary"
                />
                {item.label}
              </React.Fragment>
            );
          })}
          {!!errors[name] && (
            <FormHelperText error={!!errors[name]}>
              {errors[name] ? errors[name] : ""}
            </FormHelperText>
          )}
        </div>
      </FormControl>
    );
  }

  private onChange = (value: string) => () => {
    this.props.form.setFieldValue(this.props.field.name, value);
  };
}

export default FormikRadioLine;
