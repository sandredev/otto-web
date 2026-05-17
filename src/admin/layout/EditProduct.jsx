

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import PrimaryButton from '../../shared/components/PrimaryButton.jsx';
import InputBasic from '../../shared/components/InputBasic.jsx';
import Swal from 'sweetalert2';
import { updateProduct } from '../../lib/services/products.js';
import { uploadImageToCloudinary } from '../../lib/services/cloudinary/cloudinary.js';

export default function EditProduct({ product }) {
    const [file, setFile] = useState(null);
    const [productName, setProductName] = useState(product?.nombre_producto || '');
    const [price, setPrice] = useState(product?.precio_producto || '');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const clickEvent = () => {
        inputRef.current.click();
    };

    const handleFiles = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!productName || !price) {
                Swal.fire('Error', 'Por favor completa todos los campos', 'error');
                setLoading(false);
                return;
            }

            let imageUrl = product?.imagen_producto;

            // Si hay archivo, subirlo a Cloudinary
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

                const cloudinaryResult = await uploadImageCloudinary(formData);

                if (!cloudinaryResult.success) {
                    throw new Error(cloudinaryResult.error);
                }

                imageUrl = cloudinaryResult.imageUrl;
            }

            // Actualizar producto en BD
            const result = await updateProduct(product.id_producto, {
                nombre_producto: productName,
                precio_producto: parseFloat(price),
                imagen_producto: imageUrl
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
        navigate('/sales/admin');
    };

    return (
        <section className="mb-10 h-screen relative">
            
            <button 
                type='button'
                onClick={handleVolver}
                className="absolute top-6 left-6 text-white p-2 hover:opacity-80 transition-all"
            >
                <span className="inline-block transition-transform duration-300 hover:-translate-x-1">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </span>
            </button>

            <h1 className='font-bold text-3xl text-left mb-6 tracking-tighter text-gray-900'>
                Editar producto
            </h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-6 bg-gray-100 rounded-2xl px-30 p-8 max-w-4xl'>
                
                <section className='flex flex-col items-center justify-center w-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-yellow-500 transition-colors'>
                    {file ? (
                        <img 
                            src={URL.createObjectURL(file)}
                            alt="Preview" 
                            className='w-40 h-40 object-cover rounded-lg mb-4 shadow-sm'
                        />
                    ) : (
                        <img 
                            src={product?.imagen_producto || 'https://via.placeholder.com/160'} 
                            alt={product?.nombre_producto} 
                            className='w-40 h-40 object-cover rounded-lg mb-4 shadow-sm'
                        />
                    )}

                    <input 
                        type="file" 
                        ref={inputRef} 
                        onChange={handleFiles} 
                        accept="image/*"
                        className='hidden'
                    />

                    <PrimaryButton 
                        text={'Actualizar foto'} 
                        type={'button'} 
                        onClick={clickEvent}
                    />
                </section>

                <section className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                    <div className='flex gap-2 flex-col'>
                        <label htmlFor="productName" className='text-sm font-medium text-gray-700 ml-1'>
                            Nombre del producto
                        </label>
                        <InputBasic
                            type={'text'}
                            placeholder={'Ingrese nombre del producto'} 
                            name={'productName'}
                            id={'productName'}
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />                    
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <label htmlFor="price" className='text-sm font-medium text-gray-700 ml-1'>
                            Precio del producto
                        </label>
                        <InputBasic 
                            type={'number'}
                            placeholder={'Ingrese el precio del producto'} 
                            name={'price'}
                            id={'price'}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            step="0.01"
                        />
                    </div>
                </section>

                <section className='flex justify-between w-full gap-5 items-center'>
                    <PrimaryButton 
                        type={'submit'} 
                        text={loading ? 'Actualizando...' : 'Actualizar producto'}
                        disabled={loading}
                    />
                </section>
            </form>
        </section>
    );
}