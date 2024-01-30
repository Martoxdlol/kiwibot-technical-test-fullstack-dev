export type AppLayoutProps = {
    navMenu: React.ReactNode,
    children: React.ReactNode
}

export default function AppLayout(props: AppLayoutProps) {
    return <div>
        <aside className="hidden sm:block w-[300px] fixed left-0 top-0 bottom-0">
            {props.navMenu}
        </aside>
        <main className="sm:pl-[300px]">
            {props.children}
        </main>
    </div>
}