import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router';

export default function HeadSection({img,productName}){
    return(
    <section className='flex relative flex-col justify-center items-center gap-4 bg-yellow-otto'>
        <Link to={'/sales'}>
            <button className="absolute top-6 left-6 text-white">
                <span className="inline-block transition-transform duration-300 hover:-translate-x-1 cursor-pointer">
                    <FontAwesomeIcon icon={faArrowLeft} size="2xl"/>
                </span>
            </button>
        </Link>

        <div className='w-48 md:w-64 drop-shadow-2xl p-3'>
            <img 
                src={img} 
                alt={productName}  
                className='object-contain w-full h-auto transform hover:scale-105 transition-transform duration-500'
            />
        </div>

        <h1 className='text-4xl font-black uppercase text-white tracking-tighter text-center'>
            {productName}
        </h1>
    </section>
    )
}