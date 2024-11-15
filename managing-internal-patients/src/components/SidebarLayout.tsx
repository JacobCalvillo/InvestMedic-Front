import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { SidebarLayoutProps } from "@/lib/interfaces";

const SidebarLayout = ({ items, activeComponent, setActiveComponent } : SidebarLayoutProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} defaultOpen>
      <div className="flex w-full">
        <AppSidebar items={items} onSelect={setActiveComponent} />
        <SidebarTrigger />
        <main className="flex justify-center w-full">
          {activeComponent}
        </main>
      </div>
    </SidebarProvider>
  );
};

export { SidebarLayout };
