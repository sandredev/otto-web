import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useOutletContext } from 'react-router';

export default function ProductCard({ product }) {
    return (
        <section className='rounded-2xl drop-shadow-md/30 bg-white overflow-hidden flex flex-col items-center pb-5 cursor-pointer hover:shadow-lg transition-shadow'>
            <img 
                src={product.img} 
                alt={product.name} 
                className='w-full h-auto aspect-4/3 object-cover'
            />
            <h3 className='font-bold text-xs sm:text-base lg:text-xl py-2 text-center px-2'>
                {product.name}
            </h3>
            {product.precio && (
                <p className='text-yellow-otto font-bold text-sm mb-2'>
                    ${product.precio.toLocaleString('es-CO')}
                </p>
            )}
            <FontAwesomeIcon 
                icon={faPlus} 
                className='text-xl md:text-2xl lg:text-4xl text-yellow-otto'
            />
        </section>
    );
}