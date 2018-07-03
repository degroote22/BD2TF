import {
  StyleRulesCallback,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { Field, FieldProps } from "formik";
import * as React from "react";
import { SelectWrapped } from "./ReactSelect";
interface IOpt {
  label: string;
  value: string;
}
interface IOwnProps {
  options: IOpt[];
  multi?: boolean;
  classes?: { [index: string]: string };
}

export class AutoCompleteSelect<T> extends React.Component<
  FieldProps<T> & TextFieldProps & IOwnProps & WithStyles<ClassesNames>
> {
  public render() {
    const {
      form: { touched, errors, isSubmitting },
      field,
      multi,
      classes,
      options,
      helperText,
      ...rest
    } = this.props;
    const { name } = field;
    const id = "react-select-" + name;
    return (
      <TextField
        placeholder={this.props.placeholder || ""}
        error={touched[name] && !!errors[name]}
        disabled={isSubmitting}
        onChange={this.onChange as any}
        id={id}
        helperText={touched[name] && errors[name] ? errors[name] : helperText}
        name={field.name}
        value={field.value}
        onBlur={field.onBlur}
        InputProps={{
          inputComponent: SelectWrapped,
          inputProps: {
            classes,
            name: id,
            setTouched: this.setTouched,
            onDelete: this.onDelete,
            instanceId: id,
            simpleValue: true,
            options,
            multi
          }
        }}
        {...rest}
      >
        {this.props.children}
      </TextField>
    );
  }

  private setTouched = () =>
    this.props.form.setFieldTouched(this.props.field.name);

  private onChange = (value: string) => {
    this.props.form.setFieldValue(this.props.field.name, value);
  };

  private onDelete = (obj: { label: string; value: string }) => {
    const oldValues = this.props.form.values[this.props.field.name] as string;
    const splitted = oldValues.split(",");
    const filtered = splitted.filter(x => x !== obj.value);
    const joined = filtered.join(",");
    this.props.form.setFieldValue(this.props.field.name, joined);
  };
}

type ClassesNames = "@global";
const ITEM_HEIGHT = 48;

const styles: StyleRulesCallback<ClassesNames> = theme => ({
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  "@global": {
    ".Select-control": {
      display: "flex",
      alignItems: "center",
      border: 0,
      height: "auto",
      background: "transparent",
      "&:hover": {
        boxShadow: "none"
      }
    },
    ".Select-multi-value-wrapper": {
      flexGrow: 1,
      display: "flex",
      flexWrap: "wrap"
    },
    ".Select--multi .Select-input": {
      margin: 0
    },
    ".Select.has-value.is-clearable.Select--single > .Select-control .Select-value": {
      padding: 0
    },
    ".Select-noresults": {
      padding: theme.spacing.unit * 2
    },
    ".Select-input": {
      display: "inline-flex !important",
      padding: 0,
      height: "auto"
    },
    ".Select-input input": {
      background: "transparent",
      border: 0,
      padding: 0,
      cursor: "default",
      display: "inline-block",
      fontFamily: "inherit",
      fontSize: "inherit",
      margin: 0,
      outline: 0
    },
    ".Select-placeholder, .Select--single .Select-value": {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0
    },
    ".Select-placeholder": {
      opacity: 0.42,
      color: theme.palette.common.black
    },
    ".Select-menu-outer": {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: "absolute",
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: "100%",
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5
    },
    ".Select.is-focused:not(.is-open) > .Select-control": {
      boxShadow: "none"
    },
    ".Select-menu": {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: "auto"
    },
    ".Select-menu div": {
      boxSizing: "content-box"
    },
    ".Select-arrow-zone, .Select-clear-zone": {
      color: theme.palette.action.active,
      cursor: "pointer",
      height: 21,
      width: 21,
      zIndex: 1
    },
    // Only for screen readers. We can't use display none.
    ".Select-aria-only": {
      position: "absolute",
      overflow: "hidden",
      clip: "rect(0 0 0 0)",
      height: 1,
      width: 1,
      margin: -1
    }
  }
});

const Styled = withStyles(styles)(AutoCompleteSelect);

export const FormikAutoCompleteSelect: React.SFC<
  TextFieldProps & IOwnProps & { name: string }
> = props => {
  // Props will be passed down to the real component, the cast is safe.
  return <Field component={Styled} {...props as any} />;
};

export default Styled;
