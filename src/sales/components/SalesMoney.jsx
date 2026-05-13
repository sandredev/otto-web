import moneyImg from '@/assets/money.png';
import nequiLogo from '@/assets/nequi-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

export default function SalesMoney() {
    const nequiMoney = 0;
    const cashMoney = 0;
    return (

         <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl w-full gap-6 mx-auto justify-items-center'>

            <div className='aspect-square w-full bg-white rounded-4xl text-lg sm:text-xl md:text-2xl lg:text-3xl cursor-pointer flex
                items-center justify-center flex-col gap-y-1 p-10 drop-shadow-2xl'>

                <img src={nequiLogo} alt='Nequi' className='w-full h-auto aspect-square p-10'/>
                
                <div className='text-xl sm:text-2xl lg:text-3xl font-normal'>
                    <FontAwesomeIcon icon={faDollarSign} className='text-yellow-otto font-normal'/>
                    {nequiMoney}
                </div>

                <span className='font-bold'>Nequi</span>
            </div>

            <div className='aspect-square w-full bg-white rounded-4xl text-lg sm:text-xl md:text-2xl lg:text-3xl cursor-pointer flex
                items-center justify-center flex-col gap-y-1 drop-shadow-2xl p-10'>
                <img src={moneyImg} alt='Efectivo' className='w-full h-auto aspect-square object-cover p-10+'/>
                <div className='text-xl sm:text-2xl lg:text-3xl font-normal'>
                    <FontAwesomeIcon icon={faDollarSign} className='text-yellow-otto'/>
                    {cashMoney}
                </div>
                <span className='font-bold'>Efectivo</span>
            </div>
        </div> 
    );
}