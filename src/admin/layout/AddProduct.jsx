import AdminButton from '../../shared/components/AdminButton.jsx';
import InputBasic from '../../shared/components/InputBasic.jsx';
import PrimaryButton from '../../shared/components/PrimaryButton.jsx';
import { useRef, useState } from 'react';

export default function AddProduct(){

    const FormRef = useRef(null);
    const ResetForm = ()=>{
        FormRef.current.reset();
        setFile(null);
    };


    const [file,setFile] = useState(null);
    const inputRef= useRef(null);
    const clickEvent =()=>{
        inputRef.current.click();
    };
    const files = (e) =>{
        const filechosen = e.target.files;
        setFile(filechosen);
    }

    return(
        <section className='mb-10'>
            <h1 className='font-bold text-3xl text-left mb-6 tracking-tighter text-gray-900'>Añadir producto</h1>
            <form ref={FormRef} className='flex flex-col gap-6 bg-gray-100 rounded-2xl px-30 p-8'>

                <div className='flex flex-col items-center justify-center w-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-yellow-500 transition-colors'>

                    {file && file[0] && (
                        <img 
                            className='w-40 h-40 object-cover rounded-lg mb-4 shadow-sm' 
                            src={ URL.createObjectURL(file[0])} 
                            alt={file[0].name} 
                        />
                    )}

                    <input 
                        type="file" 
                        ref={inputRef} 
                        onChange={files} 
                        className='hidden'
                    />
                    <PrimaryButton 
                        text={'Ingrese la imagen'} 
                        type={'button'}  
                        onClick={clickEvent}
                    />
                    
                </div>

                <section className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>

                    <div className='flex gap-2 flex-col'>
                        <label htmlFor="productName" className='text-sm font-medium text-gray-700 ml-1'>Nombre del producto</label>
                        <InputBasic
                            type={'text'}
                            placeholder={'Ingrese nombre del producto'} 
                            name={'productName'}
                            id={'productName'}
                        />                    
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <label htmlFor="cost" className='text-sm font-medium text-gray-700 ml-1'>precio del producto</label>
                        <InputBasic 
                            type={'number'}
                            placeholder={'ingrese el precio del producto'} 
                            name={'cost'}
                            id={'cost'}

                        />
                    </div>
                </section>

                <section className='flex justify-between w-full gap-5 items-center'>
                    <PrimaryButton 
                        type={'submit'} 
                        text={'Ingresar nuevo producto'}
                    />
                    <AdminButton 
                        type={'button'} 
                        text={'Eliminar'}
                        onClick={ResetForm}
                    />
                </section>
            </form>

        </section>


    )
}