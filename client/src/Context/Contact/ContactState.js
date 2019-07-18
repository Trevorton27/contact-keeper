import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
    //FILTER_CONTACTS,
   // CLEAR_FILTER
} from '../Types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'The Johnny',
                email: 'bananarama@apple.banana',
                phone: '226-848-5740',
                type: 'professional'
                
            },
            {
                id: 2,
                name: 'Bananarama99',
                email: 'bananarama@bananarama.banana',
                phone: '226-848-5745',
                type: 'professional'
                
            },
            {
                id: 3,
                name: 'The Pen',
                email: 'benicetome@imsensitive.brah',
                phone: '123-456-7890',
                type: 'personal'
                
            }
        ],  
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    //Add Contact
    const addContact = contact => {
        contact.id = uuid.v4();
        dispatch({ type: ADD_CONTACT, payload: contact})
    }

    //Delete Contact
    const deleteContact = id => {
       
        dispatch({ type: DELETE_CONTACT, payload: id});
        
    };

    //Set Current Contact
    const setCurrent = contact => {
       
        dispatch({ type: SET_CURRENT, payload: contact});
    };

    //Clear Current Contact
    const clearCurrent = () => {
       
        dispatch({ type: CLEAR_CURRENT });
    };


    //Update Contact
    const updateContact = contact => {
       
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };

    //Filter Contacts
    const filterContacts = text => {
       
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };


    //Clear Filter
    const clearFilter = () => {
       
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider 
        value={{
            contacts: state.contacts,
            current: state.current,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};
    
export default ContactState;
