import Button from "@material-ui/core/Button";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import { Form, Formik, FormikProps } from "formik";
import * as React from "react";
import DadosEndereco, {
  initialValuesEndereco,
  initialValuesEnderecoFilled,
  validateDadosEndereco
} from "src/components/Dados/DadosEndereco";
import DadosFoto, {
  initialValuesFoto,
  initialValuesFotoFilled,
  validateDadosFoto
} from "src/components/Dados/DadosFoto";
import DadosPagamento, {
  initialValuesPagamento,
  initialValuesPagamentoFilled,
  validateDadosPagamento
} from "src/components/Dados/DadosPagamento";
import DadosPessoais, {
  initialValuesPessoais,
  initialValuesPessoaisFilled,
  validateDadosPessoais
} from "src/components/Dados/DadosPessoais";
import { ClassesNames, styles } from "src/utils/styles";
import { CRUDActions } from "src/utils/types";

const validate = (values: typeof initialValues) => {
  return {
    ...validateDadosEndereco(values),
    ...validateDadosPessoais(values),
    ...validateDadosPagamento(values),
    ...validateDadosFoto(values)
  };
};

const initialValues = {
  ...initialValuesPessoais,
  ...initialValuesPagamento,
  ...initialValuesEndereco,
  ...initialValuesFoto
};

const initialFilledValues = {
  ...initialValuesPessoaisFilled,
  ...initialValuesPagamentoFilled,
  ...initialValuesEnderecoFilled,
  ...initialValuesFotoFilled
};
class Usuarios extends React.Component<
  WithStyles<ClassesNames> & { action: CRUDActions }
> {
  private onSubmit = alert;

  private fmk: Formik | undefined = undefined;
  public componentDidMount() {
    if (this.props.action === CRUDActions.read) {
      if (this.fmk) {
        this.fmk.setSubmitting(true);
      }
    }
  }
  public render() {
    const init =
      this.props.action === CRUDActions.create
        ? initialValues
        : initialFilledValues;

    return (
      <div>
        <Formik
          isInitialValid={this.props.action !== CRUDActions.create}
          initialValues={init}
          validate={validate}
          onSubmit={this.onSubmit}
          ref={this.setRef}
          render={this.renderForm}
        />
      </div>
    );
  }
  private setRef = (ref: any) => (this.fmk = ref);

  private renderForm = (formikBag: FormikProps<typeof initialValues>) => {
    const { classes, action } = this.props;
    return (
      <Form className={classes.base} noValidate={true} autoComplete="off">
        <DadosPessoais action={this.props.action} />
        <DadosPagamento />
        <DadosEndereco />
        <DadosFoto />
        {action === CRUDActions.read ? (
          <div className={classes.button}>
            <Button variant="contained" color="secondary" type="submit">
              Excluir conta
            </Button>
          </div>
        ) : (
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
        )}
      </Form>
    );
  };
}

export default withStyles(styles)(Usuarios);
