import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { DrawerContentPossibilities } from "src/utils/types";
import AppBar from "./AppBar";
import DrawerContent from "./DrawerContent";
export const drawerWidth = 240;
const initialState = {
  drawerOpen: false
};

class Layout extends React.Component<
  WithStyles<ClassesNames> & {
    title: string;
    drawer: DrawerContentPossibilities;
  },
  typeof initialState
> {
  public readonly state = initialState;
  public render() {
    const { children, classes, title } = this.props;
    const { drawerOpen } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar title={title} onMenuClick={this.onOpen} />
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

  private renderDrawerContent = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.toolbar}>
          <Typography variant="subheading">Nome da Plataforma</Typography>
        </div>
        <div>
          <Divider />
          <DrawerContent onClick={this.onClose} />
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
