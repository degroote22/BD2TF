import { StyleRulesCallback } from "@material-ui/core/styles/withStyles";
export const LinkStyle = {
  outline: 0,
  textDecoration: "none"
};

export type ClassesNames = "title" | "base" | "button";

export const styles: StyleRulesCallback<ClassesNames> = theme => ({
  title: {
    marginTop: theme.spacing.unit * 4,
    color: theme.palette.grey["600"],
    "&:first-child": {
      marginTop: theme.spacing.unit * 0
    }
  },
  base: {
    flexDirection: "column",
    display: "flex",
    maxWidth: 400
  },
  button: {
    marginTop: theme.spacing.unit * 8
  }
});
