import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { FormikErrors } from "formik";
import * as React from "react";
import { FormikAutoCompleteSelect } from "src/Formuik/AutocompleteSelect";
import { FormikFile } from "src/Formuik/File";
import { FormikTextField } from "src/Formuik/TextField";
import { ClassesNames, styles } from "src/utils/styles";
import { ESPECIALIDADES } from "src/utils/types";
export const initialValuesProfissionais = {
  crm: "",
  curriculum: "",
  residencia_principal: "",
  residencias_secundarias: "",
  diplomas: "",
  certificados: "",
  instituicao: "",
  ano: ""
};

export const initialValuesProfissionaisFilled: typeof initialValuesProfissionais = {
  crm: "ccx233334343434",
  curriculum: "c.pdf",
  residencia_principal: "cardiologia",
  residencias_secundarias: "pediatria",
  diplomas: "dip1.pdf, dip2.pdf",
  certificados: "cert1.pdf, cert2.pdf",
  instituicao: "UFV",
  ano: "2010"
};

export const validateDadosProfissionais = (
  values: typeof initialValuesProfissionais
) => {
  const errors: FormikErrors<typeof initialValuesProfissionais> = {};

  const notEmpty = (name: keyof typeof initialValuesProfissionais) => {
    if (values[name] === "") {
      errors[name] = "Não pode ficar em branco";
    }
  };

  notEmpty("crm");
  notEmpty("curriculum");
  notEmpty("residencia_principal");
  notEmpty("residencias_secundarias");
  notEmpty("diplomas");
  notEmpty("certificados");
  notEmpty("instituicao");
  notEmpty("ano");
  return errors;
};
export class DadosPessoais extends React.Component<
  WithStyles<ClassesNames> & { values: typeof initialValuesProfissionais }
> {
  public render() {
    const { classes, values } = this.props;
    return (
      <React.Fragment>
        <Typography variant="title" className={classes.title}>
          Dados profissionais
        </Typography>
        <FormikTextField name="crm" label="CRM" margin="normal" />
        <FormikTextField
          name="instituicao"
          label="Instituição"
          margin="normal"
        />
        <FormikTextField name="ano" label="Ano de formação" margin="normal" />
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
            { label: "Obstetria", value: ESPECIALIDADES.obstetria }
          ].filter(x => x.value !== values.residencia_principal)}
        />
        <FormikFile
          name="diplomas"
          label="Diplomas"
          multi={true}
          margin="normal"
          proccessFile={this.proccessFile}
        />
        <FormikFile
          name="certificados"
          label="Certificados"
          multi={true}
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

export default withStyles(styles)(DadosPessoais);
