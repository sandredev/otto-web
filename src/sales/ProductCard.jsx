import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

/*
- product: {
    name: string;
    picture: img;
}
*/
export default function ProductCard({product}) {
    return (
        <section className='rounded-2xl drop-shadow-md/30 bg-white overflow-hidden flex flex-col items-center pb-5 cursor-pointer'>
            <img src={product.img} alt={product.name} className='w-full h-auto aspect-4/3 object-cover'/>
            <h3 className='font-bold text-xl sm:text-2xl py-2 text-center'>
                {product.name}
            </h3>
            <FontAwesomeIcon icon={faPlus} className='text-4xl text-yellow-otto'/>
        </section>
    );
}