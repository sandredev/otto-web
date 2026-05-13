import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Auth from '@/auth/Auth'
import Login from '@/auth/Login';
import Register from '@/auth/Register';
import Home from '@/home/Home'
import SalesLayout from '@/sales/layout/SalesLayout';
import RegisterSales from '@/sales/components/RegisterSales';
import Product from '@/product/Product';
import SalesMoney from '@/sales/components/SalesMoney';
import DiarySales from '@/sales/components/DiarySales';
import GeneralSales from '@/generalSalesHistory/GeneralSales';
import AdminView from '@/admin/AdminView';
import EditProduct from '@/admin/layout/EditProduct';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='auth' element={<Auth />}>
                    <Route index element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>
                <Route path='home' element={<Home />} />

                <Route path='sales' element={<SalesLayout />}>
                    <Route index element={<RegisterSales />} />
                    <Route path='money' element={<SalesMoney />} />
                    <Route path='history' element={<DiarySales />} />
                    {/*Imagen y nombre del producto plantillas*/}
                </Route>
                
                <Route path='/sales/new/:productId' element={<Product img="https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                                    productName="Sandwich de pollo"/>} />
                <Route path='/generalhistory' element={<GeneralSales />} />
                <Route path='/admin' element={<AdminView />}>
                    <Route path='/admin/editProduct' element={<EditProduct />} />
                </Route>
                <Route path='/' element={<Navigate to='/auth' />} />
            </Routes>
        </BrowserRouter>
    );
}