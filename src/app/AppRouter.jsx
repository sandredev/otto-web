import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Auth from '@/auth/Auth'
import Home from '@/home/Home'
import SalesLayout from '@/sales/layout/SalesLayout';
import RegisterSales from '@/sales/RegisterSales';
import SalesMoney from '@/sales/SalesMoney';
import SalesHistory from '@/sales/SalesHistory';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Auth/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/sales' element={<SalesLayout/>}>
                    <Route index element={<RegisterSales/>}/>
                    <Route path='/sales/money' element={<SalesMoney/>}/>
                    <Route path='/sales/history' element={<SalesHistory/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}