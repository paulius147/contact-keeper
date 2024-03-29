import React, { useContext, useRef } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const { filterContacts, clearFilter } = contactContext;
    const text = useRef('');

    const onChange = (e) => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }

    return (
        <form>
            <input type='text' ref={text} placeholder='Filter Contacts' onChange={onChange} />
        </form>
    )
}

export default ContactFilter
