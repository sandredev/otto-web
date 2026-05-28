export default function InputBasic({type, placeholder, name, value, onChange, id, defaultValue}){
    return(
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            id={id}
            defaultValue={defaultValue}
            className='w-full rounded-md border border-gray-300 px-4 py-3 text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500'
        />
    )
}