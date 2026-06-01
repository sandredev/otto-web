import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router';
import ProductManagement from './layout/ProductManagement.jsx';
import AddProduct from './layout/AddProduct.jsx';
import { Link } from 'react-router';
import PrimaryButton from '../shared/components/PrimaryButton.jsx';
import { getProducts } from '../lib/services/products.js';
import alertPop from '@/utils/alertPop.js';

export default function AdminView(){
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setLoading(true);
        const result = await getProducts(true); // true = incluir inactivos
        
        if (result.success) {
            // Mapear datos al formato esperado
            const productosFormateados = result.data.map(prod => ({
                id_producto: prod.id_producto,
                nombre_producto: prod.nombre_producto,
                precio: prod.precio,
                imagen_producto: prod.imagen_producto,
                estado: prod.estado
            }));
            setProductos(productosFormateados);
        } else {
            await alertPop(
                'ERROR AL CARGAR PRODUCTOS', 
                result.error, 
                'error', 
                'Continuar');
        }
        setLoading(false);
    };

   const handleEditarProducto = (id) => {
    navigate(`/editProduct/${id}`);
};

    if (loading) {
        return <div className='text-center py-10'>Cargando productos...</div>;
    }

    return(
        <section className='w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>

            <div className="font-black text-xl sm:text-2xl lg:text-3xl text-black text-left tracking-tighter mb-6 sm:mb-8">
                <h1>Manejo de la plataforma</h1>                    
            </div>

            <div className='flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 w-full my-6 sm:my-8'>
                <Link to={'/sales/history'}>
                    <PrimaryButton type={'button'} text={'Ventas del día'}/>
                </Link>
                
                <Link to={'/generalHistory'}>
                    <PrimaryButton type={'button'} text={'Historial de ventas'}/>
                </Link>
            </div>

            <div className='flex flex-col gap-12'>
                <AddProduct onProductoAgregado={cargarProductos} />
                <ProductManagement 
                    products={productos}
                    onEditarProducto={handleEditarProducto}
                    onProductosActualizados={cargarProductos}
                />
            </div>
        </section>
    )
}
