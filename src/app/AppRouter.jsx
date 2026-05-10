import { BrowserRouter, Routes, Route} from 'react-router'
import Auth from '@/auth/Auth'
import Home from '@/home/Home'
import SalesLayout from '@/sales/layout/SalesLayout';
import RegisterSales from '@/sales/components/RegisterSales';
import SalesMoney from '@/sales/components/SalesMoney';
import DiarySales from '@/sales/components/DiarySales';
import GeneralSales from '@/generalSalesHistory/GeneralSales';
import AdminView from '@/admin/AdminView';
import EditProduct from '@/admin/layout/EditProduct';

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

                <Route path='/admin' element={<AdminView/>}>
                    <Route path='/admin/editProduct' element={<EditProduct/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}