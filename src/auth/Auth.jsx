import logoOtto from '@/assets/otto-logo.png';
import { Link } from 'react-router';

/*Falta hacerlo responsive*/
export default function Auth() {
    return (
        <div className='bg-yellow-otto-light w-full min-h-dvh px-8 flex items-center justify-center'>
            <div className='grid portrait:grid-cols-1 landscape:grid-cols-2 w-full max-w-6xl gap-y-10 items-center'>
                <div className='flex items-center justify-center'>
                    <img
                            src={logoOtto}
                            alt='Logo Otto'
                            className='aspect-square w-[clamp(12rem,30vw+10vh,40rem)] max-w-md h-auto max-md:landscape:w-50 object-fit drop-shadow-black'
                    />
                </div>
                <section className='bg-white rounded-[3rem] shadow-2xl px-2 py-6 sm:py-7 md:py-10 lg:py-14 w-full grid max-w-2xl gap-3 
                                        items-center text-[clamp(0.6rem,calc(1vw+1vh),1rem)] max-md:landscape:py-3 justify-self-center'>
                    <div className='flex flex-col items-center justify-center'>
                        <h1 className='font-extrabold text-[clamp(1.6rem,calc(2vw+2vh),3rem)] text-center'>Inicio de sesión</h1>
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
                                    className='w-full rounded-md border border-gray-300 px-2 py-3 text-gray-700 placeholder-gray-400 
                                            focus:outline-none focus:ring-2 focus:ring-yellow-500 h-8 sm:h-10 md:h-13 max-md:landscape:h-10'
                                />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold text-gray-800'>
                                    Contraseña
                                </label>
                                <input
                                    type='password'
                                    placeholder='Ingresa tu contraseña'
                                    className='w-full rounded-md border border-gray-300 px-2 py-3 text-gray-700 placeholder-gray-400 focus:outline-none 
                                            focus:ring-2 focus:ring-yellow-500 h-8 sm:h-10 md:h-13 max-md:landscape:h-10'
                                />
                            </div>
                            
                            <Link to='/home'>
                                <button 
                                    type='submit'
                                    className='bg-yellow-otto text-white font-medium rounded-md py-3 w-full hover:brightness-95 transition-all
                                                h-8 sm:h-8 md:h-11 max-md:landscape:h-10 flex justify-center items-center cursor-pointer'
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