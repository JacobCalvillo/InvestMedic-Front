import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
  } from "@/components/ui/sidebar"
  
import { Calendar , Home, Inbox, Search, Settings } from "lucide-react"
  
const items  = [
  {
    title:"Home",
    icon:Home,
    url:"/dashboard",
  },
  {
    title:"Inbox",
    icon:Inbox,
    url:"#",
  },
  {
    title:"Calendar",
    icon:Calendar,
    url:"#",  
  },
  {
    title:"Payments",
    icon:Search,
    url:"#",
  },
  {
    title:"Appointments",
    icon:Settings,
    url:"#",
  },
]

   function AppSidebar() {
    return (
      <Sidebar variant='sidebar' collapsible='icon'>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
            <SidebarGroupLabel>Applications</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  
export default AppSidebar;