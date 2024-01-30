export type AppLayoutProps = {
    sideNavMenu: React.ReactNode,
    bottomNavBar: React.ReactNode,
    children: React.ReactNode
}

export default function AppLayout(props: AppLayoutProps) {
    return <div>
        <aside className="hidden sm:block w-[300px] fixed left-0 top-0 bottom-0">
            {props.sideNavMenu}
        </aside>
        <main className="sm:pl-[300px] pb-[60px] sm:pb-0 min-h-[100dvh]">
            {props.children}
        </main>
        <aside className="sm:hidden fixed bottom-0 left-0 right-0 h-[60px]">
            {props.bottomNavBar}
        </aside>
    </div>
}