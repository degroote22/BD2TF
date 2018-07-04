import { Typography } from "@material-ui/core";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Redirect } from "react-router-dom";
import { ComponentBase } from "resub";
import { Routes } from "src/singletons/HistoryManager";
import AuthManager from "../../singletons/AuthManager";
import { LoginPossibilities } from "../../utils/types";
interface IState {
  auth: LoginPossibilities;
}
interface IProps extends React.Props<{}>, WithStyles<ClassesNames> {}
class Logoff extends ComponentBase<IProps, IState> {
  public componentDidMount() {
    setTimeout(() => {
      AuthManager.setAuth(LoginPossibilities.anonimo);
    }, 2000);
  }

  public render() {
    if (this.state.auth === LoginPossibilities.anonimo) {
      return <Redirect to={Routes.home.index} />;
    }
    return <Typography>Saindo...</Typography>;
  }

  protected _buildState(props: {}, initialBuild: boolean): IState {
    return {
      auth: AuthManager.getAuth()
    };
  }
}

type ClassesNames = "base";
const styles: StyleRulesCallback<ClassesNames> = theme => ({
  base: {}
});

export default withStyles(styles)(Logoff);
