import logoOtto from '@/assets/otto-logo.png';
import Login from './Login';
import Register from './Register';
import { Outlet } from 'react-router';

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
                <Outlet />
            </div>
        </div>
    );
}