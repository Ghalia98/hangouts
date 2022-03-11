import React from 'react';

function GoingList(prop) {
    // console.log(prop.event.goingList)

    return (
        <div>
            <h3>Going </h3>
            {prop.event === null ? 'Loading' :
                <>
                    {prop.event.goingList.map((guest, index) => {
                        return <li key={index}>{guest}</li>
                    })}
                </>
            }

        </div>
    )
}

export default GoingList