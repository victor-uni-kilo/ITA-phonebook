import cx from "classnames";
import styles from './Messages.module.scss';
import {useRef, useEffect} from 'react';

const Messages = ({validationObject, status}) => {

  let validationArray = [...Object.values(validationObject)];
  const wrapperRef = useRef(null);

  useEffect(() => {
    status && wrapperRef.current.classList.add(status === "success" ? styles.success : styles.danger);
  
  }, [status])
  

  return (
    <div 
      className={styles.messageCard}
      ref={wrapperRef}
    >
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