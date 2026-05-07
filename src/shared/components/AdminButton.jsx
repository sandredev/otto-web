export default function AdminButton({text, onClick}){

    const bgColor = text.toLowerCase()==='eliminar'?'bg-[#FF2323]':'bg-blue-600';

    return(
        <button
            type={'button'}
            onClick={onClick}
            className={`${bgColor} text-white font-medium rounded-md py-3 w-full hover:brightness-95 transition-all`}
        >
            {text}
        </button>
    )
}