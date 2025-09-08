import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../views/Dashboard';
import Navbar from '../components/ui/NavBar';

export const PrivateRoutes = () => {
    return (
        <>
        <Navbar/>
        <Routes>
            
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='*' element={<Navigate to='/Dashboard' replace />} />
        </Routes>
        </>
    );
};
