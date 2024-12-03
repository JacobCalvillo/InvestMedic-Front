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
import { AppSidebar } from "@/components/app-sidebar"
import { CustomUserCard } from "@/components/users/CustomUserCard"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import Payment from "@/models/Payment"
import { useState, useEffect } from "react"
import { bgColorOnDate, displayCurrentTime } from "@/lib/utils"




const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button 
                    variant={"ghost"} 
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const user = row.original;
    
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => alert(`Modify ${user}`)}
                  className="buttonMenuDropdownModify cursor-pointer"
                >
                  Modify User
                </DropdownMenuItem>
                <DropdownMenuItem 
                    onClick={() => alert(`View ${user.username}`)}
                    className="buttonMenuDropdownView cursor-pointer"
                >
                  View User
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => alert(`User details for ${user.email}`)}
                  className="buttonMenuDropdownDelete cursor-pointer"
                >
                  Delete User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
]
const UserPage = () => {
    const [currentTime, setCurrentTime] = useState(displayCurrentTime());
    const [data, setData] = useState<Payment[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(displayCurrentTime());
        }, 1000);
        return () => clearInterval(interval);
       
    }, []);
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await getPayments();
    //         setData(data);
    //     };
    //     fetchData();
    // }, []);
  const fecha = new Date();
  const bgColorO = bgColorOnDate(fecha);

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
              <Separator orientation="vertical" className="mx-2 h-4" />

              
              
            </header>
            <p className="text-end mr-4">
                {currentTime}
              </p>
            <div className="flex">
              
              <CustomUserCard 
                className={`w-[400px] m-2 ${bgColorO}`}
                title="Proxima Cita" 
                content={`${fecha.toDateString()} ${currentTime}`}
              />
              <CustomUserCard 
                className={`w-[400px] m-2 ${bgColorO}`} 
                title="Proxima Cita" 
                content={`${fecha.toDateString()} ${currentTime}`}
              />
              <CustomUserCard 
                className={`w-[400px] m-2 ${bgColorO}`}
                title="Proxima Cita" 
                content={`${fecha.toDateString()} ${currentTime}`}
              />
            </div>
            <div>
              <DataTable columns={columns} data={data}/>
            </div>

          </SidebarInset>
        </SidebarProvider>
      )
}

export default UserPage