import Button from "@material-ui/core/Button";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { Form, Formik, FormikErrors, FormikProps } from "formik";
import * as React from "react";
import { FormikTextField } from "src/Formuik/TextField";
import { ClassesNames, styles } from "src/utils/styles";
import AuthManager from "../../singletons/AuthManager";
import { LoginPossibilities } from "../../utils/types";

const validate = (values: typeof initialValues) => {
  const errors: FormikErrors<typeof initialValues> = {};

  const notEmpty = (name: keyof typeof initialValues) => {
    if (values[name] === "") {
      errors[name] = "Não pode ficar em branco";
    }
  };

  notEmpty("email");
  notEmpty("senha");

  return errors;
};

const initialValues = {
  email: "",
  senha: ""
};

class Medico extends React.Component<WithStyles<ClassesNames> & {}> {
  private onSubmit = alert;

  public render() {
    return (
      <div>
        <Typography variant="display1">Login</Typography>
        <Formik
          validate={validate}
          initialValues={initialValues}
          onSubmit={this.onSubmit}
          render={this.renderForm}
        />

        <button onClick={this.onMedico}>MEDICO</button>
        <button onClick={this.onUsuario}>USUARIO</button>
        <button onClick={this.onPaciente}>PACIENTE</button>
      </div>
    );
  }
  private onMedico = () => AuthManager.setAuth(LoginPossibilities.medico);
  private onUsuario = () => AuthManager.setAuth(LoginPossibilities.usuario);
  private onPaciente = () => AuthManager.setAuth(LoginPossibilities.paciente);

  private renderForm = (formikBag: FormikProps<typeof initialValues>) => {
    const { classes } = this.props;
    return (
      <Form className={classes.base} noValidate={true} autoComplete="off">
        <FormikTextField
          name="email"
          label="E-mail"
          margin="normal"
          type="email"
        />
        <FormikTextField
          name="senha"
          label="Senha"
          type="password"
          margin="normal"
        />
        <div className={classes.button}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={formikBag.isSubmitting || !formikBag.isValid}
          >
            Confirmar
          </Button>
        </div>
      </Form>
    );
  };
}

export default withStyles(styles)(Medico);
