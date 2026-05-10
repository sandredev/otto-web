import { useRef, useState } from "react";
import InputBasic from "../../shared/components/InputBasic";
import PrimaryButton from "../../shared/components/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function EditProduct({product}){
    const [file,setFile] = useState(null);
    const inputRefr = useRef(null);

    const clickEvent=()=>{
        inputRefr.current.click();
    }

    const handleFiles=(e)=>{
        const selectedFiles = e.target.files[0];
        setFile(selectedFiles);
    }
    return(
        <section className="mb-10 h-screen relative">
            
            <button className="absolute top-6 left-6 text-white p-2">
                <span className="inline-block transition-transform duration-300 hover:-translate-x-1">
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </span>
            </button>

            <h1 className='font-bold text-3xl text-left mb-6 tracking-tighter text-gray-900'>Editar producto</h1>
            <form className='flex flex-col gap-6 bg-gray-100 rounded-2xl px-30 p-8'>
                <section className='flex flex-col items-center justify-center w-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-yellow-500 transition-colors'>
                    {file && (
                        <img 
                            src={file?URL.createObjectURL(file):product.img} 
                            alt={file.name} 
                            className='w-40 h-40 object-cover rounded-lg mb-4 shadow-sm'
                        />
                    )}

                    <input 
                        type="file" 
                        ref={inputRefr} 
                        onChange={handleFiles} 
                        className='hidden'
                    />

                    <PrimaryButton t
                        ext={'Actualizar foto'} 
                        type={'button'} 
                        onClick={clickEvent}
                    />
                </section>

                <section className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>

                    <div className='flex gap-2 flex-col'>

                        <label htmlFor="productName" className='text-sm font-medium text-gray-700 ml-1'>Nombre del producto</label>
                        <InputBasic
                            type={'text'}
                            placeholder={'Ingrese nombre del producto'} 
                            name={'productName'}
                            id={'productName'}
                            defaultValue={product.name}
                        />                    
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <label htmlFor="cost" className='text-sm font-medium text-gray-700 ml-1'>precio del producto</label>
                        <InputBasic 
                            type={'number'}
                            placeholder={'ingrese el precio del producto'} 
                            name={'cost'}
                            id={'cost'}
                            defaultValue={product.cost}

                        />
                    </div>
                </section>

                <section className='flex justify-between w-full gap-5 items-center'>
                    <PrimaryButton 
                        type={'submit'} 
                        text={'Actualizar producto'}
                    />
                </section>

            </form>
        </section>
    )
}