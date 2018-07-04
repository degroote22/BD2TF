import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Link } from "react-router-dom";
import { LinkStyle } from "../../utils/styles";
interface IButton {
  label: string;
  to: string;
}
class DrawerContent extends React.Component<
  WithStyles<ClassesNames> & { onClick: () => void; list: IButton[] }
> {
  public render() {
    return (
      <List component="nav">
        {this.props.list.map(x => {
          return this.makeLinkButton(x.label, x.to);
        })}
      </List>
    );
  }

  private makeLinkButton = (label: string, to: string) => {
    const { onClick } = this.props;
    return (
      <Link to={to} style={LinkStyle} key={label}>
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
