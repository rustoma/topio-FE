export type MenuLink = {
  id: number | string;
  url?: string;
  title: string;
  items: MenuLink[];
};
