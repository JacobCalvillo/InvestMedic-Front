import { LucideIcon } from "lucide-react";
import React from "react";

export interface SidebarLayoutProps {
    children: React.ReactNode;
    items: SidebarItem[];
    activeComponent: React.ReactNode;
    setActiveComponent: (component: React.ReactElement) => void;
  }
  
export interface SidebarItem {
  title: string;
  icon: LucideIcon;
  component: React.ReactElement;
}
  
export interface AppSidebarProps {
  items: SidebarItem[];
  onSelect: (component: React.ReactElement) => void;
}