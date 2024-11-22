import { CustomAreaChart } from "@/components/CustomAreaChart"
import { CustomPieChart } from "@/components/CustomPieChart"
import { CustomBarChart } from "@/components/CustomBarChart"
import { CustomLineChart } from "@/components/CustomLineChart"

const Dashboard = () => {
    return (
        <div> 
            <div className="py-16 px-8">    
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
            </div>  
        </div>
    )
}


export { Dashboard }