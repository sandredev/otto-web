import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputBasic from "../../shared/components/InputBasic";
import PrimaryButton from "../../shared/components/PrimaryButton";
import { useLocation, useNavigate } from "react-router";

export default function EditSales() {

    const {state} = useLocation();
    const sale = state?.registro || {};

    const navigate = useNavigate();
    const handleVolver = () => {
        navigate(-1);
    };

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
                Editar Venta 
            </h1>

            <section className='flex items-center justify-center w-full'>

                <form onSubmit={''} className='flex flex-col gap-6 bg-white rounded-2xl p-4 sm:p-6 lg:p-8 max-w-2xl shadow-lg '>
                    
                    {/* Nombre y Precio */}
                    <section className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
                        <div className='flex gap-2 flex-col'>
                            <label htmlFor="nombre_cliente" className='text-sm font-medium text-gray-700'>
                                Nombre del cliente
                            </label>
                            <InputBasic
                                type={'text'}
                                placeholder={'Ej: Lucas Carvajal'} 
                                name={'nombre_cliente'}
                                id={'nombre_cliente'}
                                defaultValue={sale.cliente}
                            />                    
                        </div>

                    </section>

                    {/* Descripción */}
                    <div className='flex gap-2 flex-col'>

                        <div className='flex gap-2 flex-col'>
                            <label htmlFor="subtotal" className='text-sm font-medium text-gray-700'>
                                Subtotal
                            </label>
                            <InputBasic 
                                type={'number'}
                                placeholder={'Ej: 15000'} 
                                name={'subtotal'}
                                id={'subtotal'}
                                defaultValue={sale.subtotal}
                                step="0.01"
                                min="0"
                            />
                        </div>

                        <div className='flex gap-2 flex-col'>
                            <label htmlFor="descuento" className='text-sm font-medium text-gray-700'>
                                Descuento
                            </label>
                            <InputBasic
                                type={'number'}
                                placeholder={'descuento aplicado, en caso de tener'} 
                                name={'descuento'}
                                id={'descuento'}
                                defaultValue={sale.descuento}
                            />                    
                        </div>
                    
                        <div className='flex gap-2 flex-col'>
                            <label htmlFor="total" className='text-sm font-medium text-gray-700'>
                                Total
                            </label>
                            <InputBasic 
                                type={'number'}
                                placeholder={'Ej: 15000'} 
                                name={'total'}
                                id={'total'}
                                defaultValue={sale.total}
                                step="0.01"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Botones */}
                    <section className='flex flex-col sm:flex-row justify-between w-full gap-5 items-center'>
                        <PrimaryButton 
                            type={'submit'} 
                            text={'Actualizar producto'}
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

        </section>
    );
}