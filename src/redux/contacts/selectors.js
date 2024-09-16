import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectFilterName = (state) => state.filter.name;
export const selectFilterNumber = (state) => state.filter.number;
export const selectContactsError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectFilterName, selectFilterNumber],
    (contacts, filterName, filterNumber) => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filterName.toLowerCase()) && contact.number.includes(filterNumber)
        );
    }
);

export const selectContactsLoading = (state) => state.contacts.loading

