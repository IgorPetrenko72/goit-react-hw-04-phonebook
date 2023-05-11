import PropTypes from 'prop-types';
import './Contactlist.css';

export function ContactList({ contacts, onDelete }) {
    return (
        <ul className='contactlist'>
          {contacts.map(({ id, name, number }) => (
              <li
                className='contactlist__item'
                key={id}>
                  <p>{name}: </p>
                   <p>{number}</p>
             <button
            className='btn'
            type="button"
            onClick={() => onDelete(id)}
          >
            Delete
            </button>
        </li>    
            ))}       
        </ul>
    );
};
ContactList.propTypes = {
    onDelete: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    )
};