/// <reference path="./../defs/tsd.d.ts" />

interface IDispatcherPayload<T> {
  type: string;
  payload: T;
}

interface ITextFieldData {
  value?: string;
  error?: string;
  validators?: any[];
}

interface IValidator {
  message: string;
  getIsValid(value: any): boolean;
}

interface IFormValidatorResponse {
  isValid: boolean;
  formData: any;
}

declare module "events" {
  export class EventEmitter {
    on: any;
    emit: any;
  }
}

declare module "react-tap-event-plugin" {
  export default function injectTapEventPlugin(): any;
}

declare module "history/lib/createBrowserHistory" {
  export default function createBrowserHistory(): any;
}

declare module "parse" {
  export const User: any;
  export const Query: any;
  export const initialize: any;
}

declare module "react-router" {
  export const Router: any;
  export const Route: any;
  export const IndexRoute: any;
  export const Link: any;
}

declare module "material-ui" {
    export const AppBar: any;
    export const AppCanvas: any;
    export const Avatar: any;
    export const BeforeAfterWrapper: any;
    export const Card: any;
    export const CardActions: any;
    export const CardExpandable: any;
    export const CardHeader: any;
    export const CardMedia: any;
    export const CardText: any;
    export const CardTitle: any;
    export const Checkbox: any;
    export const CircularProgress: any;
    export const ClearFix: any;
    export const DatePicker: any;
    export const DatePickerDialog: any;
    export const Dialog: any;
    export const DropDownIcon: any;
    export const DropDownMenu: any;
    export const EnhancedButton: any;
    export const FlatButton: any;
    export const FloatingActionButton: any;
    export const FontIcon: any;
    export const IconButton: any;
    export const IconMenu: any;
    export const LeftNav: any;
    export const LinearProgress: any;
    export const List: any;
    export const ListDivider: any;
    export const ListItem: any;
    export const Menu: any;
    export const MenuItem: any;
    export const Mixins: any;
    export const Overlay: any;
    export const Paper: any;
    export const RadioButton: any;
    export const RadioButtonGroup: any;
    export const RaisedButton: any;
    export const RefreshIndicator: any;
    export const Ripples: any;
    export const SelectField: any;
    export const Slider: any;
    export const SvgIcon: any;

    export const NavigationMenu: any;
    export const NavigationChevronLeft: any;
    export const NavigationChevronRight: any;
    export const Icons: {
        NavigationMenu: any;
        NavigationChevronLeft: any;
        NavigationChevronRight: any;
    };

    export const Styles: any;
    export const Snackbar: any;
    export const Tab: any;
    export const Tabs: any;
    export const Table: any;
    export const TableBody: any;
    export const TableFooter: any;
    export const TableHeader: any;
    export const TableHeaderColumn: any;
    export const TableRow: any;
    export const TableRowColumn: any;
    export const ThemeWrapper: any;
    export const Toggle: any;
    export const TimePicker: any;
    export const TextField: any;
    export const Toolbar: any;
    export const ToolbarGroup: any;
    export const ToolbarSeparator: any;
    export const ToolbarTitle: any;
    export const Tooltip: any;
    export const Utils: any;

    // export type definitions
    export const TouchTapEvent: any;
    export const TouchTapEventHandler: any;
    export const DialogAction: any;
}

declare module 'material-ui/lib/styles' {
  export const AutoPrefix: any;
  export const Colors: any;
  export const Spacing: any;
  export const ThemeManager: any;
  export const Transitions: any;
  export const Typography: any;
  export const LightRawTheme: any;
  export const DarkRawTheme: any;
  export const ThemeDecorator: any;
}

declare module 'material-ui/lib/utils' {
    export const ColorManipulator: any;
    export const CssEvent: any;
    export const Dom: any;
    export const Events: any;
    export const Extend: any;
    export const ImmutabilityHelper: any;
    export const KeyCode: any;
    export const KeyLine: any;
    export const UniqueId: any;
    export const Styles: any;
}