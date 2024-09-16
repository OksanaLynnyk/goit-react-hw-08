import { useDispatch } from 'react-redux';

import { logIn } from '../../redux/auth/operations';

import toast from 'react-hot-toast';

import { AppProvider, SignInPage } from '@toolpad/core';
import { Box } from '@mui/material';

const providers = [{ id: 'credentials', name: 'Email and password' }];

const LoginForm = () => {
  const dispatch = useDispatch();
 

  const handleSignIn = async (provider, formData) => {
    try {
      const values = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      await dispatch(logIn(values)).unwrap();
      toast.success('Login successful!');
      return { type: 'CredentialsSignin' };
    } catch {
      toast.error('Login failed');
      return { type: 'CredentialsSignin', error: 'Invalid data' };
    }
  };

  return (
    <Box marginTop={-3}>
      <AppProvider >
        <SignInPage 
          signIn={handleSignIn}
          providers={providers}
        />
      </AppProvider>
    </Box>
  );
};

export default LoginForm;
