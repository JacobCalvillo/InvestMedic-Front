import { useSidebar } from "@/shared/components/ui/sidebar";

const CustomTriggerSidebar = () => {
    const  { toggleSidebar } = useSidebar();

    return (
        <button 
            onClick={toggleSidebar}
            >
            &rarr;</button>
    )
}

export default CustomTriggerSidebar

