import AppLayout from "~/components/app-layout";
import { NavHeader, NavMenu, NavMenuItem } from "~/components/nav-menu";
import { ChefHatIcon, LayoutDashboardIcon, StoreIcon, UserRoundIcon } from 'lucide-react';
import { BottomNavBar, BottomNavBarItem } from "~/components/bottom-nav-bar";

export default function Layout(props: { children: React.ReactNode }) {
    return <AppLayout
        sideNavMenu={<NavMenu
            header={<NavHeader>
                Welcome
            </NavHeader>}
        >
            <NavMenuItem href="/dashboard" icon={<LayoutDashboardIcon />}>Overview</NavMenuItem>
            <NavMenuItem href="/dashboard/orders" icon={<ChefHatIcon />}>Orders</NavMenuItem>
            <NavMenuItem href="/dashboard/clients" icon={<UserRoundIcon />}>Clients</NavMenuItem>
            <NavMenuItem href="/dashboard/restaurants" icon={<StoreIcon />}>Restaurants</NavMenuItem>
        </NavMenu>}
        bottomNavBar={<BottomNavBar>
            <BottomNavBarItem href="/dashboard" icon={<LayoutDashboardIcon />}>Overview</BottomNavBarItem>
            <BottomNavBarItem href="/dashboard/orders" icon={<ChefHatIcon />}>Orders</BottomNavBarItem>
            <BottomNavBarItem href="/dashboard/clients" icon={<UserRoundIcon />}>Clients</BottomNavBarItem>
            <BottomNavBarItem href="/dashboard/restaurants" icon={<StoreIcon />}>Restaurants</BottomNavBarItem>
        </BottomNavBar>}
    >
        {props.children}
    </AppLayout>
}