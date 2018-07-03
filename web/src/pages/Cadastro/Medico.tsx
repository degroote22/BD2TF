import Button from "@material-ui/core/Button";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { Form, Formik, FormikErrors, FormikProps } from "formik";
import * as React from "react";
import { FormikAutoCompleteSelect } from "src/Formuik/AutocompleteSelect";
import { FormikFile } from "src/Formuik/File";
import { FormikTextField } from "src/Formuik/TextField";
import { ESPECIALIDADES } from "src/utils/types";

enum SEXO {
  outro = "outro",
  masc = "masc",
  fem = "fem"
}

const validate = (values: typeof initialValues) => {
  const errors: FormikErrors<typeof initialValues> = {};

  const notEmpty = (name: keyof typeof initialValues) => {
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

  if (isNaN(Date.parse(values.dataNasc))) {
    errors.dataNasc = "Data inválida";
  }

  // dados profissionais
  notEmpty("crm");
  notEmpty("curriculum");
  notEmpty("residencia_principal");
  notEmpty("residencias_secundarias");

  // endereco
  notEmpty("logradouro");
  notEmpty("cidade");
  notEmpty("estado");

  return errors;
};

const initialValues = {
  email: "",
  senha: "",
  senha2: "",
  nome: "",
  apelido: "",
  cpf: "",
  rg: "",
  sexo: SEXO.outro,
  dataNasc: new Date().toLocaleDateString(),
  logradouro: "",
  cidade: "",
  estado: "",
  crm: "",
  curriculum: "",
  residencia_principal: "",
  residencias_secundarias: "",
  diplomas: ""
  //   certificados: [],
};
class Medico extends React.Component<WithStyles<ClassesNames> & {}> {
  private onSubmit = alert;

  public render() {
    return (
      <div>
        <Typography variant="display1">Cadastro de médico</Typography>
        <Formik
          validate={validate}
          initialValues={initialValues}
          onSubmit={this.onSubmit}
          render={this.renderForm}
        />
      </div>
    );
  }

  private renderForm = (formikBag: FormikProps<typeof initialValues>) => {
    const { classes } = this.props;
    return (
      <Form className={classes.base} noValidate={true} autoComplete="off">
        <Typography variant="title" className={classes.title}>
          Dados pessoais
        </Typography>
        <FormikTextField
          name="email"
          type="email"
          label="E-mail"
          margin="normal"
        />
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
        <Typography variant="title" className={classes.title}>
          Dados profissionais
        </Typography>
        <FormikTextField name="crm" label="CRM" margin="normal" />
        <FormikFile
          name="curriculum"
          label="Currículo"
          margin="normal"
          proccessFile={this.proccessFile}
        />
        <FormikAutoCompleteSelect
          multi={false}
          name="residencia_principal"
          label="Residência principal"
          margin="normal"
          options={[
            { label: "Pediatria", value: ESPECIALIDADES.pediatria },
            { label: "Cardiologia", value: ESPECIALIDADES.cardiologia },
            { label: "Obstetria", value: ESPECIALIDADES.obstetria }
          ]}
        />
        <FormikAutoCompleteSelect
          multi={true}
          name="residencias_secundarias"
          label="Residências secundárias"
          margin="normal"
          options={[
            { label: "Pediatria", value: ESPECIALIDADES.pediatria },
            { label: "Cardiologia", value: ESPECIALIDADES.cardiologia },
            {
              label: "ObstetriaObstetriaObstetriaObstetriaObstetria",
              value: ESPECIALIDADES.obstetria
            }
          ].filter(x => x.value !== formikBag.values.residencia_principal)}
        />
        <FormikFile
          name="diplomas"
          label="Diplomas"
          multi={true}
          margin="normal"
          proccessFile={this.proccessFile}
        />

        <Typography variant="title" className={classes.title}>
          Endereço
        </Typography>
        <FormikTextField name="logradouro" label="Logradouro" margin="normal" />
        <FormikTextField name="cidade" label="Cidade" margin="normal" />
        <FormikTextField name="Estado" label="Estado" margin="normal" />

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

  private proccessFile = (file?: File) => {
    if (file) {
      // tslint:disable-next-line:no-console
      console.log(file.name);
    }
  };
}

type ClassesNames = "base" | "title" | "button" | "fileInput";
const styles: StyleRulesCallback<ClassesNames> = theme => ({
  base: {
    flexDirection: "column",
    display: "flex",
    maxWidth: 400
  },
  fileInput: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  title: {
    marginTop: theme.spacing.unit * 4,
    color: theme.palette.grey["600"]
  },
  button: {
    marginTop: theme.spacing.unit * 8
  }
});

export default withStyles(styles)(Medico);
