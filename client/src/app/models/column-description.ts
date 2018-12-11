export class ColumnDescription {
  title: string;
  dataType: string;
  key?: string;
  actions?: Array<string>;
  hideOnMobile?: boolean;
  customSort?: SortFunctionDescription[];
  cssClass?: string;
}

export interface SortFunctionDescription {
  title: string;
  value: any;
  function: Function;
  isActive: boolean;
}
