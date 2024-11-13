import { useSidebar } from "./ui/sidebar";

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

