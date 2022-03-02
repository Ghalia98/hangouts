import { React } from 'react'
import './EventCreatePopup.css'
import closeIcon from '../closeIcon.png'


function EventCreatePopup(props) {
    return ((props.trigger) && (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>
                    <img src={closeIcon} alt="close icon" />
                </button>
                {props.children}
            </div>
        </div>
    )
    )
}

export default EventCreatePopup