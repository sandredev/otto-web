import { useEffect, useState } from 'react';
import moneyImg from '@/assets/money.png';
import nequiLogo from '@/assets/nequi-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { getPaymentsSummaryToday } from '@/lib/services/pagos.js';

export default function SalesMoney() {
    const [nequiMoney, setNequiMoney] = useState(0);
    const [cashMoney, setCashMoney] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchSales = async () => {
        setLoading(true);
        const result = await getPaymentsSummaryToday();

        if (result.success && result.data) {
            // Buscar los valores por nombre de método
            setNequiMoney(result.data['NEQUI'] || result.data['Transferencia'] || 0);
            setCashMoney(result.data['EFECTIVO'] || 0);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSales();

        // ✅ Refrescar cada 30 segundos
        const interval = setInterval(fetchSales, 30000);

        return () => clearInterval(interval);
    }, []);

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(amount);
    };

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] w-full max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl gap-6 mx-auto px-4 justify-items-center'>

            <div className='aspect-[4/3] sm:aspect-square w-full bg-white rounded-2xl sm:rounded-4xl text-sm sm:text-lg md:text-xl lg:text-2xl cursor-pointer flex
                    items-center justify-center flex-col gap-y-1 p-4 sm:p-8 md:p-10 lg:p-12 drop-shadow-2xl hover:shadow-2xl transition-all'>
                <div className='w-3/5 sm:w-4/5 aspect-square'>
                    <img src={nequiLogo} alt='Nequi' className='w-full h-full object-contain'/>
                </div>
                <span className='font-normal text-xs sm:text-base lg:text-xl'>Nequi</span>
                <div className='font-bold text-sm sm:text-lg lg:text-xl text-green-600'>
                    {loading ? 'Cargando...' : formatMoney(nequiMoney)}
                </div>
            </div>

            <div className='aspect-[4/3] sm:aspect-square w-full bg-white rounded-2xl sm:rounded-4xl text-sm sm:text-lg md:text-xl lg:text-2xl cursor-pointer flex
                items-center justify-center flex-col gap-y-1 drop-shadow-2xl p-4 sm:p-8 md:p-10 lg:p-12 hover:shadow-2xl transition-all'>
                <div className='w-3/5 sm:w-4/5 aspect-square'>
                    <img src={moneyImg} alt='Efectivo' className='w-full h-full object-cover rounded-xl sm:rounded-2xl'/>
                </div>
                <span className='font-normal text-xs sm:text-base lg:text-xl'>Efectivo</span>
                <div className='font-bold text-sm sm:text-lg lg:text-xl text-blue-600'>
                    {loading ? 'Cargando...' : formatMoney(cashMoney)}
                </div>
            </div>
        </div> 
    );
}