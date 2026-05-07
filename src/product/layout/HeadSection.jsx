import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

export default function HeadSection({img,productName}){
    return(
        <section className='flex relative flex-col justify-center items-center gap-1.5 bg-[--color-yellow-otto] p-8'>

        <button className="absolute top-4 right-4 text-white">
            <span className="inline-block transition-transform duration-300 hover:-translate-x-1">
                <FontAwesomeIcon icon={faArrowLeft} />
            </span>
        </button>

            <div className='w-24 h-24 md:w-32 md:h-32'>
                <img src={img} alt={productName}  className='object-contain w-full h-full'/>
            </div>

            <h1 className='text-3xl font-bold uppercase text-white tracking-tight text-center'>{productName}</h1>
        </section>
    )
}