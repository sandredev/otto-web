import { NavLink, Outlet, useOutletContext } from 'react-router';
import ottoLogo from '@/assets/otto-logo.png';
import Sidebar from './Sidebar';
import { useState } from 'react';
import ShoppingCart from '../components/ShoppingCart.jsx';

export default function SalesLayout() {
    const [carrito, setCarrito] = useState([]);

    // Agregar producto al carrito
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

    // Aumentar cantidad
    const aumentarCantidad = (id) => {
        setCarrito(carrito.map(item =>
            item.id === id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        ));
    };

    // Disminuir cantidad
    const disminuirCantidad = (id) => {
        setCarrito(carrito.map(item =>
            item.id === id && item.cantidad > 1
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
        ).filter(item => item.cantidad > 0));
    };

    // Eliminar del carrito
    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter(item => item.id !== id));
    };

    const limpiarCarrito = () => {
    setCarrito([]);
};

    return (
        <div className="grid [grid-template-areas:'header_header'_'sidebar_main'] grid-cols-[clamp(70px,10vw,90px)_1fr] grid-rows-[10dvh_90dvh] ">
            <header className="[grid-area:header] bg-yellow-otto-light flex items-center justify-center h-[10dvh] 
                            text-[clamp(1.2rem,3vw,1.8rem)] text-shadow-md font-bold text-white sticky top-0 z-50 border-b border-b-amber-50">
                Registro de ventas
            </header>

            <Sidebar className='h-[90dvh] sticky top-[7dvh] text-white font-medium text-[clamp(0.75rem,1vw,1rem)] [grid-area:sidebar]'/>

            <main className='[grid-area:main] bg-graywhite w-full px-5 sm:px-10 py-10 overflow-y-auto relative'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10'>
                    
                    {/* Sección de productos (2/3 del ancho) */}
                    <div className='lg:col-span-2'>
                        <Outlet context={{ agregarAlCarrito }} />
                    </div>

                    {/* Carrito/Factura (1/3 del ancho) */}
                    <div className='lg:col-span-1'>
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