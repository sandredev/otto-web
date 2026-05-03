import logoOtto from '@/assets/otto-logo.png';
import { Link } from 'react-router';

/*Falta hacerlo responsive*/
export default function Auth() {
    return (
        <div className='bg-yellow-otto-light w-full min-h-screen px-8 flex items-center justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-2 landscape:grid-cols-2 w-full max-w-6xl gap-y-10 items-center'>
                <div className='flex justify-center items-center md:justify-start'>
                    <img
                            src={logoOtto}
                            alt='Logo Otto'
                            className='aspect-square w-[clamp(12rem,30vw+10vh,40rem)] max-w-md h-auto object-fit drop-shadow-black'
                    />
                </div>
                <section className='bg-white rounded-[3rem] shadow-2xl py-5 sm:py-7 md:py-10 lg:py-14 w-full max-w-2xl grid gap-3 
                                        items-center text-[clamp(0.75rem,calc(1vw+1vh),1rem)]'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='font-extrabold text-[clamp(1.8rem,calc(2vw+2vh),3rem)] text-center'>Inicio de sesión</h1>
                        <h3 className='text-center'>¡Bienvenido/a de vuelta!</h3>
                    </div>
                    <div className='flex flex-col items-center gap-y-2 sm:gap-y-5 px-5 sm:px-10'>
                        <form className='flex flex-col w-full gap-3 sm:gap-6'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold text-gray-800'>
                                    Correo electrónico
                                </label>
                                <input
                                    type='email'
                                    placeholder='Ingresa tu correo electrónico'
                                    className='w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 
                                            focus:outline-none focus:ring-2 focus:ring-yellow-500 h-8 sm:h-10 md:h-13'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold text-gray-800'>
                                    Contraseña
                                </label>
                                <input
                                    type='password'
                                    placeholder='Ingresa tu contraseña'
                                    className='w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none 
                                            focus:ring-2 focus:ring-yellow-500 h-8 sm:h-10 md:h-13'
                                />
                            </div>
                            
                            <Link to='/home'>
                                <button 
                                    type='submit'
                                    className='bg-yellow-otto text-white font-medium rounded-md py-3 w-full hover:brightness-95 transition-all
                                                h-8 sm:h-8 md:h-11 flex justify-center items-center cursor-pointer'
                                >
                                    Iniciar sesión
                                </button>
                            </Link>
                        </form>
                    <p className='text-gray-400'>¿Usuario nuevo? <span className='text-yellow-otto underline cursor-pointer'>Crea un nuevo usuario aquí</span></p>
                    </div>
                </section>
            </div>
        </div>
    );
}