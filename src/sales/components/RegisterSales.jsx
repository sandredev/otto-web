import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import ProductCard from './ProductCard';
import { getAvailableProducts} from '../../lib/services/products.js';
import Swal from 'sweetalert2';

export default function RegisterSales({ isAdmin = false }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { agregarAlCarrito } = useOutletContext();

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
                    ingredientes: producto.ingredientes
                }));
                setProducts(productosFormateados);
            } else {
                Swal.fire('Error', result.error, 'error');
            }
            setLoading(false);
        };

        cargarProductos();
    }, []);

    if (loading) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <p className='text-xl text-gray-600'>Cargando productos...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='bg-white rounded-lg shadow-lg p-8 text-center'>
                    <h2 className='text-2xl font-bold text-gray-800 mb-4'>No hay productos</h2>
                    <p className='text-gray-600'>No se han registrado productos en la BD</p>
                </div>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(clamp(100px,20vw,300px),1fr))] gap-4 sm:gap-6 md:gap-8 lg:gap-10'>
            {products.map((product) => (
                <div
                    key={product.id}
                    onClick={() => agregarAlCarrito(product)}
                    className='w-full h-full bg-none border-none p-0 cursor-pointer hover:scale-105 transition-transform'
                >
                    <ProductCard 
                        product={product} 
                        isAdmin={isAdmin}
                    />
                </div>
            ))}
        </div>
    );
}