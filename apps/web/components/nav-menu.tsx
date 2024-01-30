"use client"
import type { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "~/lib/utils"

export function NavMenu(props: {
    children: React.ReactNode,
    className?: string,
    header?: React.ReactNode
}) {
    return <div className={cn("w-full h-full overflow-auto px-5 bg-nav", props.className)}>
        <div className="py-5">
            {props.header}
        </div>
        <nav>
            <ul className="flex flex-col gap-2">
                {props.children}
            </ul>
        </nav>
    </div>
}

export function NavMenuItem(props: {
    children: React.ReactNode,
    icon?: React.ReactNode,
    className?: string,
    href: Url
}) {
    const buttonEffects = "bg-nav-button hover:bg-[#D6D6D6] active:bg-[#C9C9C9]"

    let hrefPathname = ""
    if (typeof props.href === "string") {
        hrefPathname = new URL(props.href, 'https://localhost').pathname
    } else {
        hrefPathname = props.href.pathname || ""
    }

    const pathname = usePathname()

    const isCurrent = pathname === hrefPathname

    return <li>
        <Link href={props.href} className={cn("h-[48px] px-5 flex items-center gap-5 rounded-md",
            buttonEffects,
            { 'text-blue-500': isCurrent },
            props.className,
        )}>
            <div className="shrink-0 w-[24px] h-[24px]">
                {props.icon}
            </div>
            <div>
                {props.children}
            </div>
        </Link>
    </li>
}

export function NavHeader(props: {
    children: React.ReactNode,
    className?: string
}) {
    return <header className={cn("bg-nav-button rounded-md p-5 flex", props.className)}>
        {props.children}
    </header>
}