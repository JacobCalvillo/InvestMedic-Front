import * as React from "react"
import { SearchForm } from '@/components/search-form'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Users",
      url: "#",
      items: [
        {
          title: "View Users",
          url: "#",
        },
      
      ],
    },
    {
      title: "Products  / Services",
      url: "#",
      items: [
        {
          title: "Create Service",
          url: "#",
        },
        {
          title: "View Services",
          url: "#",
          isActive:true
        }
      ],
    },
    {
      title: "Providers",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
       
      ],
    },
    {
      title: "Suscription",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
