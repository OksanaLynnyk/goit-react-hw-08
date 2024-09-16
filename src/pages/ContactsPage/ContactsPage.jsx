import { useDispatch } from "react-redux"
import { useEffect } from "react";

import { fetchContacts } from "../../redux/contacts/operations";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";

import toast from "react-hot-toast";

const ContactsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts())
    .unwrap()
    .then(() => {
      toast.success("Contacts loaded successfully🎉");
    })
    .catch(error => {
      toast.error('Error fetching contacts:', error);
    });
  }, [dispatch]);

  return (
    <>
        <DocumentTitle>Contacts</DocumentTitle>
        <ContactForm />
        <SearchBox />
        <ContactList />
    </>
  )
}

export default ContactsPage