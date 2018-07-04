import { Typography } from "@material-ui/core";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Route } from "react-router-dom";
import Medico from "src/components/Medico";
import { Routes } from "src/singletons/HistoryManager";
import { CRUDActions } from "src/utils/types";

type ClassesNames = "root";
const styles: StyleRulesCallback<ClassesNames> = () => ({
  root: {}
});

class MedicoPage extends React.Component<WithStyles<ClassesNames> & {}> {
  public render() {
    return (
      <span>
        <Route
          path={Routes.medico.ver.index}
          render={props => <Medico action={CRUDActions.read} {...props} />}
        />
        <Route
          path={Routes.medico.editar.index}
          render={props => <Medico action={CRUDActions.update} {...props} />}
        />
        <Route
          render={this.renderHome}
          path={Routes.medico.index}
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
export default withStyles(styles)(MedicoPage);
