import React, { Component } from "react";
import { ContactForm  } from "./ContactForm/ContactForm"
import { nanoid } from 'nanoid'
import { ContactList } from "./Contactlist/ContactList";
import { Filter } from "./Filter/Filter";
import './ContactForm/ContactForm.css';

export class App extends Component {
 state = {
   contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
   filter: '',
}

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parse = JSON.parse(contacts);
    if (parse) {
      this.setState({ contacts: parse });
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
     };
     
     this.state.contacts.some(i => (i.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()) ||
       (i.number === contact.number))
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  }
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter),)
  }
   onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(i => i.id !== id),
    }));
  };
  render() { 
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className="phonebook">
        <h1 className="title">Phonebook</h1>
        <ContactForm  onSubmit={this.formSubmitHandler} />
        <h2 className="title">Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDelete={this.onDeleteContact}
        /> 
      </div>  
  );
  }  
};
