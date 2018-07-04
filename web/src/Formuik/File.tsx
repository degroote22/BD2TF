import grey from "@material-ui/core/colors/grey";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input, { InputComponentProps } from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import AttachFile from "@material-ui/icons/AttachFile";
import { Field, FieldProps } from "formik";
import * as React from "react";

export const FormikFile: React.SFC<
  {
    name: string;
    proccessFile?: (file?: File) => void;
    label?: string;
    multi?: boolean;
  } & Partial<FormControlProps>
> = props => {
  // Props will be passed down to the real component, the cast is safe.
  return <Field component={FileBase} {...props as any} />;
};

export class FileBase<T> extends React.Component<
  FieldProps<T> &
    FormControlProps & {
      label?: string;
      proccessFile?: (file?: File) => void;
      multi?: boolean;
    }
> {
  public render() {
    const {
      form: { isSubmitting, touched, errors },
      field,
      proccessFile,
      multi,
      label,
      ...rest
    } = this.props;
    const { name } = field;
    return (
      <FormControl
        {...rest}
        disabled={isSubmitting}
        error={touched[name] && !!errors[name]}
      >
        <InputLabel>{label}</InputLabel>
        <Input
          value={field.value}
          inputComponent={this.renderIPC}
          endAdornment={
            <InputAdornment position="end">
              <AttachFile />
            </InputAdornment>
          }
        />
        {touched[name] &&
          !!errors[name] && (
            <FormHelperText error={true}>{errors[name]}</FormHelperText>
          )}
      </FormControl>
    );
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { form, proccessFile, field } = this.props;

    form.setFieldTouched(field.name, true);

    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (!file) {
      form.setFieldValue(field.name, "");
      return;
    }
    const files = Array.from(event.target.files);

    const filesNames = files
      .map(f => (f ? f.name : ""))
      .filter(x => x !== "")
      .join(",");

    form.setFieldValue(field.name, filesNames);
    if (proccessFile) {
      files.forEach(f => {
        proccessFile(f);
      });
    }
  };

  private renderValue = () => {
    const {
      field,
      multi,
      form: { isSubmitting }
    } = this.props;
    const val =
      multi && field.value !== ""
        ? field.value.split(",").join(", ")
        : field.value;
    return (
      field.value !== "" && (
        <Typography
          variant="subheading"
          style={{
            position: "absolute",
            top: 8,
            color: isSubmitting ? grey["500"] : "black"
          }}
        >
          {val}
        </Typography>
      )
    );
  };

  private renderIPC = (props: InputComponentProps) => {
    const {
      field,
      form: { isSubmitting }
    } = this.props;
    return (
      <React.Fragment>
        <label
          style={{
            width: "100%",
            paddingTop: 16
          }}
        >
          {this.renderValue()}
          {!isSubmitting ? (
            <input
              multiple={this.props.multi}
              onBlur={field.onBlur}
              onChange={this.onChange}
              name={field.name}
              style={{
                width: "100%",
                backgroundColor: "#ffff00",
                visibility: "hidden",
                height: 0
              }}
              type="file"
            />
          ) : (
            <input
              multiple={this.props.multi}
              style={{
                width: "100%",
                backgroundColor: "#ffff00",
                visibility: "hidden",
                height: 0
              }}
            />
          )}
        </label>
      </React.Fragment>
    );
  };
}

export default FormikFile;
