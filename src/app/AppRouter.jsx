import { BrowserRouter, Routes, Route} from 'react-router'
import Auth from '@/auth/Auth'
import Home from '@/home/Home'
import SalesLayout from '@/sales/layout/SalesLayout';
import RegisterSales from '@/sales/components/RegisterSales';
import SalesMoney from '@/sales/components/SalesMoney';
import DiarySales from '@/sales/components/DiarySales';
import GeneralSales from '@/generalSalesHistory/GeneralSales';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Auth/>}/>
                
                <Route path='/home' element={<Home/>}/>

                <Route path='/sales' element={<SalesLayout/>}>
                    <Route index element={<RegisterSales/>}/>
                    <Route path='/sales/money' element={<SalesMoney/>}/>
                    <Route path='/sales/history' element={<DiarySales/>}/>
                </Route>

                <Route path='/generalHistory' element={<GeneralSales/>}/>
            </Routes>
        </BrowserRouter>
    );
}