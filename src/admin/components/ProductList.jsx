import ProductListCard from './ProductListCard.jsx'

export default function ProductList({products = []}){
    return(
        <section className='bg-gray-100 rounded-3xl w-full flex flex-col justify-center '>

            <ul className='list-none list-outside '>

                {products.map((element)=>(

                    <li key={element.id} className='m-0 p-0'> 
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