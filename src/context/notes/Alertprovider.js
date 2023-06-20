import AlertContext from "./Alertcontext";
import { useState } from "react";

const AlertProvider = ({ children }) => {

    
  const [alert, setAlert] = useState(null)
    function setAlertParams(message, type) {
        setAlert({
          msg: message,
          type: type,
        })
        setTimeout(() => {
          setAlert(null)
        }, 3000);
      }

    return (
        <AlertContext.Provider value={{alert, setAlertParams}}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertProvider