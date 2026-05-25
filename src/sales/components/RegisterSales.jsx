import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import ProductCard from './ProductCard';
import { getAvailableProducts} from '../../lib/services/products.js';
import Swal from 'sweetalert2';

export default function RegisterSales({ isAdmin = false }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const { agregarAlCarrito, carrito = [] } = useOutletContext();

    useEffect(() => {
        const cargarProductos = async () => {
            setLoading(true);
            const result = await getAvailableProducts();

            if (result.success) {
                const productosFormateados = result.data.map(producto => ({
                    id: producto.id_producto,
                    name: producto.nombre_producto,
                    img: producto.imagen_producto,
                    precio: producto.precio,
                    descripcion: producto.descripcion,
                    ingredientes: producto.ingredientes,
                    categoria: producto.categorias?.nombre_categoria
                }));
                setProducts(productosFormateados);
            } else {
                Swal.fire('Error', result.error, 'error');
            }
            setLoading(false);
        };

        cargarProductos();
    }, []);

    const filteredProducts = products
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (a.categoria === 'Sándwiches' && b.categoria !== 'Sándwiches') return -1;
            if (a.categoria !== 'Sándwiches' && b.categoria === 'Sándwiches') return 1;
            return 0;
        });

    if (loading) {
        return (
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className='rounded-2xl bg-white overflow-hidden animate-pulse'>
                        <div className='w-full aspect-4/3 bg-gray-200' />
                        <div className='p-4 space-y-3'>
                            <div className='h-3 bg-gray-200 rounded w-3/4 mx-auto' />
                            <div className='h-3 bg-gray-200 rounded w-1/2 mx-auto' />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!loading && products.length === 0) {
        return (
            <div className='flex items-center justify-center min-h-[50vh]'>
                <div className='bg-white rounded-lg shadow-lg p-8 text-center'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-4'>No hay productos</h2>
                    <p className='text-gray-600'>No se han registrado productos en la BD</p>
                </div>
            </div>
        );
    }

    return (
        <div className='space-y-4'>
            <div className='relative'>
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Buscar producto...'
                    className='w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-shadow'
                />
                <svg className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
            </div>

            {filteredProducts.length === 0 ? (
                <div className='text-center py-12 text-gray-500'>
                    No se encontraron productos para &quot;{search}&quot;
                </div>
            ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => agregarAlCarrito(product)}
                            className='w-full h-full bg-none border-none p-0 cursor-pointer'
                        >
                            <ProductCard
                                product={product}
                                isAdmin={isAdmin}
                                quantityInCart={carrito.find(item => item.id === product.id)?.cantidad || 0}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
