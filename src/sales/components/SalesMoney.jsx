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
        <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl w-full gap-6 mx-auto justify-items-center'>

            <div className='aspect-square w-full bg-white rounded-4xl text-lg sm:text-xl md:text-2xl lg:text-3xl cursor-pointer flex
                    items-center justify-center flex-col gap-y-1 p-10 sm:p-12 md:p-14 lg:p-16 drop-shadow-2xl hover:shadow-2xl transition-all'>
                <img src={nequiLogo} alt='Nequi' className='w-full h-auto aspect-square'/>
                <span className='font-normal text-lg sm:text-xl lg:text-2xl'>Nequi</span>
                <div className='font-bold text-lg sm:text-xl lg:text-2xl text-green-600'>
                    {loading ? 'Cargando...' : formatMoney(nequiMoney)}
                </div>
            </div>

            <div className='aspect-square w-full bg-white rounded-4xl text-lg sm:text-xl md:text-2xl lg:text-3xl cursor-pointer flex
                items-center justify-center flex-col gap-y-1 drop-shadow-2xl p-10 sm:p-12 md:p-14 lg:p-16 hover:shadow-2xl transition-all'>
                <img src={moneyImg} alt='Efectivo' className='w-full h-auto aspect-square object-cover'/>
                <span className='font-normal text-lg sm:text-xl lg:text-2xl'>Efectivo</span>
                <div className='font-bold text-lg sm:text-xl lg:text-2xl text-blue-600'>
                    {loading ? 'Cargando...' : formatMoney(cashMoney)}
                </div>
            </div>
        </div> 
    );
}