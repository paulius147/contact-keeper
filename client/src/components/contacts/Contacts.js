import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner';

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getContacts } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, []);

    if (contacts !== null && contacts.length === 0) {
        return <h4>No Contacts</h4>
    }

    return (
        <Fragment>
            {contacts !== null ? (<TransitionGroup>
                {filtered !== null ? filtered.map(contact => <CSSTransition timeout={500} classNames='item' key={contact._id}><ContactItem contact={contact} /></CSSTransition>) : contacts.map(contact => <CSSTransition classNames='item' timeout={500} key={contact._id}><ContactItem contact={contact} /></CSSTransition>)}
            </TransitionGroup>) : <Spinner />}
        </Fragment>
    )
}

export default Contacts
