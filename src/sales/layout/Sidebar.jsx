import { NavLink } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faMoneyBill, faBoxOpen, faRightFromBracket, faCog } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../lib/hooks/useAuth.js';

export default function Sidebar({ className, size = 'md', activeBorder = 'left' }) {
    const { userData } = useAuth();
    const isAdmin = userData?.id_rol === 1;
    const isRow = size === 'sm';

    const iconClass = size === 'xs' ? 'text-base'
        : size === 'sm' ? 'text-lg'
        : 'text-2xl sm:text-3xl lg:text-4xl';

    const textClass = size === 'xs' ? 'text-[0.6rem] leading-tight text-center'
        : size === 'sm' ? 'text-sm'
        : 'text-center';

    const hasMTAuto = size !== 'xs';

    const activeBorderClass = activeBorder === 'bottom'
        ? 'border-b-4 border-b-graywhite border-l-0'
        : `border-l-4 ${size === 'md' ? 'sm:border-l-6' : ''} border-l-graywhite`;

    const linkClass = ({ isActive }) =>
        `flex items-center ${isRow ? 'flex-row gap-x-3 w-full px-4 py-2' : 'flex-col gap-y-3 w-full py-2'}
        ${isActive ? activeBorderClass + ' bg-white/10' : 'hover:bg-white/40'}
        transition-all`;

    return (
        <nav className={`flex flex-col bg-yellow-otto text-white items-center justify-start z-50 ${className}`}>

            <NavLink to='/sales/' end className={linkClass}>
                <FontAwesomeIcon icon={faBookmark} className={`${iconClass} ${isRow ? 'w-5 text-center' : ''}`} />
                <span className={textClass}>Registrar</span>
            </NavLink>

            <NavLink to='/sales/money' className={linkClass}>
                <FontAwesomeIcon icon={faMoneyBill} className={`${iconClass} ${isRow ? 'w-5 text-center' : ''}`} />
                <span className={textClass}>Dinero</span>
            </NavLink>

            <NavLink to='/sales/history' className={linkClass}>
                <FontAwesomeIcon icon={faBoxOpen} className={`${iconClass} ${isRow ? 'w-5 text-center' : ''}`} />
                <span className={textClass}>Historial</span>
            </NavLink>

            {isAdmin && (
                <NavLink to='/sales/admin' className={linkClass}>
                    <FontAwesomeIcon icon={faCog} className={`${iconClass} ${isRow ? 'w-5 text-center' : ''}`} />
                    <span className={textClass}>Admin</span>
                </NavLink>
            )}

            <NavLink to='/home' className={`${linkClass({ isActive: false })} ${hasMTAuto ? 'mt-auto' : ''}`}>
                <FontAwesomeIcon icon={faRightFromBracket} className={`${iconClass} ${isRow ? 'w-5 text-center' : ''}`} />
                <span className={textClass}>Salir</span>
            </NavLink>
        </nav>
    );
}
