import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/models/User"
import { getUsers } from "@/services/userService"
import { useState, useEffect } from 'react';

import { ArrowUpDown } from "lucide-react";

import { Button } from "../ui/button"

import { MoreHorizontal } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "Id",
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
                  onClick={() => alert(`Modify ${user.username}`)}
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

const TableUsers = () => {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUsers();
            setData(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-20 flex w-full flex-col items-center">
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export { TableUsers }