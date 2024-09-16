import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import RestrictedRoute from './components/RestrictedRoute';
import PrivateRoute from './components/PrivateRoute';
import { refreshUser } from './redux/auth/operations';
import { selectIsRefreshing } from './redux/auth/selectors';

import { Box, Container } from '@mui/material';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'))

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing); 

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) return <p>User is refreshing, please wait</p>;

  return  (
    <Layout>
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(255, 220, 200, 0.5), rgba(255, 255, 210, 0.5)), url('https://kalix.club/uploads/posts/2022-12/1671642639_kalix-club-p-literaturnii-fon-dlya-prezentatsii-instagr-3.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',       
          minHeight: '100vh',      
          backgroundAttachment: 'fixed',
        }}
      >
        <Container sx={{p:15}} >
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register'element={<RestrictedRoute component={<RegistrationPage />} />} />
            <Route path='/login' element={<RestrictedRoute component={<LoginPage />} />} />
            <Route path='contacts' element={<PrivateRoute component={<ContactsPage />} />} />
          </Routes>
        </Container>
      </Box>
    </Layout>
  )
}

export default App