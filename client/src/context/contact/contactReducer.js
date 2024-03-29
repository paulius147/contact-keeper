import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS
} from '../types';

const contactReducer = (state, action) => {
    switch (action.type) {
        case GET_CONTACTS: {
            return {
                ...state,
                contacts: action.payload
            }
        }
        case CLEAR_CONTACTS: {
            return {
                ...state,
                contacts: null,
                filtered: null,
                current: null,
                error: null
            }
        }
        case ADD_CONTACT: {
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
            }
        }
        case CONTACT_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case UPDATE_CONTACT: {
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
                filtered: state.filtered !== null ? state.filtered.map(contact => contact._id === action.payload._id ? action.payload : contact) : null,
            }
        }
        case DELETE_CONTACT: {
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact._id !== action.payload),
            }
        }
        case SET_CURRENT: {
            return {
                ...state,
                current: action.payload
            }
        }
        case CLEAR_CURRENT: {
            return {
                ...state,
                current: null
            }
        }
        case FILTER_CONTACTS: {
            return {
                ...state,
                filtered: state.contacts.filter(({ name, email }) => {
                    const text = `${name}${email}`.toLowerCase();
                    return text.includes(action.payload.toLowerCase());
                })
            }
        }
        case CLEAR_FILTER: {
            return {
                ...state,
                filtered: null
            }
        }
        default:
            return state;
    }
}

export default contactReducer;