
import Payment from "@/models/Payment"
import { ColumnDef } from "@tanstack/react-table"



export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "patientId",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
