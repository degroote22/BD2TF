import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Routes, titles } from "src/singletons/HistoryManager";
import { LoginPossibilities } from "src/utils/types";
import AppBar from "./AppBar";
import DrawerContent from "./DrawerContent";
export const drawerWidth = 240;
const initialState = {
  drawerOpen: false
};

const getTitle = (pathname: string) => {
  return titles[pathname] || pathname;
};

const getDrawerTitle = (auth: LoginPossibilities) => {
  const map = {
    [LoginPossibilities.anonimo]: "Médicos Aí",
    [LoginPossibilities.medico]: "Opções de médicos",
    [LoginPossibilities.usuario]: "Opções de usuário",
    [LoginPossibilities.paciente]: "Opções de paciente"
  };
  return map[auth] || auth;
};

class Layout extends React.Component<
  WithStyles<ClassesNames> & {
    pathname: string;
    drawer: LoginPossibilities;
  },
  typeof initialState
> {
  public readonly state = initialState;
  public render() {
    const { children, classes, pathname } = this.props;
    const { drawerOpen } = this.state;
    const prettyTitle = getTitle(pathname);
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar title={prettyTitle} onMenuClick={this.onOpen} />
          <Drawer
            open={drawerOpen}
            classes={{
              paper: classes.mobileDrawerPaper
            }}
            onClose={this.onClose}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.onOpen}
              onKeyDown={this.onClose}
            >
              {this.renderDrawerContent()}
            </div>
          </Drawer>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {this.renderDrawerContent()}
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
          </main>
        </div>
      </div>
    );
  }

  private getDrawerList = () => {
    if (this.props.drawer === LoginPossibilities.anonimo) {
      return [
        {
          label: "Login",
          to: Routes.login.index
        },
        { label: "Cadastro", to: Routes.cadastro.index },
        { label: "Ajuda", to: Routes.ajuda.index }
      ];
    }

    if (this.props.drawer === LoginPossibilities.medico) {
      return [
        { label: "Pedidos em aberto", to: Routes.logoff.index },
        { label: "Pedidos concluídos", to: Routes.logoff.index },
        {
          label: "Meus dados",
          to: Routes.medico.ver.index
        },
        { label: "Editar dados", to: Routes.medico.editar.index },
        { label: "Sair da conta", to: Routes.logoff.index }
      ];
    }

    if (this.props.drawer === LoginPossibilities.usuario) {
      return [
        { label: "Faturamento", to: Routes.logoff.index },
        {
          label: "Meus dados",
          to: Routes.usuario.ver.index
        },
        { label: "Editar dados", to: Routes.usuario.editar.index },
        { label: "Sair da conta", to: Routes.logoff.index }
      ];
    }

    if (this.props.drawer === LoginPossibilities.paciente) {
      return [
        { label: "Marcar consulta", to: Routes.logoff.index },
        {
          label: "Meus dados",
          to: Routes.paciente.ver.index
        },
        { label: "Editar dados", to: Routes.paciente.editar.index },
        { label: "Sair da conta", to: Routes.logoff.index }
      ];
    }

    throw Error("n implementado");
  };

  private renderDrawerContent = () => {
    const { classes } = this.props;
    const list = this.getDrawerList();
    return (
      <React.Fragment>
        <div className={classes.toolbar}>
          <Typography variant="subheading">
            {getDrawerTitle(this.props.drawer)}
          </Typography>
        </div>
        <div>
          <Divider />
          <DrawerContent list={list} onClick={this.onClose} />
        </div>
      </React.Fragment>
    );
  };

  private onClose = () => {
    // Se nao for assíncrono, não fecha.
    setTimeout(() => {
      this.setState({ drawerOpen: false });
    }, 0);
  };

  private onOpen = () => {
    this.setState({ drawerOpen: true });
  };
}

type ClassesNames =
  | "root"
  | "appFrame"
  | "drawerPaper"
  | "toolbar"
  | "content"
  | "mobileDrawerPaper";

const styles: StyleRulesCallback<ClassesNames> = theme => ({
  root: {
    flexGrow: 1
  },
  appFrame: {
    zIndex: 1,
    position: "relative",
    display: "flex",
    width: "100%"
  },
  mobileDrawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: 0
    }
  },
  drawerPaper: {
    width: 0,
    position: "relative",
    [theme.breakpoints.up("md")]: {
      width: drawerWidth
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

export default withStyles(styles)(Layout);
