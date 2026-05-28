

import { Link } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../lib/hooks/useAuth.js';
import alertPop from '@/utils/alertPop.js';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [setp, setStep] = useState(1); 
    const [codigo, setCodigo] = useState('');
    const {loginStep1, loginStep2, loading} = useAuth();
    const navigate = useNavigate();

        const handleStep1 = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            await alertPop(
                'ERROR DE VALIDACIÓN', 
                'Por favor completa todos los campos', 
                'error', 
                'Continuar'
            );
            return;
        }

        const result = await loginStep1(email, password);

        if (result.success) {
            setStep(2);
            await alertPop(
                'ÉXITO EN PRIMER PASO', 
                'Se envió un código a tu email', 
                'success', 
                'Continuar'
            );
        } else {
            await alertPop(
                'ERROR DE VALIDACIÓN', 
                result.error, 
                'error', 
                'Continuar'
            );
        }
    };

    const handleStep2 = async (e) => {
        e.preventDefault();

        if (!codigo) {
            await alertPop(
                'ERROR DE VALIDACIÓN', 
                'Ingresa el código temporal', 
                'error', 
                'Continuar'
            );
            return;
        }

        const result = await loginStep2(email, codigo);

        if (result.success) {
            await alertPop(
                'ÉXITO', 
                'Login exitoso', 
                'success', 
                'Continuar'
            );
            navigate('/home');
        } else {
            await alertPop(
                'ERROR DE VALIDACIÓN', 
                result.error, 
                'error', 
                'Continuar'
            );
        }
    };

    const handleVolver = () => {
        setStep(1);
        setCodigo('');
    };

    

    return (
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
            {
                /*<p className='text-gray-400'>¿Usuario nuevo? <Link to='register'>
                <span className='text-yellow-otto underline cursor-pointer'>Crea un nuevo usuario aquí</span>
                </Link></p>*/
            }
            
            </div>
        </section>
        );
}