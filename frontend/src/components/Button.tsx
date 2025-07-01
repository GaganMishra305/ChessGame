export const Button = ({onClick, children} : {onClick: () => void, children: React.ReactNode}) => {
    return <button onClick={onClick} className="py-2 px-4 rounded bg-green-600 hover:bg-green-500 text-white font-bold">
        {children}
    </button>;
}