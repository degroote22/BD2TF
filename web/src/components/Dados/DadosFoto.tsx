import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { FormikErrors } from "formik";
import * as React from "react";
import { FormikFile } from "src/Formuik/File";
import { ClassesNames, styles } from "src/utils/styles";
export const initialValuesFoto = {
  foto: ""
};

export const initialValuesFotoFilled: typeof initialValuesFoto = {
  foto: "a.jpg"
};

export const validateDadosFoto = (values: typeof initialValuesFoto) => {
  const errors: FormikErrors<typeof initialValuesFoto> = {};

  const notEmpty = (name: keyof typeof initialValuesFoto) => {
    if (values[name] === "") {
      errors[name] = "Não pode ficar em branco";
    }
  };
  notEmpty("foto");
  return errors;
};
class DadosFoto extends React.Component<WithStyles<ClassesNames> & {}> {
  public render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="title" className={classes.title}>
          Foto do paciente
        </Typography>
        <FormikFile
          name="foto"
          label="Foto"
          margin="normal"
          proccessFile={this.proccessFile}
        />
      </React.Fragment>
    );
  }

  private proccessFile = (file?: File) => {
    if (file) {
      // tslint:disable-next-line:no-console
      console.log(file.name);
    }
  };
}

export default withStyles(styles)(DadosFoto);
