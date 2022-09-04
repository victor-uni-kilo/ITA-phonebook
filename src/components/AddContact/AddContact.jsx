import { Component } from 'react';
import Messages from '../../components/Messages/Messages';
import styles from './AddContact.module.scss';
// import { API_URL } from '../../constants/APIurl';
import phoneCodes from '../../constants/phoneCodes.json';

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      phoneNumber: null,
      phoneCode: null,
      submitStatus: null
    };
  }

  // VALIDATION
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
      message: "This phone number already exists."
    },
  };

  // FETCH PHONE CODE - GET API KEY FIRST
  // fetchPhoneCodes = () => {
  //   fetch('API_URL', {
  //     method: "GET",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => console.log(error));
  // };

  // HELPERS
  flattenPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/-|\//g, "");
  };

  formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber[0] === '0') {
      phoneNumber = phoneNumber.substring(1);
    }
    if (phoneNumber.indexOf(' ') >= 0 ) {
      phoneNumber = phoneNumber.replace(/ /g, "");
    }
    return phoneNumber;
  };

  // VALIDATION FUNCTION
  validateInput = async () => {
    // REGEX 
    const allowedChars = /^(a-z|A-Z|0-9)*[^#$%^&*+()']*$/g;
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
      !!storageData.find(obj => {

        console.log("OBJ COMPARISON:", this.flattenPhoneNumber(obj.phoneNumber), this.flattenPhoneNumber(this.formatPhoneNumber(this.state.phoneNumber)));

        let phoneMatch = this.flattenPhoneNumber(obj.phoneNumber) === this.flattenPhoneNumber(this.formatPhoneNumber(this.state.phoneNumber));
        let phoneCodeMatch = obj.phoneCode === this.state.phoneCode;

        console.log('obj.phoneNumber', phoneMatch);
        console.log('MATCHED', !!phoneMatch, !!phoneCodeMatch);

        return !!phoneMatch && !!phoneCodeMatch;
      })

    console.log('validation OBJ', this.validationObject);
    console.log('validation OBJ numExists', this.validationObject.numberExists);

    let validInput = !Object.keys(this.validationObject).some((key) => {
      return this.validationObject[key].invalid === true;
    });

    return validInput;
  }

  // HANDLERS
  handleClear = (e) => {
    e.target.reset();
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = await this.validateInput();

    if (isValid === true) {

      // FORMAT FULL PHONE NUMBER
      
      let dataEntry = {
        id: Math.random().toString(10).slice(2),
        name: this.state.name,
        phoneNumber: this.formatPhoneNumber(this.state.phoneNumber),
        phoneCode: this.state.phoneCode
      }
  
      this.props.dataHandler && this.props.dataHandler(dataEntry);

      this.setState({ submitStatus: "success"});

    } else {

      this.setState({ submitStatus: "failure"});

    }

    this.handleClear(e);
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
          <label> County Code
            <select 
              name="phoneCode"
              onChange={e => this.setState({ phoneCode: e.target.value })}
            >
              <option value="">--</option>
              {phoneCodes && Object.entries(phoneCodes).map( ([key, value], index) => 
                value && 
                  <option key={`option-${index}`}value={value}>
                    {`${key} (+${value})`}
                  </option>
              )}
            </select>
          </label>
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
          <div className={styles.btnGroup}>
            <button type='submit'>Add Contact</button>
            <button type='reset' onClick={this.handleClear}>Clear</button>
          </div>
        </form>

        <Messages validationObject={this.validationObject} status={this.state.submitStatus} />
      </>
    )
  }
}
export default AddContact;