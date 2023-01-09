import React from 'react';
import "./App.css";

class AddressBook extends React.Component {
  state = {
    records: [],
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    editing: false,
    currentIndex: -1,
  };

  componentDidMount() {
    this.fetchRecords();
  }

  fetchRecords = async () => {
    const response = await fetch('http://localhost:3000/api/records');
    const records = await response.json();
    this.setState({ records });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.editing) {
      const updatedRecord = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
        email: this.state.email,
      };
      await fetch(`http://localhost:3000/api/records/${this.state.currentIndex}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecord),
      });
      this.setState({ editing: false });
    } else {
      const newRecord = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
        email: this.state.email,
      };
      await fetch('http://localhost:3000/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      });
    }
    this.setState({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    });
    this.fetchRecords();
  };

  handleEdit = (index, record) => {
    this.setState({
      firstName: record.firstName,
      lastName: record.lastName,
      phone: record.phone,
      email: record.email,
      editing: true,
      currentIndex: index,
    });
  };

  handleDelete = async index => {
    await fetch(`http://localhost:3000/api/records/${index}`, {
      method: 'DELETE',
    });
    this.fetchRecords();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">First name:</label>
          <input
            type="text"
            id="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            name="firstName"
          required/>
          <br />
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            name="lastName"
          required/>
          <br />
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            name="phone"
          required/>
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
            name="email"
          required/>
          <br />
          {this.state.editing ? (
            <button type="submit">Update</button>
          ) : (
            <button type="submit">Add</button>
          )}
        </form>
        <br />
        <table>
          <tbody>
            {this.state.records.map((record, index) => (
              <tr key={index}>
                <td>First name: {record.firstName}</td>
                <td>Last name: {record.lastName}</td>
                <td>Phone: {record.phone}</td>
                <td>Email: {record.email}</td>
                <td>
                  <button id='edit' onClick={() => this.handleEdit(index, record)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button id='delete' onClick={() => this.handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}  
export default AddressBook;


