import { Link } from "react-router";
import AdminButton from "../../shared/components/AdminButton";

export default function ProductListCard({id, name, img, onDelete}){

    return(
        <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-4 sm:py-5 px-4 sm:px-6 w-full border-b border-gray-200 last:border-none">

            <div className="flex flex-row items-center gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg text-gray-800 font-semibold min-w-0 w-full sm:w-auto">
                <img className='aspect-square w-12 sm:w-16 h-12 sm:h-16 object-cover rounded-lg shadow-sm flex-shrink-0' src={img} alt={name} />
                <p className="truncate">{name}</p>
            </div>
            
            <div className="flex gap-3 items-center self-end sm:self-auto">
                <AdminButton 
                    text={'Eliminar'}
                    onClick={() => onDelete?.()}
                />
                
                <Link to={`/sales/admin/editProduct/${id}`}>
                    <AdminButton 
                        text={'Editar'}
                    />
                </Link>

            </div>
        </section>
    )
}
