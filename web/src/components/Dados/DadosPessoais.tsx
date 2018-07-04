import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { FormikErrors } from "formik";
import * as React from "react";
import { FormikAutoCompleteSelect } from "src/Formuik/AutocompleteSelect";
import { FormikTextField } from "src/Formuik/TextField";
import { ClassesNames, styles } from "src/utils/styles";
import { CRUDActions, SEXO } from "src/utils/types";
export const initialValuesPessoais = {
  email: "",
  senha: "",
  senha2: "",
  nome: "",
  apelido: "",
  cpf: "",
  rg: "",
  sexo: SEXO.outro,
  dataNasc: new Date().toLocaleDateString()
};

export const initialValuesPessoaisFilled: typeof initialValuesPessoais = {
  email: "jaoo@silva.com",
  senha: "senha1",
  senha2: "senha1",
  nome: "Joao",
  apelido: "Jhon",
  cpf: "09372446602",
  rg: "mg13425420",
  sexo: SEXO.masc,
  dataNasc: new Date("09/13/1994").toLocaleDateString()
};

export const validateDadosPessoais = (values: typeof initialValuesPessoais) => {
  const errors: FormikErrors<typeof initialValuesPessoais> = {};

  const notEmpty = (name: keyof typeof initialValuesPessoais) => {
    if (values[name] === "") {
      errors[name] = "Não pode ficar em branco";
    }
  };

  // dados pessoais
  notEmpty("email");
  notEmpty("senha");
  notEmpty("senha2");
  notEmpty("nome");
  notEmpty("apelido");
  notEmpty("cpf");
  notEmpty("rg");
  notEmpty("sexo");
  notEmpty("dataNasc");

  if (values.senha !== values.senha2) {
    errors.senha2 = "Precisa ser igual à de cima";
  }

  return errors;
};
export class DadosPessoais extends React.Component<
  WithStyles<ClassesNames> & { action: CRUDActions }
> {
  public render() {
    const { classes, action } = this.props;
    return (
      <React.Fragment>
        <Typography variant="title" className={classes.title}>
          Dados pessoais
        </Typography>
        <FormikTextField
          name="email"
          type="email"
          label="E-mail"
          margin="normal"
        />
        {action === CRUDActions.create && (
          <React.Fragment>
            <FormikTextField
              name="senha"
              type="password"
              label="Senha"
              margin="normal"
            />
            <FormikTextField
              name="senha2"
              type="password"
              label="Repita a senha"
              margin="normal"
            />
          </React.Fragment>
        )}
        <FormikTextField name="nome" label="Nome" margin="normal" />
        <FormikTextField name="apelido" label="Apelido" margin="normal" />
        <FormikTextField name="cpf" label="CPF" margin="normal" />
        <FormikTextField name="rg" label="Identidade" margin="normal" />
        <FormikAutoCompleteSelect
          label="Sexo"
          name="sexo"
          multi={false}
          margin="normal"
          options={[
            { label: "Outro", value: SEXO.outro },
            { label: "Masculino", value: SEXO.masc },
            { label: "Feminio", value: SEXO.fem }
          ]}
        />
        <FormikTextField
          name="dataNasc"
          label="Data de nascimento"
          margin="normal"
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(DadosPessoais);
