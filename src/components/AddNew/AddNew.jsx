import { Component } from 'react';
import styles from './AddNew.module.scss';

class AddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      phoneNumber: null,
    };
  }


  // HANDLERS
  handleSubmit = async (e) => {
    e.preventDefault();
    
    let dataEntry = {
      id: "id" + Math.random().toString(16).slice(2),
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
    }

    console.log(dataEntry);

    this.props.dataHandler && this.props.dataHandler(dataEntry);

    this.handleClear(e);
  }

  handleClear = (e) => {
    e.target.reset();
  }

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
      </>
    )
  }
}
export default AddNew;