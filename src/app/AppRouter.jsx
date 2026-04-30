import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Auth from '@/auth/Auth'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth/>}/>
            </Routes>
        </BrowserRouter>
    );
}