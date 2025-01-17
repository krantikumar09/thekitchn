import { CirclePlus, LayoutDashboard, List, ListCheck } from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
  } from "@/components/ui/sidebar"
import { Link } from "react-router-dom";


export function NavMain() {

    const navItem = [
        {
            title: "DashBoard",
            link: "/",
            icon: LayoutDashboard
        },
        {
            title: "Add Product",
            link: "/add",
            icon: CirclePlus
        }, 
        {
            title: "All Products",
            link: "/all-products",
            icon: List
        }, 
        {
            title: "All Orders",
            link: "/orders",
            icon: ListCheck
        }
    ]

    return (
        <SidebarGroup>
            <SidebarMenu>
                {
                    navItem.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link to={item.link}>
                                    <item.icon/>
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))
                }
            </SidebarMenu>
        </SidebarGroup>
    );
}