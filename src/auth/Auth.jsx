import logoOtto from '@/assets/otto-logo.png';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import Swal from 'sweetalert2';


export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(1); 
    const [codigo, setCodigo] = useState('');
    const { loginStep1, loginStep2, loading } = useAuth();
    const navigate = useNavigate();

    // Paso 1: Enviar email + contraseña
    const handleStep1 = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            Swal.fire('Error', 'Por favor completa todos los campos', 'error');
            return;
        }

        const result = await loginStep1(email, password);

        if (result.success) {
            setStep(2);
            Swal.fire('Éxito', 'Se envió un código a tu email', 'success');
        } else {
            Swal.fire('Error', result.error, 'error');
        }
    };

   
    const handleStep2 = async (e) => {
        e.preventDefault();

        if (!codigo) {
            Swal.fire('Error', 'Ingresa el código temporal', 'error');
            return;
        }

        const result = await loginStep2(email, codigo);

        if (result.success) {
            Swal.fire('Éxito', 'Login exitoso', 'success');
            navigate('/home');
        } else {
            Swal.fire('Error', result.error, 'error');
        }
    };

    const handleVolver = () => {
        setStep(1);
        setCodigo('');
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
                            {step === 1 ? 'Inicio de sesión' : 'Verificación'}
                        </h1>
                        <h3 className='text-center'>
                            {step === 1 ? '¡Bienvenido/a de vuelta!' : 'Ingresa el código enviado a tu email'}
                        </h3>
                    </div>
                    <div className='flex flex-col items-center gap-y-2 sm:gap-y-5 px-5 sm:px-10'>
                        <form className='flex flex-col w-full gap-3 sm:gap-6' onSubmit={step === 1 ? handleStep1 : handleStep2}>
                            
                            {step === 1 ? (
                                <>
                                    <div className='flex flex-col gap-2'>
                                        <label className='font-semibold text-gray-800'>
                                            Correo electrónico
                                        </label>
                                        <input
                                            type='email'
                                            placeholder='Ingresa tu correo electrónico'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                </>
                            ) : (
                                <div className='flex flex-col gap-2'>
                                    <label className='font-semibold text-gray-800'>
                                        Código temporal
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Ingresa el código de 6 dígitos'
                                        value={codigo}
                                        onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                                        maxLength='6'
                                        className='w-full rounded-md border border-gray-300 px-2 py-3 text-gray-700 placeholder-gray-400 focus:outline-none 
                                                focus:ring-2 focus:ring-yellow-500 h-8 sm:h-10 md:h-13 max-md:landscape:h-10 text-center font-bold text-lg'
                                    />
                                </div>
                            )}
                            
                            <button 
                                type='submit'
                                disabled={loading}
                                className='bg-yellow-otto text-white font-medium rounded-md py-3 w-full hover:brightness-95 transition-all
                                            h-8 sm:h-8 md:h-11 max-md:landscape:h-10 flex justify-center items-center cursor-pointer disabled:opacity-50'
                            >
                                {loading ? 'Cargando...' : (step === 1 ? 'Siguiente' : 'Verificar')}
                            </button>

                            {step === 2 && (
                                <button
                                    type='button'
                                    onClick={handleVolver}
                                    className='text-yellow-otto underline font-medium'
                                >
                                    Volver atrás
                                </button>
                            )}
                        </form>
                    <p className='text-gray-400'>¿Usuario nuevo? <Link to='/registro' className='text-yellow-otto underline cursor-pointer'>Crea un nuevo usuario aquí</Link></p>
                    </div>
                </section>
            </div>
        </div>
    );
}