import React from "react";
import { SidebarLayout } from "../components/SidebarLayout";
import { TableUsers } from "../components/users/TableUsers";
import { Dashboard } from "./Dashboard";
import { Calendar, Home, Inbox, Bolt, Banknote, Users } from "lucide-react";

// Define los elementos del sidebar y sus componentes asociados
const items = [
  { title: "Home", icon: Home, component: <Dashboard />},
  { title: "Users", icon: Users, component: <TableUsers /> },
  { title: "Inbox", icon: Inbox, component: <div>Inbox Component</div> },
  { title: "Calendar", icon: Calendar, component: <div>Calendar Component</div> },
  { title: "Payments", icon: Banknote, component: <div>Payments Component</div> },
  { title: "Services", icon: Bolt, component: <div>Services Component</div> },
];

const MainRenderer = () => {
  const [activeComponent, setActiveComponent] = React.useState(items[0].component);

  return (
    <SidebarLayout 
      items={items} 
      activeComponent={activeComponent} 
      setActiveComponent={setActiveComponent}
    >
      {activeComponent}
    </SidebarLayout>
  );
};

export { MainRenderer };
