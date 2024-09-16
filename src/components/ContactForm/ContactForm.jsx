import { useDispatch } from "react-redux";

import { addContact } from "../../redux/contacts/operations";

import toast from "react-hot-toast";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Button from '@mui/material/Button';
import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";

const initialValues = {
    name: "",
    number: ""
};

const ProfileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required')
    .min(3, 'Too short')
    .max(50, 'Too long'),
  number: Yup.string()
  .matches(/^[0-9]+$/, "Only digits ")
  .min(3, "Minimum 3 digits required")
    .required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const onAddContact = (contact, actions) => {
    dispatch(addContact(contact))
      .unwrap()
      .then(() => {
        toast.success("Contact added successfully 🎉");
        actions.resetForm();
      })
      .catch(error => {
        toast.error("Failed to add contact: " + error.message);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mb={8}
      >
      <Box 
        sx={{
        mt:10,
        border: '1px solid #ccc',
        borderRadius: 2,
        padding: 3,
        boxShadow: 2,
        width: '100%',
        maxWidth: 450,
        textAlign: 'center',
        backgroundColor:"rgba(255, 215, 0, 0.1)"
        }}
        >
        <Formik 
          initialValues={initialValues} onSubmit={onAddContact}
          validationSchema={ProfileValidationSchema}
          >
          <Form> 
            <FormControl fullWidth sx={{ mb:4}} variant="outlined">
              <InputLabel  htmlFor="name">Name</InputLabel>
              <Field  
                as={OutlinedInput}
                id="name"
                name="name"
                label="Name"
                sx={{ '& .MuiInputBase-input': {
                  backgroundColor: 'rgba(255, 165, 0, 0.1)',
                }}}
                fullWidth
              />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </FormControl>
            <FormControl fullWidth sx={{ mb:4 }} variant="outlined">
              <InputLabel htmlFor="number">Number</InputLabel>
              <Field
                as={OutlinedInput}
                id="name"
                name="number"
                label="Number"
                fullWidth
                sx={{ '& .MuiInputBase-input': {
                  backgroundColor: 'rgba(255, 165, 0, 0.1)',
                }}}
              />
              <ErrorMessage name="number" component="div" style={{ color: 'red' }} />
            </FormControl>
            <Button variant="contained" color="success" type="submit">Add contact</Button>
          </Form>
        </Formik>
      </Box>
    </Box>
  )
}

export default ContactForm