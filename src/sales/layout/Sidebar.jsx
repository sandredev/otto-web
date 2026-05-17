import { NavLink } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faMoneyBill, faBoxOpen, faRightFromBracket, faCog } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../lib/hooks/useAuth.js';

export default function Sidebar({ className }) {
    const { userData } = useAuth();
    const isAdmin = userData?.id_rol === 1;

    return (
        <nav className={`flex flex-col bg-yellow-otto items-center justify-start gap-y-[3vh] border-r py-[4vh] z-50 ${className}`}>

            <NavLink to='/sales/' end className={({isActive}) => `flex flex-col items-center w-full py-2 gap-y-3 ${isActive ? 'border-l-4 sm:border-l-6 border-l-graywhite' : ''} hover:bg-white/40 transition-all`}>
                <FontAwesomeIcon icon={faBookmark} className='text-2xl sm:text-3xl lg:text-4xl'/>
                Registrar
            </NavLink>

            <NavLink to='/sales/money' className={({isActive}) => `flex flex-col items-center w-full py-2 gap-y-3 ${isActive ? 'border-l-6 border-l-graywhite' : ''} hover:bg-white/40 transition-all`}>
                <FontAwesomeIcon icon={faMoneyBill} className='text-2xl sm:text-3xl lg:text-4xl'/>
                Dinero
            </NavLink>

            <NavLink to='/sales/history' className={({isActive}) => `flex flex-col items-center w-full py-2 gap-y-3 ${isActive ? 'border-l-6 border-l-graywhite' : ''} hover:bg-white/40 transition-all`}>
                <FontAwesomeIcon icon={faBoxOpen} className='text-2xl sm:text-3xl lg:text-4xl'/>
                Historial
            </NavLink>

            {/* ✅ Solo muestra si es admin */}
            {isAdmin && (
                <NavLink to='/sales/admin' className={({isActive}) => `flex flex-col items-center w-full py-2 gap-y-3 ${isActive ? 'border-l-6 border-l-graywhite' : ''} hover:bg-white/40 transition-all`}>
                    <FontAwesomeIcon icon={faCog} className='text-2xl sm:text-3xl lg:text-4xl'/>
                    Admin
                </NavLink>
            )}

            <NavLink to='/home' className={({isActive}) => `flex flex-col items-center w-full py-2 gap-y-3 ${isActive ? 'border-l-6 border-l-graywhite' : ''} hover:bg-white/40 transition-all mt-auto`}>
                <FontAwesomeIcon icon={faRightFromBracket} className='text-2xl sm:text-3xl lg:text-4xl'/>
                Salir
            </NavLink>
        </nav>
    );
}