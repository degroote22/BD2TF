import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "src/singletons/HistoryManager";
import { LinkStyle } from "../../utils/styles";

class DrawerContent extends React.Component<
  WithStyles<ClassesNames> & { onClick: () => void }
> {
  public render() {
    return (
      <List component="nav">
        {this.makeLinkButton("Login", Routes.login.index)}
        {this.makeLinkButton("Cadastro", Routes.cadastro.index)}
        {this.makeLinkButton("Ajuda", Routes.ajuda.index)}
      </List>
    );
  }

  private makeLinkButton = (label: string, to: string) => {
    const { onClick } = this.props;
    return (
      <Link to={to} style={LinkStyle}>
        <ListItem button={true} onClick={onClick}>
          <ListItemText primary={label} />
        </ListItem>
      </Link>
    );
  };
}

type ClassesNames = "base";
const styles: StyleRulesCallback<ClassesNames> = theme => ({
  base: {}
});

export default withStyles(styles)(DrawerContent);
