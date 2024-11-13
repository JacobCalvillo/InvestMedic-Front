import React from "react"
import {  SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import  AppSidebar  from "@/components/app-sidebar";


const SidebarLayout = ({ children }: {children: React.ReactNode}) => {
    const [open, setOpen] = React.useState(false)

    return (
        <SidebarProvider 
            open={open} 
            onOpenChange={setOpen}
            defaultOpen
            >
            <AppSidebar />
                <main>
                <SidebarTrigger />
                    {children} 
                </main>
        </SidebarProvider>

        
    )
}

export { SidebarLayout }

