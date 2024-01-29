export default function FullScreenCenter(props: { children: React.ReactNode }) {
    return <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        {props.children}
    </div>
}