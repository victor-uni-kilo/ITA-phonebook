import { Component } from 'react';
import Messages from '../../components/Messages/Messages';
import styles from './AddContact.module.scss';

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      phoneNumber: null,
    };
  }

  validationObject = {
    hasSpecialCharacters: {
      invalid: false,
      message: "No special characters are allowed."
    },
    wrongPhoneFormat: {
      invalid: false,
      message: "Wrong phone format."
    },
    nameExists: {
      invalid: false,
      message: "This name already exists."
    },
    numberExists: {
      invalid: false,
      message: "This phone number is already exists."
    },
  };
  
  // CONDENSE NUMBER
  formatPhoneNumber = (phoneNumber) => {
    let formattedNumber = phoneNumber.replace(/-|\//g, "");
    return formattedNumber;
  };

  isValidInput = async () => {
    // REGEX 
    const allowedChars = /^(a-z|A-Z|0-9)*[^#$%^&*()']*$/g;
    const phoneNoPattern = /[a-zA-Z&_]/;
    let storageData = await JSON.parse(localStorage.getItem('PHONEBOOK_APP'));

    // BLOCK SPECIAL CHARACTERS
    this.validationObject.hasSpecialCharacters.invalid = !this.state.name.match(allowedChars) || !this.state.phoneNumber.match(allowedChars);

    // CONTROL PHONE FORMAT
    this.validationObject.wrongPhoneFormat.invalid = !!this.state.phoneNumber.match(phoneNoPattern);

    // ENTRY EXISTS
    this.validationObject.nameExists.invalid = storageData && 
      !!storageData.find(obj => obj.name.toLowerCase() === this.state.name.toLowerCase());
    this.validationObject.numberExists.invalid = storageData && 
      !!storageData.find(obj => this.formatPhoneNumber(obj.phoneNumber) === this.formatPhoneNumber(this.state.phoneNumber));
       
    let invalidInput = Object.keys(this.validationObject).some((key) => {
      return this.validationObject[key].invalid === true;
    });
    
    return invalidInput;
  }


  // HANDLERS
  handleSubmit = async (e) => {
    e.preventDefault();

    this.isValidInput();
    
      let dataEntry = {
        id: Math.random().toString(10).slice(2),
        name: this.state.name,
        phoneNumber: this.state.phoneNumber,
      }
      console.log(dataEntry);
  
      this.props.dataHandler && this.props.dataHandler(dataEntry);
  
      this.handleClear(e);

      console.log("entries", {...this.validationObject})
  };

  handleClear = (e) => {
    e.target.reset();
  };

  render() {
    return (
      <>
        <form 
          className={styles.form}
          onSubmit={this.handleSubmit} 
          method="post">

          <label>
            Name 
            <input 
              name="name" 
              type="text"
              placeholder="contact name"
              required
              onChange={e => this.setState({ name: e.target.value })}
            />
          </label>
          {/* <label>Country</label>
          <input type="text" /> */}
          <label>
            Phone Number 
            <input 
              name="phone-number" 
              type="text"
              placeholder="phone number"
              required
              onChange={(e) => this.setState({ phoneNumber: e.target.value })}
            />
          </label>
          <div className='btn-group'>
            <button type='reset' onClick={this.handleClear}>Clear</button>
            <button type='submit'>Add Contact</button>
          </div>
        </form>
        <Messages validationObject={this.validationObject} />
      </>
    )
  }
}
export default AddContact;