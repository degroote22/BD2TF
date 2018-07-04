import { Typography } from "@material-ui/core";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Route } from "react-router-dom";
import Paciente from "src/components/Paciente";
import { Routes } from "src/singletons/HistoryManager";
import { CRUDActions } from "src/utils/types";

type ClassesNames = "root";
const styles: StyleRulesCallback<ClassesNames> = () => ({
  root: {}
});

class PacientePage extends React.Component<WithStyles<ClassesNames> & {}> {
  public render() {
    return (
      <span>
        <Route
          path={Routes.paciente.ver.index}
          render={props => <Paciente action={CRUDActions.read} {...props} />}
        />
        <Route
          path={Routes.paciente.editar.index}
          render={props => <Paciente action={CRUDActions.update} {...props} />}
        />
        <Route
          render={this.renderHome}
          path={Routes.paciente.index}
          exact={true}
        />
      </span>
    );
  }

  private renderHome = () => {
    return (
      <div>
        <Typography variant="display1">XXXX</Typography>
      </div>
    );
  };
}
export default withStyles(styles)(PacientePage);
