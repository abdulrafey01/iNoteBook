import React from 'react'

export default function Alert(props) {
    function capitalize(str) {
        let newStr = str.charAt(0).toUpperCase() + str.slice(1)
        return newStr
    }
    return (
        <div style={{ height: 50 }}>
            {props.alert &&
                <>
                    <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                        <strong>{capitalize(props.alert.type)}  </strong>{props.alert.msg}
                    </div>
                </>
            }
        </div>
    )
}