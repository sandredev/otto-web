import { Link } from 'react-router'

export default function Home({ userName = 'user' }) {
    return (
        <div className='bg-yellow-otto-light w-full h-screen relative flex flex-col justify-center items-center'>
            <Link to='/'>
                <button type='button' className='bg-white px-4 py-2 rounded-2xl absolute top-4 right-4'>
                    Cerrar sesión
                </button>
            </Link>
            <div className='flex flex-col gap-2 items-center justify-center'>
                <h1 className='font-extrabold text-white text-6xl'>
                    ¡Bienvenido, {userName}!
                </h1>
                <h3 className='font-extrabold text-white text-3xl'>
                    ¿Qué deseas hacer hoy?
                </h3>
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] w-full max-w-4xl gap-6 mt-10'>
                <Link to='/sales'>
                    <button type='button' className='font-bold aspect-square w-full bg-white rounded-4xl text-2xl cursor-pointer'>
                        Registrar ventas
                    </button>
                </Link>
                <Link>
                    <button type='button' className='font-bold aspect-square w-full bg-white rounded-4xl text-2xl cursor-pointer'>
                        Ver historial
                    </button>
                </Link>
            </div>
        </div>
    );
}