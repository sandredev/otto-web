import ProductListCard from './ProductListCard.jsx'

export default function ProductList({products}){
    return(
        <section>
            <ul>
                {products.map((element)=>(
                    <li key={element.id}> 
                        <ProductListCard 
                            name={element.name}
                            img={element.img}
                        /> 
                    </li>
                ))}
            </ul>
        </section>
    )
}