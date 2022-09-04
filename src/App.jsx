// import logo from './logo.svg';
import AddContact from './components/AddContact/AddContact.jsx';
import {useState} from 'react';
import './App.scss';
import DisplayContacts from './components/DisplayContacts/DisplayContacts.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';

function App() {

  // INITATE DATA
  const [data, setData] = useState(JSON.parse(localStorage.getItem('PHONEBOOK_APP')));
  const [filteredData, setFilteredData] = useState(null);

  // HANDLERS
  const handleData = async (data) => {
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

  const handleFilter = (keyword) => {
    setFilteredData(data.filter( contact => contact.name.includes(keyword)));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1><span>simpl</span>PhoneBook</h1>
        <hr />
        <SearchBar filterContacts={handleFilter} />
      </header>
      <AddContact dataHandler={handleData}/>
      <hr />
      <DisplayContacts 
        contactData={data}
        filteredData={filteredData}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
