/**
 * @description: 菜單
 */
export type Menu = {
    name: string;
    icon: string;
    route: string;
    sub?: SubMenu[];
};

type SubMenu = {
    name: string;
    subItems: SubMenuItem[];
};

type SubMenuItem = {
    icon: string;
    route: string;
    name: string;
    show?: boolean;
};
