import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
  } from "@/components/ui/sidebar"
import { NavMain } from "./nav-main";
import { User } from "./user";

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
            </SidebarHeader>

            <SidebarContent>
                <NavMain/>
            </SidebarContent>

            <SidebarFooter>
                <User/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    );
}