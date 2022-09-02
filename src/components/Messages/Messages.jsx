import styles from './Messages.module.scss';


const Messages = ({validationObject, status}) => {

  let validationArray = [...Object.values(validationObject)];

  return (
    <div className={styles.messageCard}>
      {status === "failure" &&
        <ul>
          {validationArray && validationArray.map((item, index) => item.invalid === true && <li key={`messageCard-${index}`}>{item.message}</li>)}
        </ul>
      }
      {status === "success" && <span>Added Successifuly</span>}
    </div>
  )
}
export default Messages;