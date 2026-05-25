import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PrimaryButton from '@/shared/components/PrimaryButton.jsx';
import InputBasic from '@/shared/components/InputBasic.jsx';
import Swal from 'sweetalert2';
import { updateProduct, getProductById } from '../../lib/services/products.js';
import { uploadImageToCloudinary, validateImage } from '../../lib/services/cloudinary/cloudinary.js';

export default function EditProduct() {
    const { productId } = useParams();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [producto, setProducto] = useState(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre_producto: '',
        precio: '',
        descripcion: ''
    });

    // Cargar producto al montar
    useEffect(() => {
        const cargarProducto = async () => {
            const result = await getProductById(productId);
            if (result.success) {
                setProducto(result.data);
                setFormData({
                    nombre_producto: result.data.nombre_producto,
                    precio: result.data.precio,
                    descripcion: result.data.descripcion || ''
                });
            } else {
                Swal.fire('Error', result.error, 'error');
                navigate('/sales/admin');
            }
            setLoading(false);
        };
        cargarProducto();
    }, [productId, navigate]);

    const clickEvent = () => {
        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const validation = validateImage(selectedFile);
            if (!validation.success) {
                Swal.fire('Error', validation.error, 'error');
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!formData.nombre_producto || !formData.precio) {
                Swal.fire('Error', 'Nombre y precio son requeridos', 'error');
                setLoading(false);
                return;
            }

            let imagenUrl = producto?.imagen_producto;

            // Si hay archivo nuevo, subirlo a Cloudinary
            if (file) {
                const uploadResult = await uploadImageToCloudinary(file);
                if (!uploadResult.success) {
                    throw new Error(uploadResult.error);
                }
                imagenUrl = uploadResult.url;
            }

            // Actualizar producto en BD
            const result = await updateProduct(producto.id_producto, {
                nombre_producto: formData.nombre_producto,
                precio: parseFloat(formData.precio),
                descripcion: formData.descripcion,
                imagen_producto: imagenUrl
            });

            if (result.success) {
                Swal.fire('Éxito', 'Producto actualizado correctamente', 'success');
                navigate('/sales/admin');
            } else {
                Swal.fire('Error', result.error, 'error');
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            Swal.fire('Error', error.message || 'Error al actualizar el producto', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleVolver = () => {
        navigate(-1);
    };

    if (loading) {
        return <div className='text-center py-10'>Cargando producto...</div>;
    }

    if (!producto) {
        return <div className='text-center py-10'>Producto no encontrado</div>;
    }

    return (
        <section className="mb-10 min-h-screen p-4 sm:p-8">
            <button 
                type='button'
                onClick={handleVolver}
                className="cursor-pointer mb-6 text-gray-700 p-2 hover:text-gray-900 transition-all inline-flex items-center gap-2"
            >
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                <span>Volver</span>
            </button>

            <h1 className='font-bold text-xl sm:text-2xl lg:text-3xl text-left mb-6 tracking-tighter text-gray-900'>
                Editar producto
            </h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-6 bg-white rounded-2xl p-4 sm:p-6 lg:p-8 max-w-2xl shadow-lg'>
                
                {/* Imagen */}
                <section className='flex flex-col items-center justify-center w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-yellow-500 transition-colors'>
                    {file ? (
                        <img 
                            src={URL.createObjectURL(file)}
                            alt="Preview" 
                            className='w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-lg mb-4 shadow-sm'
                        />
                    ) : (
                        <img 
                            src={producto?.imagen_producto || 'https://via.placeholder.com/160'} 
                            alt={producto?.nombre_producto} 
                            className='w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-lg mb-4 shadow-sm'
                        />
                    )}

                    <input 
                        type="file" 
                        ref={inputRef} 
                        onChange={handleFileChange} 
                        accept="image/jpeg,image/png,image/gif"
                        className='hidden'
                    />

                    <PrimaryButton 
                        text={file ? 'Cambiar foto' : 'Actualizar foto'} 
                        type={'button'} 
                        onClick={clickEvent}
                    />
                </section>

                {/* Nombre y Precio */}
                <section className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                    <div className='flex gap-2 flex-col'>
                        <label htmlFor="nombre_producto" className='text-sm font-medium text-gray-700'>
                            Nombre del producto
                        </label>
                        <InputBasic
                            type={'text'}
                            placeholder={'Ej: Sándwich de Pollo'} 
                            name={'nombre_producto'}
                            id={'nombre_producto'}
                            value={formData.nombre_producto}
                            onChange={handleInputChange}
                        />                    
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <label htmlFor="precio" className='text-sm font-medium text-gray-700'>
                            Precio del producto
                        </label>
                        <InputBasic 
                            type={'number'}
                            placeholder={'Ej: 15000'} 
                            name={'precio'}
                            id={'precio'}
                            value={formData.precio}
                            onChange={handleInputChange}
                            step="0.01"
                            min="0"
                        />
                    </div>
                </section>

                {/* Descripción */}
                <div className='flex gap-2 flex-col'>
                    <label htmlFor="descripcion" className='text-sm font-medium text-gray-700'>
                        Descripción (opcional)
                    </label>
                    <textarea
                        name="descripcion"
                        id="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        placeholder='Descripción del producto'
                        className='border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none h-20'
                    />
                </div>

                {/* Botones */}
                <section className='flex flex-col sm:flex-row justify-between w-full gap-5 items-center'>
                    <PrimaryButton 
                        type={'submit'} 
                        text={loading ? 'Guardando...' : 'Actualizar producto'}
                        disabled={loading}
                    />
                    <button
                        type='button'
                        onClick={handleVolver}
                        className='cursor-pointer w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium'
                    >
                        Cancelar
                    </button>
                </section>
            </form>
        </section>
    );
}