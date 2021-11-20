import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import AlertContext from '../../context/alert/alertContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const alertContext = useContext(AlertContext);
    const { addContact, updateContact, current, clearCurrent } = contactContext;
    const { setAlert } = alertContext;

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    useEffect(() => {
        if (current) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, current]);

    const onChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (current) {
            if (name !== '' && phone !== '' || name !== '' && email !== '') {
                updateContact(contact);
                setContact({
                    name: '',
                    email: '',
                    phone: '',
                    type: 'personal'
                })
                clearAll();
            } else {
                setAlert('Please enter at least Name and one other field', 'danger');
            }
        } else {
            if (name !== '' && phone !== '' || name !== '' && email !== '') {
                addContact(contact);
                setContact({
                    name: '',
                    email: '',
                    phone: '',
                    type: 'personal'
                })
                clearAll();
            } else {
                setAlert('Please enter at least Name and one other field', 'danger');
            }
        }
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input
                type='text'
                name='name'
                placeholder='Name'
                value={name}
                onChange={onChange}
            />
            <input
                type='email'
                name='email'
                placeholder='Email'
                value={email}
                onChange={onChange}
            />
            <input
                type='text'
                name='phone'
                placeholder='Phone'
                value={phone}
                onChange={onChange}
            />
            <input
                type='radio'
                name='type'
                value='personal'
                checked={type === 'personal'}
                onChange={onChange}
            /> Personal{' '}
            <input
                type='radio'
                name='type'
                value='professional'
                checked={type === 'professional'}
                onChange={onChange}
            /> Professional
            <div>
                <input type='submit' value={current ? 'Update Contact' : 'Add Contact'} className='btn btn-primary btn-block' />
            </div>
            <div>
                {current && <button onClick={clearAll} className='btn btn-light btn-block' >Clear</button>}
            </div>
        </form>
    )
}

export default ContactForm
