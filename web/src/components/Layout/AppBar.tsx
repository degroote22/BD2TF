import AppBarUi from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { drawerWidth } from "src/components/Layout";
const initialState = {
  anchorEl: undefined as HTMLElement | undefined
};
class AppBar extends React.Component<
  WithStyles<ClassesNames> & { title: string; onMenuClick: () => void },
  typeof initialState
> {
  public readonly state = initialState;
  public render() {
    const { classes, title, onMenuClick } = this.props;

    const auth = false;

    return (
      <AppBarUi className={classes.appBar} position="absolute">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {title}
          </Typography>
          {auth && this.renderAuth()}
        </Toolbar>
      </AppBarUi>
    );
  }

  private renderAuth = () => {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
        </Menu>
      </div>
    );
  };

  private handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleClose = () => {
    this.setState({ anchorEl: undefined });
  };
}

type ClassesNames = "flex" | "menuButton" | "appBar";
const styles: StyleRulesCallback<ClassesNames> = theme => ({
  flex: {
    flex: 1
  },
  appBar: {
    withth: 0,
    marginLeft: 0,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

export default withStyles(styles)(AppBar);
