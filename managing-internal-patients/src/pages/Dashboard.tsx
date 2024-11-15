import { SidebarLayout } from "../components/SidebarLayout"
import { DataTable } from "../components/ui/data-table"
import { columns } from "../components/table/columns"

const Dashboard = () => {

    

    return (
        <SidebarLayout>
            <h1>Dashboard</h1>
            <DataTable  columns={columns} data={data}/>
        </SidebarLayout>
    )
}

export { Dashboard }