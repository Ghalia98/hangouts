// import * as IoIcons from "react-icons/io";
// import { IconContext } from 'react-icons'
// import { useState } from 'react';


function GoingBtn(prop) {


    return (
        <>
            {/* <IoIcons.IoAddOutline /> */}
            <button onClick={prop.handleGoingList} className="going btn">Going</button>
        </>
    )
}

export default GoingBtn