import styles from './SearchBar.module.scss';


const SearchBar = ({filterContacts}) => {

  const handleOnChange = (e) => {
    filterContacts && filterContacts(e.target.value);
  }

  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder='SEARCH CONTACTS ...' onChange={handleOnChange}/>
    </div>
  )
}

export default SearchBar;