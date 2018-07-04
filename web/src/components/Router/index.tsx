import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { ComponentBase } from "resub";
import Layout from "src/components/Layout";
import Home from "src/pages/Home";
import Login from "src/pages/Login";
import Logoff from "src/pages/Logoff";
import Medico from "src/pages/Medico";
import Paciente from "src/pages/Paciente";
import Usuario from "src/pages/Usuario";
import { Routes } from "src/singletons/HistoryManager";
import { LoginPossibilities } from "src/utils/types";
import Cadastro from "../../pages/Cadastro";
import AuthManager from "../../singletons/AuthManager";
interface IConfiguredRouterState {
  auth: LoginPossibilities;
}

interface IProps extends React.Props<{}>, RouteComponentProps<{}> {}
class ConfiguredRouter extends ComponentBase<IProps, IConfiguredRouterState> {
  public render() {
    const { location } = this.props;
    const { auth } = this.state;
    return (
      <Layout pathname={location.pathname} drawer={auth}>
        <Route path={Routes.cadastro.index} component={Cadastro} />
        <Route path={Routes.login.index} component={Login} />
        <Route path={Routes.logoff.index} component={Logoff} />
        <Route path={Routes.ajuda.index} component={Home} />
        <Route path={Routes.medico.index} component={Medico} />
        <Route path={Routes.usuario.index} component={Usuario} />
        <Route path={Routes.paciente.index} component={Paciente} />
        <Route path={Routes.home.index} exact={true} component={Home} />
      </Layout>
    );
  }

  protected _buildState(
    props: IProps,
    initialBuild: boolean
  ): IConfiguredRouterState {
    return {
      auth: AuthManager.getAuth()
    };
  }
}

export default ConfiguredRouter;
