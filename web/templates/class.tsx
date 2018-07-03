import withStyles, {
  StyleRulesCallback,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import * as React from "react";

class TrocarNome extends React.Component<WithStyles<ClassesNames> & {}> {
  public render() {
    return <span />;
  }
}

type ClassesNames = "base";
const styles: StyleRulesCallback<ClassesNames> = theme => ({
  base: {}
});

export default withStyles(styles)(TrocarNome);
