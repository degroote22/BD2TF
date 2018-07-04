import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { FormikErrors } from "formik";
import * as React from "react";
import { FormikTextField } from "src/Formuik/TextField";
import { ClassesNames, styles } from "src/utils/styles";
export const initialValuesPagamento = {
  nome: "",
  numero: "",
  ccv: ""
};

export const initialValuesPagamentoFilled: typeof initialValuesPagamento = {
  nome: "Joao A Silva",
  numero: "5555-5555-5555-5555",
  ccv: "555"
};

export const validateDadosPagamento = (
  values: typeof initialValuesPagamento
) => {
  const errors: FormikErrors<typeof initialValuesPagamento> = {};

  const notEmpty = (name: keyof typeof initialValuesPagamento) => {
    if (values[name] === "") {
      errors[name] = "Não pode ficar em branco";
    }
  };
  notEmpty("nome");
  notEmpty("numero");
  notEmpty("ccv");
  return errors;
};
class DadosPagamento extends React.Component<WithStyles<ClassesNames> & {}> {
  public render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography variant="title" className={classes.title}>
          Dados de pagamento (cartão de crédito)
        </Typography>
        <FormikTextField name="nome" label="Nome no cartão" margin="normal" />
        <FormikTextField
          name="numero"
          label="Número do cartão"
          margin="normal"
        />
        <FormikTextField
          name="ccv"
          label="Código de segurança"
          margin="normal"
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DadosPagamento);
