import AdminButton from "../../shared/components/AdminButton";

export default function ProductListCard({name, img}){
    return(
        <section>
            <div>
                <img src={img} alt={name} />
                <p>{name}</p>
            </div>
            
            <div>
                <AdminButton 
                    text={'Eliminar'}
                />
                <AdminButton 
                    text={'Actualizar'}
                />
            </div>
        </section>
    )
}