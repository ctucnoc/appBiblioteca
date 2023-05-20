export interface NavItem {
  displayName?: string;
  summary?: String;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  children?: NavItem[];
}
