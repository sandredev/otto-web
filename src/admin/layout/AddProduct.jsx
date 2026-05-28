import AdminButton from '../../shared/components/AdminButton.jsx';
import InputBasic from '../../shared/components/InputBasic.jsx';
import PrimaryButton from '../../shared/components/PrimaryButton.jsx';
import { useRef, useState, useEffect } from 'react';
import { uploadImageToCloudinary, validateImage } from '../../lib/services/cloudinary/cloudinary.js';
import { createProduct } from '../../lib/services/products.js';
import {getAllCategories} from '../../lib/services/categories.js';
import alertPop from '@/utils/alertPop.js';

export default function AddProduct(){
    const FormRef = useRef(null);
    const inputRef = useRef(null);
    
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categorias, setCategorias] = useState([]);
    
    const [formData, setFormData] = useState({
        nombre_producto: '',
        descripcion: '',
        precio: '',
        id_categoria: '',
        ingredientes: '',
        disponible: true
    });

    // Cargar categorías al montar
  useEffect(() => {
    const cargarCategorias = async () => {
        console.log("1. Iniciando carga de categorías");
        try {
            const result = await getAllCategories(false);
            console.log("2. Resultado de getAllCategories:", result);
            
            if (result.success) {
                console.log("3. Categorías cargadas:", result.data);
                setCategorias(result.data);
            } else {
                console.log("3. Error en resultado:", result.error);
                await alertPop('ERROR', 'No se pudieron cargar las categorías', 'error', 'Continuar');
            }
        } catch (error) {
            console.log("4. Error en try-catch:", error);
        }
    };
    cargarCategorias();
}, []);

    const ResetForm = () => {
        FormRef.current.reset();
        setFile(null);
        setFormData({
            nombre_producto: '',
            descripcion: '',
            precio: '',
            id_categoria: '',
            ingredientes: '',
            disponible: true
        });
    };

    const clickEvent = () => {
        inputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const filechosen = e.target.files[0];
        
        // Validar imagen
        const validation = validateImage(filechosen);
        if (!validation.success) {
            await alertPop(
                'ERROR', 
                validation.error, 
                'error', 
                'Continuar'
            );
            return;
        }
        
        setFile(filechosen);
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
           console.log("FormData completo:", formData);
    console.log("nombre_producto:", formData.nombre_producto, "vacío?", !formData.nombre_producto);
    console.log("precio:", formData.precio, "vacío?", !formData.precio);
    console.log("id_categoria:", formData.id_categoria, "vacío?", !formData.id_categoria);
        
            console.log("FormData antes de validar:", formData);
        if (!formData.nombre_producto) {
            await alertPop('ERROR', 'El nombre del producto es requerido', 'error', 'Continuar');
            return;
        }
        
        if (!formData.precio) {
            await alertPop('ERROR', 'El precio es requerido', 'error', 'Continuar');
            return;
        }
        
        if (!formData.id_categoria) {
            await alertPop('ERROR', 'Selecciona una categoría', 'error', 'Continuar');
            return;
        }
        
        if (!file) {
            await alertPop('ERROR', 'Carga una imagen del producto', 'error', 'Continuar');
            return;
        }

        setLoading(true);

        // 1. Subir imagen a Cloudinary
        const uploadResult = await uploadImageToCloudinary(file);
        
        if (!uploadResult.success) {
            await alertPop('ERROR', 'Error al subir la imagen: ' + uploadResult.error, 'error', 'Continuar');
            setLoading(false);
            return;
        }

        // 2. Crear producto con URL de Cloudinary
        const datosProducto = {
            nombre_producto: formData.nombre_producto,
            descripcion: formData.descripcion || null,
            precio: parseFloat(formData.precio),
            imagen_producto: uploadResult.url,
            id_categoria: parseInt(formData.id_categoria),
            ingredientes: formData.ingredientes || null,
            disponible: formData.disponible
        };

        const createResult = await createProduct(datosProducto);
        setLoading(false);

        if (createResult.success) {
            await alertPop('ÉXITO', 'Producto creado exitosamente', 'success', 'Continuar');
            ResetForm();
        } else {
            await alertPop('ERROR', createResult.error, 'error', 'Continuar');
        }
    };

    return(
        <section className='mb-10'>
            <h1 className='font-bold text-lg sm:text-xl lg:text-2xl text-left mb-6 tracking-tighter text-gray-900'>Añadir producto</h1>
            <form ref={FormRef} onSubmit={handleSubmit} className='flex flex-col gap-6 bg-gray-100 rounded-2xl px-4 sm:px-8 lg:px-12 xl:px-30 p-6 sm:p-8'>

                {/* Imagen */}
                <div className='flex flex-col items-center justify-center w-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-yellow-500 transition-colors'>
                    {file && (
                        <img 
                            className='w-40 h-40 object-cover rounded-lg mb-4 shadow-sm' 
                            src={URL.createObjectURL(file)} 
                            alt={file.name} 
                        />
                    )}
                    <input 
                        type="file" 
                        ref={inputRef} 
                        onChange={handleFileChange} 
                        className='hidden'
                        accept="image/jpeg,image/png,image/gif"
                    />
                    <PrimaryButton 
                        text={file ? 'Cambiar imagen' : 'Ingrese la imagen'} 
                        type={'button'}  
                        onClick={clickEvent}
                    />
                </div>

                {/* Nombre y Precio */}
                <section className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                    <div className='flex gap-2 flex-col'>
                        <label htmlFor="nombre_producto" className='text-sm font-medium text-gray-700 ml-1'>
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
                        <label htmlFor="precio" className='text-sm font-medium text-gray-700 ml-1'>
                            Precio del producto
                        </label>
                        <InputBasic 
                            type={'number'}
                            placeholder={'Ej: 15000'} 
                            name={'precio'}
                            id={'precio'}
                            value={formData.precio}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                        />
                    </div>
                </section>

                {/* Categoría y Descripción */}
                <section className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                    <div className='flex gap-2 flex-col'>
                        <label htmlFor="id_categoria" className='text-sm font-medium text-gray-700 ml-1'>
                            Categoría
                        </label>
                        <select
                            name="id_categoria"
                            id="id_categoria"
                            value={formData.id_categoria}
                            onChange={handleInputChange}
                            className='cursor-pointer border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500'
                        >
                            <option value="">Selecciona una categoría</option>
                            {categorias.map(cat => (
                                <option key={cat.id_categoria} value={cat.id_categoria}>
                                    {cat.nombre_categoria}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <label htmlFor="descripcion" className='text-sm font-medium text-gray-700 ml-1'>
                            Descripción
                        </label>
                        <InputBasic
                            type={'text'}
                            placeholder={'Ej: Con pollo jugoso y verduras frescas'} 
                            name={'descripcion'}
                            id={'descripcion'}
                            value={formData.descripcion}
                            onChange={handleInputChange}
                        />
                    </div>
                </section>

                {/* Ingredientes */}
                <div className='flex gap-2 flex-col'>
                    <label htmlFor="ingredientes" className='text-sm font-medium text-gray-700 ml-1'>
                        Ingredientes
                    </label>
                    <textarea
                        name="ingredientes"
                        id="ingredientes"
                        placeholder={'Ej: Pan, pollo, lechuga, tomate, mayonesa'}
                        value={formData.ingredientes}
                        onChange={handleInputChange}
                        className='border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none h-20'
                    />
                </div>

                {/* Botones */}
                <section className='flex flex-col sm:flex-row w-full gap-3 sm:gap-5 items-stretch sm:items-center'>
                    <PrimaryButton 
                        type={'submit'} 
                        text={loading ? 'Guardando...' : 'Ingresar nuevo producto'}
                        disabled={loading}
                    />
                    <AdminButton 
                        type={'button'} 
                        text={'Limpiar'}
                        onClick={ResetForm}
                    />
                </section>
            </form>
        </section>
    )
}