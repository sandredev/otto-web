import { Link } from "react-router";
import AdminButton from "../../shared/components/AdminButton";
import alertDesicion from "../../utils/alertDesicion";
import alertPop from "../../utils/alertPop";

export default function ProductListCard({id, name, img}){
    
    

    const handleDelete = async () =>{
        const result = await alertDesicion(
            '¿DESEA DESACTIVAR ESTE PRODUCTO?',
            'Presione confirmar para completar proceso',
            'info',
            'Eliminar',
            'Cancelar'
        )
        if(result.isConfirmed){
            try {
                await alertPop(
                    'PRODUCTO ELIMINADO CON EXITO', 
                    'Proceso realizado con exito', 
                    'success', 
                    'Continuar'
                )
            } catch (error) {
                await alertPop(
                    'NO SE PUDO ELIMINAR EL PRODUCTO', 
                    'No se pudo terminar el proceso', 
                    'error', 
                    'Continuar'
                )
            }
        }

    }

    return(
        <section className="flex flex-row items-center justify-between py-5 px-6 w-full border-b border-gray-200 last:border-none">

            <div className="flex flex-row items-center gap-4 text-xl text-gray-800 font-semibold">
                <img  className='aspect-square w-16 h-16 object-cover rounded-lg shadow-sm'src={img} alt={name} />
                <p>{name}</p>
            </div>
            
            <div className=" flex gap-4 items-center min-w-fit">
                <AdminButton 
                    text={'Eliminar'}
                />
                
                <Link to={'/admin/editProduct'}>
                    <AdminButton 
                        text={'Actualizar'}
                    />
                </Link>

            </div>
        </section>
    )
}