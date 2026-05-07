import { Link } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBox, faX } from '@fortawesome/free-solid-svg-icons';

export default function Home({ userName = 'user' }) {
    return (
        <div className='bg-yellow-otto-light w-full h-screen relative flex flex-col justify-center items-center'>
            <Link to='/'>
                <button type='button' className='bg-white p-2 sm:px-4 sm:py-2 rounded-2xl absolute top-1 right-1 lg:top-4 lg:right-4 flex items-center gap-x-1 
                            text-xs sm:text-sm md:text-base lg:text-lg cursor-pointer'>
                    <FontAwesomeIcon icon={faX} className='sm:mr-2'/>
                    <span className='hidden sm:block'>Cerrar sesión</span>
                </button>
            </Link>
            <div className='flex flex-col gap-2 items-center justify-center'>
                <h1 className='font-extrabold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>
                    ¡Bienvenido, {userName}!
                </h1>
                <h3 className='font-extrabold text-white sm:text-base md:text-xl lg:text-2xl xl:text-3xl'>
                    ¿Qué deseas hacer hoy?
                </h3>
            </div>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full max-w-4xl gap-6 mt-7 sm:mt-9 lg:mt-12 px-10'>
                <Link to='/sales'>
                    <button type='button' className='font-bold aspect-square w-full bg-white rounded-4xl text-sm sm:text-base md:text-xl lg:text-2xl cursor-pointer flex
                        items-center justify-center flex-col gap-y-5'>
                        Registrar ventas
                        <FontAwesomeIcon icon={faBox} className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-yellow-otto'/>
                    </button>
                </Link>
                <Link to='/history'>
                    <button type='button' className='font-bold aspect-square w-full bg-white rounded-4xl text-sm sm:text-base md:text-xl lg:text-2xl cursor-pointer flex
                        items-center justify-center flex-col gap-y-5'>
                        Ver historial
                        <FontAwesomeIcon icon={faBook} className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-yellow-otto'/>
                    </button>
                </Link>
            </div>
        </div>
    );
}