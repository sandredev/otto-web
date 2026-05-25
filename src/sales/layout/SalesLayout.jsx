import { Outlet } from 'react-router';
import ottoLogo from '@/assets/otto-logo.png';
import Sidebar from './Sidebar';
import { useState } from 'react';
import ShoppingCart from '../components/ShoppingCart.jsx';
import CartDrawer from '../components/CartDrawer.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function SalesLayout() {
    const [carrito, setCarrito] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    const agregarAlCarrito = (producto) => {
        const existe = carrito.find(item => item.id === producto.id);

        if (existe) {
            setCarrito(carrito.map(item =>
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            ));
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    const aumentarCantidad = (id) => {
        setCarrito(carrito.map(item =>
            item.id === id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        ));
    };

    const disminuirCantidad = (id) => {
        setCarrito(carrito.map(item =>
            item.id === id && item.cantidad > 1
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
        ).filter(item => item.cantidad > 0));
    };

    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter(item => item.id !== id));
    };

    const limpiarCarrito = () => {
        setCarrito([]);
        setShowCart(false);
    };

    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    return (
        <div className="grid [grid-template-areas:'header_header'_'sidebar_main']
                        grid-cols-[clamp(70px,10vw,90px)_1fr]
                        grid-rows-[10dvh_90dvh]
                        max-lg:[grid-template-areas:'header'_'main']
                        max-lg:grid-cols-1
                        max-lg:grid-rows-[10dvh_1fr]
                        min-h-dvh">
            <header className="[grid-area:header] bg-yellow-otto-light flex items-center justify-center h-[10dvh] max-lg:landscape:h-14
                            text-[clamp(1.2rem,3vw,1.8rem)] text-shadow-md font-bold text-white sticky top-0 z-50 border-b border-b-amber-50 relative">
                <button
                    onClick={() => setShowMobileSidebar(true)}
                    className="cursor-pointer lg:hidden absolute left-4 top-1/2 -translate-y-1/2 text-white hover:brightness-90 transition-all p-1"
                    aria-label="Abrir menú"
                >
                    <FontAwesomeIcon icon={faBars} className="text-xl" />
                </button>

                <span>Registro de ventas</span>

                <button
                    onClick={() => setShowCart(true)}
                    className="cursor-pointer lg:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white hover:brightness-90 transition-all p-1"
                    aria-label="Abrir carrito"
                >
                    <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[0.6rem] font-bold rounded-full min-w-[1.1rem] h-[1.1rem] flex items-center justify-center shadow-md">
                            {totalItems}
                        </span>
                    )}
                </button>
            </header>

            <Sidebar className='max-lg:hidden h-[90dvh] sticky top-[7dvh] font-medium text-[clamp(0.75rem,1vw,1rem)] gap-y-[3vh] py-[4vh] border-r [grid-area:sidebar]' />

            <main className='[grid-area:main] bg-graywhite w-full px-5 sm:px-10 py-10 overflow-y-auto relative'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10'>
                    <div className='lg:col-span-2'>
                        <Outlet context={{ agregarAlCarrito, carrito }} />
                    </div>
                    <div className='hidden lg:block lg:col-span-1'>
                        <ShoppingCart
                            carrito={carrito}
                            onAumentar={aumentarCantidad}
                            onDisminuir={disminuirCantidad}
                            onEliminar={eliminarDelCarrito}
                            onRegistroExitoso={limpiarCarrito}
                        />
                    </div>
                </div>
            </main>

            {showMobileSidebar && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setShowMobileSidebar(false)}
                    />
                    <div className="absolute left-0 top-0 bottom-0 min-w-[180px] w-[60vw] max-w-[240px] bg-yellow-otto animate-slide-left shadow-xl flex flex-col overflow-y-auto">
                        <div className="flex justify-end p-4 max-lg:landscape:p-2 pb-0 sticky top-0 bg-yellow-otto z-10">
                            <button
                                onClick={() => setShowMobileSidebar(false)}
                                className="cursor-pointer text-white/80 hover:text-white p-1 transition-colors"
                                aria-label="Cerrar menú"
                            >
                                <FontAwesomeIcon icon={faXmark} className="text-2xl" />
                            </button>
                        </div>
                        <Sidebar size="sm" className='flex-1 border-r-0 gap-y-5 max-lg:landscape:gap-y-2 py-5 max-lg:landscape:py-3 px-3' />
                    </div>
                </div>
            )}

            {totalItems > 0 && (
                <button
                    onClick={() => setShowCart(true)}
                    className="cursor-pointer lg:hidden fixed bottom-6 right-6 z-[60] bg-yellow-otto text-white p-4 rounded-full shadow-lg hover:brightness-95 transition-all active:scale-90"
                    aria-label="Abrir carrito"
                >
                    <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[1.5rem] h-6 flex items-center justify-center shadow-md">
                        {totalItems}
                    </span>
                </button>
            )}

            <CartDrawer show={showCart} onClose={() => setShowCart(false)}>
                <ShoppingCart
                    carrito={carrito}
                    onAumentar={aumentarCantidad}
                    onDisminuir={disminuirCantidad}
                    onEliminar={eliminarDelCarrito}
                    onRegistroExitoso={limpiarCarrito}
                />
            </CartDrawer>

            <div
                className="fixed top-[10dvh] left-[clamp(70px,10vw,90px)] max-lg:left-0 right-0 bottom-0 bg-no-repeat bg-center
                        opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url(${ottoLogo})`,
                    backgroundSize: 'calc(20vw + 20vh)'
                }}
            />
        </div>
    );
}
