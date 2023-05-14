import React, { useState } from "react";
import PropTypes from 'prop-types';
import './ContactForm.css';


export const ContactForm = ({onSubmit}) => {
    
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
    

  const  handleChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        console.log('Danger');
    }
    };
 
  const  handleSubmit = e => {
        e.preventDefault();

      onSubmit(name, number);
      reset();
    };

    const reset = () => {
        setName('')
        setNumber('')
    };
    
return(
<div className="form">
    <form
      onSubmit={handleSubmit}
    >
    <label className="label">Name
      <input
      className="input"
      type="text"
      value={name}
      onChange={handleChange}
      name="name"
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
      />
    </label>

    <label className="label">Number
      <input
      className="input"
      type="tel"
      value={number}
      onChange={handleChange}
      name="number"
      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
      title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      required
      />
    </label>      


    <button className="btn" type="submit">Add contact</button>
  </form> 
</div>
  );
  }
// }

ContactForm.protoTypes = {
  addContact: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
// ContactForm.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };