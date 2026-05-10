export default function InputBasic({type, placeholder, name, defaultValue, id}){
    return(
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            defaultValue={defaultValue}
            id={id}
            required
            className='w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500'
        />
    )
}