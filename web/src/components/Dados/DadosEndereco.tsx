import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { FormikErrors } from "formik";
import * as React from "react";
import { FormikTextField } from "src/Formuik/TextField";
import { ClassesNames, styles } from "src/utils/styles";
export const initialValuesEndereco = {
  logradouro: "",
  cidade: "",
  estado: ""
};
export const initialValuesEnderecoFilled: typeof initialValuesEndereco = {
  logradouro: "Rua dos Passos, Nr 19, Apto 301",
  cidade: "Viçosa",
  estado: "MG"
};

export const validateDadosEndereco = (values: typeof initialValuesEndereco) => {
  const errors: FormikErrors<typeof initialValuesEndereco> = {};

  const notEmpty = (name: keyof typeof initialValuesEndereco) => {
    if (values[name] === "") {
      errors[name] = "Não pode ficar em branco";
    }
  };
  notEmpty("logradouro");
  notEmpty("cidade");
  notEmpty("estado");
  return errors;
};
export class DadosPessoais extends React.Component<
  WithStyles<ClassesNames> & {}
> {
  public render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="title" className={classes.title}>
          Endereço
        </Typography>
        <FormikTextField name="logradouro" label="Logradouro" margin="normal" />
        <FormikTextField name="cidade" label="Cidade" margin="normal" />
        <FormikTextField name="estado" label="Estado" margin="normal" />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DadosPessoais);
