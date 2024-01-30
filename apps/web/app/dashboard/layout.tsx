import AppLayout from "~/components/app-layout";
import { NavHeader, NavMenu, NavMenuItem } from "~/components/nav-menu";
import { ChefHatIcon, LayoutDashboardIcon, StoreIcon, UserRoundIcon } from 'lucide-react';

export default function Layout(props: { children: React.ReactNode }) {
    return <AppLayout
        navMenu={<NavMenu
            header={<NavHeader>
                Welcome
            </NavHeader>}
        >
            <NavMenuItem href="/dashboard" icon={<LayoutDashboardIcon />}>Overview</NavMenuItem>
            <NavMenuItem href="/orders" icon={<ChefHatIcon />}>Orders</NavMenuItem>
            <NavMenuItem href="/clients" icon={<UserRoundIcon />}>Clients</NavMenuItem>
            <NavMenuItem href="/restaurants" icon={<StoreIcon />}>Restaurants</NavMenuItem>
        </NavMenu>}
    >
        {props.children}
    </AppLayout>
}