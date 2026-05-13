import ProductList from "../components/ProductList";

export default function ProductManagement({products}){
    return(
        <section className="flex flex-col justify-center items-start ">

            <div className="text-3xl text-black mb-6 font-bold tracking-tighter text-left">
                <h1>Editar productos</h1>
            </div>

            <ProductList products={products}/>
        </section>
    )
}