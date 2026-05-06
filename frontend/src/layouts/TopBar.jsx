import React from 'react'
import phoneIcon from '../assets/phone-icon.svg'
import flagEN from '../assets/flag-en.webp'

function TopBar() {
    return (
        <div className='top-bar'>
            <div className="top-bar__contact">
                <img src={phoneIcon} alt="" draggable="false" /> <p>(995) 557 70 40 22</p>
            </div>

            <div className="top-bar__promo">
                <p>Free Shipping on Orders of $49+</p>
            </div>

            <div className="top-bar__region">
                <div className='top-bar__language'><img src={flagEN} alt="" /> <p>English</p></div>
                <div className='top-bar__divider'></div>
                <p>United States(USD $)</p>
            </div>
        </div>
    )
}

export default TopBar