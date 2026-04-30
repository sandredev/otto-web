import logoOtto from '@/assets/otto-logo.png';

/*Falta hacerlo responsive*/
export default function Auth() {
    return (
        <div className='bg-yellow-otto-light flex items-center justify-center w-full h-screen px-8'>
            <div className='flex items-center justify-center gap-12 w-full max-w-6xl'>
                <div className='flex justify-center items-center'>
                    <img
                        src={logoOtto}
                        alt='Logo Otto'
                        className='aspect-square w-full h-auto object-contain drop-shadow-black'
                    />
                </div>
                <section className='bg-white rounded-[3rem] shadow-2xl px-16 py-14 w-full max-w-2xl min-h-162.5 flex flex-col items-center'>
                    <h1 className='font-extrabold text-5xl mb-1 text-center'>Inicio de sesión</h1>
                    <h3>¡Bienvenido/a de vuelta!</h3>
                    <div className='h-8'></div>
                    <form className='flex flex-col w-full gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold text-gray-800'>
                                Correo electrónico
                            </label>
                            <input
                                type='email'
                                placeholder='Ingresa tu correo electrónico'
                                className='w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='font-semibold text-gray-800'>
                                Contraseña
                            </label>
                            <input
                                type='password'
                                placeholder='Ingresa tu contraseña'
                                className='w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                            />
                        </div>
                        <div className='h-8'></div>
                        <button
                            type='submit'
                            className='bg-yellow-otto text-white font-medium rounded-md py-3 w-full hover:brightness-95 transition-all'
                        >
                            Iniciar sesión
                        </button>
                    </form>
                    <div className='h-8'></div>
                    <p className='text-gray-400'>¿Usuario nuevo? <span className='text-yellow-otto underline cursor-pointer'>Crea un nuevo usuario aquí</span></p>
                </section>
            </div>
        </div>
    );
}