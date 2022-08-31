// import logo from './logo.svg';
import AddContact from './components/AddContact/AddContact.jsx';
import {useState} from 'react';
import './App.scss';
import DisplayContacts from './components/DisplayContacts/DisplayContacts.jsx';

function App() {

  // INITATE DATA
  const [data, setData] = useState(JSON.parse(localStorage.getItem('PHONEBOOK_APP')));
  
  // HANDLERS
  const dataHandler = async (data) => {
    let postData = [];
    let storageData = await JSON.parse(localStorage.getItem('PHONEBOOK_APP'));
    if (storageData) {
      postData = storageData;
    } 

    postData.push(data);

    try {
      localStorage.setItem('PHONEBOOK_APP', JSON.stringify(postData));
      setData(postData);

    } catch (error) {
      console.log(error);
    }
   
  }
  
  const handleDelete = (contactId) => {
    const filteredData = data.filter( contact => contact.id !== contactId);

    localStorage.setItem('PHONEBOOK_APP', JSON.stringify(filteredData));
    setData(filteredData);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>myPhoneBook</h1>
      </header>
      <AddContact dataHandler={dataHandler}/>
      <DisplayContacts 
        contactList={data} 
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
