import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectError } from "../../redux/auth/selectors";
import { register } from "../../redux/auth/operations";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Visibility, VisibilityOff } from "@mui/icons-material";

const registrationValidationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").max(100, "Too Long!").required("Required"),
    password: Yup.string().min(8, 'Too short').max(100, 'Too long').required('Required'),
    email: Yup.string().email("Must be a valid email!").required("Required")
  });

const RegisterForm = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectError);

    const initialValues = {
      name: "",
      email: "",
      password: ""
    };

    const handleSubmit = (values) => {
      dispatch(register(values));
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center" 
      >
    <Box 
      sx={{
        mt: 4,
        padding: 3,
        width: '100%',
        maxWidth: 450, 
        textAlign: 'center',
      }}
      >
      <HowToRegIcon fontSize='large' color="primary"/>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <Typography variant="body2" sx={{color: "rgba(0, 0, 0, 0.6)", mb:2 }}>
        Welcome user, please sign up to continue
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registrationValidationSchema}
        >
        {({ errors, isValid }) => (
          <Form>
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel  required htmlFor="name">Username</InputLabel>
              <Field
                as={OutlinedInput}
                id="name"
                name="name"
                label="Username"
                error={Boolean(errors.name)}
                fullWidth
              />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
              <InputLabel  required htmlFor="email">Email</InputLabel>
              <Field
                as={OutlinedInput}
                id="email"
                name="email"
                label="Email"
                error={Boolean(errors.email)}
                fullWidth
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="outlined" error={Boolean(errors.password)}>
              <InputLabel  required htmlFor="password">Password</InputLabel>
              <Field
                name="password"
                type={showPassword ? 'text' : 'password'}
                as={OutlinedInput}
                label="Password"
                fullWidth
                margin="dense"
                error={ Boolean(errors.password)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </FormControl>
            <Button
              fullWidth
              sx={{ m: 1}}
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isValid}
              >
              Register
            </Button>
            {error && <p style={{ color: 'red' }}>Oops, some error occurred... {error}</p>}
          </Form>      
        )}
      </Formik>
    </Box>
  </Box>
);};

export default RegisterForm