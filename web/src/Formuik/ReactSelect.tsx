// import Chip from "@material-ui/core/Chip";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import CancelIcon from "@material-ui/icons/Cancel";
import ClearIcon from "@material-ui/icons/Clear";
import * as React from "react";
import Select, {
  ArrowRendererProps,
  HandlerRendererResult,
  OptionComponentProps,
  OptionValues,
  ReactSelectProps
} from "react-select";

export class Option extends React.Component<
  OptionComponentProps<OptionValues>
> {
  public render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus as any}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {children}
      </MenuItem>
    );
  }

  private handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.option, event);
    }
  };
}

// tslint:disable-next-line:max-classes-per-file
export class SelectWrapped extends React.Component<{
  multi?: boolean;
  setTouched: () => void;
  onDelete: (value: { label: string; value: string }) => void;
}> {
  public render() {
    return (
      <Select
        multi={this.props.multi}
        onClose={this.props.setTouched}
        optionComponent={Option}
        noResultsText={this.renderNoResultsText()}
        arrowRenderer={this.renderArrow}
        clearRenderer={this.renderClear}
        valueComponent={this.renderValueComponent}
        {...this.props}
      />
    );
  }

  private renderValueComponent = (
    valueProps: ReactSelectProps<OptionValues>
  ) => {
    const { children, value } = valueProps;
    const onDelete = this.onDelete(value as any);
    if (this.props.multi) {
      return (
        <Chip
          style={{ marginRight: 8 }}
          tabIndex={-1}
          label={children}
          deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
          onDelete={onDelete}
        />
      );
    }

    return <div className="Select-value">{children}</div>;
  };

  private onDelete = (obj: { label: string; value: string }) => (
    event: React.TouchEvent<SVGSVGElement>
  ) => {
    this.props.onDelete(obj);
  };

  private renderClear = () => <ClearIcon />;

  private renderArrow = (
    arrowProps: ArrowRendererProps
  ): HandlerRendererResult => {
    return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
  };

  private renderNoResultsText = () => (
    <Typography>Nenhum resultado encontrado</Typography>
  );
}
