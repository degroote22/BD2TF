import { Grid, Paper, Typography } from "@material-ui/core";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Link, Route } from "react-router-dom";
import Medico from "src/components/Medico";
import Paciente from "src/components/Paciente";
import Usuario from "src/components/Usuario";
import { Routes } from "src/singletons/HistoryManager";
import { LinkStyle } from "src/utils/styles";
import { CRUDActions } from "src/utils/types";

type ClassesNames = "root" | "paper";
const styles: StyleRulesCallback<ClassesNames> = theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 2,
    display: "flex",
    justifyContent: "center"
  }
});

class Cadastro extends React.Component<WithStyles<ClassesNames> & {}> {
  public render() {
    return (
      <span>
        <Route
          path={Routes.cadastro.medico.index}
          render={props => <Medico action={CRUDActions.create} {...props} />}
        />
        <Route
          path={Routes.cadastro.paciente.index}
          render={props => <Paciente action={CRUDActions.create} {...props} />}
        />
        <Route
          path={Routes.cadastro.usuario.index}
          render={props => <Usuario action={CRUDActions.create} {...props} />}
        />
        <Route
          render={this.renderHome}
          path={Routes.cadastro.index}
          exact={true}
        />
      </span>
    );
  }

  private renderHome = () => {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="display1">Escolha uma categoria</Typography>
        <Grid container={true} className={classes.root} spacing={16}>
          {this.renderButton("Médico", Routes.cadastro.medico.index)}
          {this.renderButton("Paciente", Routes.cadastro.paciente.index)}
          {this.renderButton("Usuario", Routes.cadastro.usuario.index)}
        </Grid>
      </div>
    );
  };

  private renderButton = (label: string, to: string) => {
    const { classes } = this.props;

    return (
      <Grid item={true} xs={12} md={4}>
        <Link to={to} style={LinkStyle}>
          <Paper className={classes.paper}>
            <Typography variant="display1">{label}</Typography>
          </Paper>
        </Link>
      </Grid>
    );
  };
}
export default withStyles(styles)(Cadastro);
