import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function ProductCard({ product, isAdmin, quantityInCart = 0 }) {
    const isSelected = quantityInCart > 0;

    return (
        <section
            className={`h-full flex flex-col rounded-2xl drop-shadow-md/30 bg-white overflow-hidden pb-3 cursor-pointer
                active:scale-95 transition-all duration-200
                ${isSelected ? 'ring-2 ring-yellow-otto bg-yellow-50' : 'hover:shadow-lg'}`}
        >
            <div className="relative w-full flex-shrink-0">
                <img
                    src={product.img}
                    alt={product.name}
                    className='w-full h-auto aspect-4/3 object-cover'
                />
                {isSelected && (
                    <div className="absolute top-2 right-2 bg-yellow-otto text-white text-xs font-bold rounded-full min-w-[1.5rem] h-6 px-1.5 flex items-center justify-center shadow-md animate-pop">
                        {quantityInCart}
                    </div>
                )}
            </div>
            <div className="flex-1 flex flex-col items-center justify-between pt-2 px-2">
                <h3 className='font-bold text-xs sm:text-base lg:text-xl text-center line-clamp-2'>
                    {product.name}
                </h3>
                <div className="flex flex-col items-center">
                    {product.precio && (
                        <p className='text-yellow-otto font-bold text-sm sm:text-base mb-1'>
                            ${product.precio.toLocaleString('es-CO')}
                        </p>
                    )}
                    <div className={`transition-all duration-300 ${isSelected ? 'text-green-500 scale-110' : 'text-yellow-otto'}`}>
                        <FontAwesomeIcon
                            icon={isSelected ? faCheck : faPlus}
                            className='text-xl md:text-2xl lg:text-3xl'
                        />
                    </div>
                    {isSelected && (
                        <span className="text-[0.65rem] text-green-600 font-medium mt-0.5">Agregado</span>
                    )}
                </div>
            </div>
        </section>
    );
}
