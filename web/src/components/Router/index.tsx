import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import Layout from "src/components/Layout";
import Home from "src/pages/Home";
import { Routes } from "src/singletons/HistoryManager";
import { DrawerContentPossibilities } from "src/utils/types";
import Cadastro from "../../pages/Cadastro";

class ConfiguredRouter extends React.Component<RouteComponentProps<{}>> {
  public render() {
    const { location } = this.props;
    return (
      <Layout
        title={location.pathname}
        drawer={DrawerContentPossibilities.anonimo}
      >
        <Route path={Routes.cadastro.index} component={Cadastro} />
        <Route path={Routes.ajuda.index} component={Home} />
        <Route path={Routes.home.index} exact={true} component={Home} />
      </Layout>
    );
  }
}

export default ConfiguredRouter;
