import { Typography } from "@material-ui/core";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Route } from "react-router-dom";
import Usuario from "src/components/Usuario";
import { Routes } from "src/singletons/HistoryManager";
import { CRUDActions } from "src/utils/types";

type ClassesNames = "root";
const styles: StyleRulesCallback<ClassesNames> = () => ({
  root: {}
});

class UsuarioPage extends React.Component<WithStyles<ClassesNames> & {}> {
  public render() {
    return (
      <span>
        <Route
          path={Routes.usuario.ver.index}
          render={props => <Usuario action={CRUDActions.read} {...props} />}
        />
        <Route
          path={Routes.usuario.editar.index}
          render={props => <Usuario action={CRUDActions.update} {...props} />}
        />
        <Route
          render={this.renderHome}
          path={Routes.usuario.index}
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
export default withStyles(styles)(UsuarioPage);
