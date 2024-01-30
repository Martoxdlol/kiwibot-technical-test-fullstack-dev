"use client"

import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "~/lib/utils"

export function BottomNavBar(props: { children: React.ReactNode }) {
    return <nav className="block bg-primary">
        <ul className="grid grid-flow-col" style={{ gridAutoColumns: '1fr' }}>
            {props.children}
        </ul>
    </nav>
}


export function BottomNavBarItem(props: {
    children: React.ReactNode,
    icon?: React.ReactNode,
    className?: string,
    href: Url
}) {
    const buttonEffects = "hover:bg-nav-button"

    let hrefPathname = ""
    if (typeof props.href === "string") {
        hrefPathname = new URL(props.href, 'https://localhost').pathname
    } else {
        hrefPathname = props.href.pathname || ""
    }

    const pathname = usePathname()

    const isCurrent = pathname === hrefPathname

    return <li>
        <Link href={props.href} className={cn("h-[60px] px-5 w-full flex flex-col justify-center items-center",
            buttonEffects,
            { 'text-secondary': isCurrent },
            props.className,
        )}>
            <div className="shrink-0 w-[24px] h-[24px]">
                {props.icon}
            </div>
            <p className="text-xs">
                {props.children}
            </p>
        </Link>
    </li>
}