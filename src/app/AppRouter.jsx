import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import ProtectedRoute from '../Routes/ProtectedRoutes.jsx';
import Auth from '@/auth/Auth';
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
                <Route path='/login' element={<Auth />} />
                <Route path='/registro' element={<Register />} />
                
                <Route path='/home' element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />

                <Route path='/sales' element={
                    <ProtectedRoute>
                        <SalesLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<RegisterSales />} />
                    <Route path='money' element={<SalesMoney />} />
                    <Route path='history' element={<DiarySales />} />
                    
                    {/* Admin dentro de sales */}
                    <Route path='admin' element={
                        <ProtectedRoute requiredRole='admin'>
                            <AdminView />
                        </ProtectedRoute>
                    }>
                        <Route path='editProduct' element={<EditProduct />} />
                    </Route>
                </Route>
                
                <Route path='admin/editProduct/:productId' element={
                    <ProtectedRoute requiredRole='admin'>
                        <Product />
                    </ProtectedRoute>
                } />
                
                <Route path='/generalhistory' element={
                    <ProtectedRoute>
                        <GeneralSales />
                    </ProtectedRoute>
                } />
                
                <Route path='/auth' element={<Navigate to='/login' />} />
                <Route path='/' element={<Navigate to='/login' />} />
            </Routes>
        </BrowserRouter>
    );
}