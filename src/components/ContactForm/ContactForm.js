import React, { Component } from "react";
import PropTypes from 'prop-types';
import './ContactForm.css';


export class ContactForm  extends Component {
    state = {
        name: '',
        number: '',
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    };
  
    handleSubmit = e => {
        e.preventDefault();

        this.props.onSubmit(this.state);
        this.reset();
    };

    reset = () => {
        this.setState({
            name: '',
            number: '',
        })
    };

     render() {
    
return(
<div className="form">
  <form onSubmit={this.handleSubmit}>
    <label className="label">Name
      <input
      className="input"
      type="text"
      value={this.state.name}
      onChange={this.handleChange}
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
      value={this.state.number}
      onChange={this.handleChange}
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
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};