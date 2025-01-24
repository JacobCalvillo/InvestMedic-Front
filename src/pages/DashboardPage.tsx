import { CustomAreaChart } from "@/components/CustomAreaChart"
import { CustomPieChart } from "@/components/CustomPieChart"
import { CustomBarChart } from "@/components/CustomBarChart"
import { CustomLineChart } from "@/components/CustomLineChart"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


const Dashboard = () => {
    return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
                 
                 <div className="grid grid-rows-2 grid-cols-3 gap-4">
                     <div className="container">
                         <CustomAreaChart />
                     </div>
                     <div className="container">
                         <CustomPieChart />
                     </div>
                     <div className="container ">
                         <CustomBarChart />
                     </div>
                     <div className="container col-span-3">
                         <CustomLineChart />
                     </div>
                 </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      )
}

export { Dashboard }