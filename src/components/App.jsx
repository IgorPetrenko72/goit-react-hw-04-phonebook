import React, { useEffect, useState } from "react";
import { ContactForm  } from "./ContactForm/ContactForm"
import { nanoid } from 'nanoid'
import { ContactList } from "./Contactlist/ContactList";
import { Filter } from "./Filter/Filter";
import './ContactForm/ContactForm.css';

export const App = () => {

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  }); 
  const [filter, setFilter] = useState('')

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);
  
  const formSubmitHandler = (name, number ) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
  
     contacts.some(i => (i.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()) ||
       (i.number === contact.number))
      ? alert(`${name} is already in contacts`)
      : setContacts(
          [contact, ...contacts],
        );
  };

  const changeFilter = e => {
    setFilter(e.target.value );
  }

  const getVisibleContacts = () => {
  const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),)
  }
  const onDeleteContact = id => {
    setContacts(prevState => (
      prevState.filter(i => i.id !== id)

    ));
  };
    const visibleContacts = getVisibleContacts();
    return (
      <div className="phonebook">
        <h1 className="title">Phonebook</h1>
        <ContactForm
          onSubmit={formSubmitHandler}
        />
        <h2 className="title">Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDelete={onDeleteContact}
        /> 
      </div>  
  );  
};
