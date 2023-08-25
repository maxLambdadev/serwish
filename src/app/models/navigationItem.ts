export interface NavigationItem {
    hasLink: boolean;
    link?: Array<string>;
    icon: string;
    translateKey: string;
    activeTab: string;
    name: string;
    isSearch?: boolean;
}