import { NavLink, Outlet } from 'react-router';
import ottoLogo from '@/assets/otto-logo.png';
import Sidebar from './Sidebar';

export default function SalesLayout() {
    return (
        <div className="grid [grid-template-areas:'header_header'_'sidebar_main'] grid-cols-[clamp(70px,10vw,90px)_1fr] grid-rows-[10dvh_90dvh] ">
            <header className="[grid-area:header] bg-yellow-otto-light flex items-center justify-center h-[10dvh] 
                            text-[clamp(1.2rem,3vw,1.8rem)] text-shadow-md font-bold text-white sticky top-0 z-50 border-b border-b-amber-50">
                Registro de ventas
            </header>
            <Sidebar className='h-[90dvh] sticky top-[7dvh] text-white font-medium text-[clamp(0.75rem,1vw,1rem)] [grid-area:sidebar]'/>
            <main className='[grid-area:main] bg-graywhite w-full px-5 sm:px-10 py-10 overflow-y-auto relative'>
                <div className='relative z-10'>
                    <Outlet />
                </div>
            </main>
            <div
                className="fixed top-[10dvh] left-[clamp(70px,10vw,90px)] right-0 bottom-0 bg-no-repeat bg-center 
                        opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url(${ottoLogo})`,
                    backgroundSize: 'calc(20vw + 20vh)'
                }}
            />
        </div>
    );
}