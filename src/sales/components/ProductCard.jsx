import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
<<<<<<< HEAD
=======
import { Link } from 'react-router'
>>>>>>> ad14cd14bb79c261220ddfab54334ca6b77b01e6

/*
- product: {
    name: string;
    picture: img;
}
*/
export default function ProductCard({product}) {
    return (
<<<<<<< HEAD
        <section className='rounded-2xl drop-shadow-md/30 bg-white overflow-hidden flex flex-col items-center pb-5 cursor-pointer'>
            <img src={product.img} alt={product.name} className='w-full h-auto aspect-4/3 object-cover'/>
            <h3 className='font-bold text-xs sm:text-base lg:text-xl py-2 text-center'>
                {product.name}
            </h3>
            <FontAwesomeIcon icon={faPlus} className='text-xl md:text2xl lg:text-4xl text-yellow-otto'/>
        </section>
=======
        <Link to={`/sales/new/${product.id}`} className='w-full h-full'>
            <section className='rounded-2xl drop-shadow-md/30 bg-white overflow-hidden flex flex-col items-center pb-5 cursor-pointer'>
                <img src={product.img} alt={product.name} className='w-full h-auto aspect-4/3 object-cover'/>
                <h3 className='font-bold text-xs sm:text-base lg:text-xl py-2 text-center'>
                    {product.name}
                </h3>
                <FontAwesomeIcon icon={faPlus} className='text-xl md:text2xl lg:text-4xl text-yellow-otto'/>
            </section>
        </Link>
>>>>>>> ad14cd14bb79c261220ddfab54334ca6b77b01e6
    );
}