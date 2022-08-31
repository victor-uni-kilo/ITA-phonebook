import styles from './DisplayContacts.module.scss';


const DisplayContacts = ({contactList, handleDelete}) => {
  
    return (
      <>
        {contactList && 
          contactList.map((item, index) => {
          return (
            <div key={`contactCard-${index}`} className={styles.contactCard}>
              <p>{item.name}</p>
              <p>{item.phoneNumber}</p>
              <button onClick={() => handleDelete(item.id)}>
                <img 
                  src="delete-icon.svg" 
                  alt="delete contact button"
                />
              </button>
            </div>
          )
        })}
      </>
    )
}
export default DisplayContacts;