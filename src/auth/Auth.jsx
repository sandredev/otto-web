import logoOtto from '@/assets/otto-logo.png';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Swal from 'sweetalert2';

export default function Auth() {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loginStep1, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!emailOrUsername || !password) {
            Swal.fire('Error', 'Por favor completa todos los campos', 'error');
            return;
        }

        const result = await loginStep1(emailOrUsername, password);

        if (result.success) {
            Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success').then(() => {
        navigate('/sales');
    });
        } else {
            Swal.fire('Error', result.error, 'error');
        }
    };

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
                        <h1 className='font-extrabold text-[clamp(1.6rem,calc(2vw+2vh),3rem)] text-center'>
                            Inicio de sesión
                        </h1>
                        <h3 className='text-center'>¡Bienvenido/a de vuelta!</h3>
                    </div>
                    <div className='flex flex-col items-center gap-y-2 sm:gap-y-5 px-5 sm:px-10'>
                        <form className='flex flex-col w-full gap-3 sm:gap-6' onSubmit={handleLogin}>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold text-gray-800'>
                                    Correo electrónico o Usuario
                                </label>
                                <input
                                    type='text'
                                    placeholder='Ingresa tu correo electrónico o usuario'
                                    value={emailOrUsername}
                                    onChange={(e) => setEmailOrUsername(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full rounded-md border border-gray-300 px-2 py-3 text-gray-700 placeholder-gray-400 focus:outline-none 
                                            focus:ring-2 focus:ring-yellow-500 h-8 sm:h-10 md:h-13 max-md:landscape:h-10'
                                />
                            </div>
                            
                            <button 
                                type='submit'
                                disabled={loading}
                                className='bg-yellow-otto text-white font-medium rounded-md py-3 w-full hover:brightness-95 transition-all
                                            h-8 sm:h-8 md:h-11 max-md:landscape:h-10 flex justify-center items-center cursor-pointer disabled:opacity-50'
                            >
                                {loading ? 'Cargando...' : 'Iniciar sesión'}
                            </button>
                        </form>
                        {/* 
                        <p className='text-gray-400'>
                            ¿Usuario nuevo? 
                            <Link to='/registro' className='text-yellow-otto underline cursor-pointer ml-1'>
                                Crea un nuevo usuario aquí
                            </Link>
                        </p>*/}
                    </div>
                </section>
            </div>
        </div>
    );
}