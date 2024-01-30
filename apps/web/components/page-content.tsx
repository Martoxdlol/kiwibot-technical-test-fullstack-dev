import { cn } from "~/lib/utils";

export default function PageContent(props: { title: React.ReactNode, children: React.ReactNode, className?: string }) {
    return <div>
        <nav className="bg-[#FDF1F1] h-[60px] flex items-center px-5 text-2xl">
            {props.title}
        </nav>
        <main className={cn('p-5', props.className)}>
            {props.children}
        </main>
    </div>
} 