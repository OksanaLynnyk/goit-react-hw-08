import {  useSelector } from "react-redux";

import Contact from "../Contact/Contact"
import { selectFilteredContacts } from "../../redux/contacts/selectors";

import { Grid2 } from "@mui/material";

const ContactList = () => {
    const visibleContacts = useSelector(selectFilteredContacts);

    return (
        <Grid2 container spacing={2}   justifyContent="center"
            alignItems="center" padding={10}>
            {visibleContacts.map(({name, number, id}) => {
                return <div key={id} 
                >
                <Contact
                    name={name}
                    number={number}
                    id={id}
                />
                </div>
            })}
        </Grid2>
    )
}

export default ContactList