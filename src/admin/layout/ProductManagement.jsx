import ProductList from "../components/ProductList";

export default function ProductManagement({products}){
    return(
        <section>
            <div>
                <h1>Editar productos</h1>
            </div>

            <ProductList products={products}/>
        </section>
    )
}