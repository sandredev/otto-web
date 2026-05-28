import { useEffect, useState } from 'react';
import ProductListCard from './ProductListCard';
import { getProducts } from '../../lib/services/products.js';
import { deactivateProduct } from '../../lib/services/products.js';
import alertPop from '@/utils/alertPop.js';
import alertDesicion from '@/utils/alertDesicion.js';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Cargar productos al iniciar
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const result = await getProducts();
            if (result.success) {
                setProducts(result.data);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id, name) => {
        const result = await alertDesicion(
            '¿DESEA ELIMINAR ESTE PRODUCTO?', 
            name, 
            'question', 
            'Eliminar', 
            'Cancelar'
        );

        if (result.isConfirmed) {
            const deleteResult = await deactivateProduct(id);
            
            if (deleteResult.success) {
                await alertPop(
                    'PRODUCTO DESACTIVADO', 
                    'Producto desactivado correctamente', 
                    'success', 
                    'Continuar'
                );
                // Actualizar lista
                setProducts(products.filter(p => p.id_producto !== id));
            } else {
                await alertPop(
                    'ERROR AL DESACTIVAR', 
                    deleteResult.error, 
                    'error', 
                    'Continuar'
                );
            }
        }
    };

    if (loading) {
        return <div className='text-center py-10'>Cargando productos...</div>;
    }

    return (
        <section className='bg-gray-100 rounded-3xl w-full flex flex-col justify-center'>

            <ul className='list-none list-outside'>
                {products.map((product) => (
                    <li key={product.id_producto} className='m-0 p-0'>
                        <ProductListCard 
                            id={product.id_producto}
                            name={product.nombre_producto}
                            img={product.imagen_producto}
                            onDelete={() => handleDelete(product.id_producto, product.nombre_producto)}
                        />
                    </li>
                ))}
            </ul>
            
        </section>
    );
}