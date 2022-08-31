import styles from './Messages.module.scss';


const Messages = ({validationObject}) => {

  let validationArray = [...Object.values(validationObject)];
  console.log('HERE', validationArray);

  return (
    <div className={styles.contactCard}>
      <ul>
        {validationArray && validationArray.map((item, index) => item.invalid === true && <li key={`messageCard-${index}`}>{item.message}</li>)}
      </ul>
    </div>
  )
}
export default Messages;