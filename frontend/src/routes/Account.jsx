import React from 'react'
import { useUserData } from '../context/UserContext.jsx'
import { InstagramPromo } from '../components'

import { Link } from 'react-router-dom'

function Account() {
  const { logout, userData } = useUserData()

  return (
    <div className='account'>
      <div className='account__header'>
        <h2 className='account__title'>ACCOUNT</h2>
        <div className='account__divider'></div>
      </div>

      <div className='account__body'>
        <div className='account__nav'>
          <p className='account__nav-welcome'>
            <span className='orange'>Welcome</span> {userData?.firstName} {userData?.lastName}
          </p>

          <div className='account__nav-links'>
            <button className='account__nav-btn'><i className="bi bi-list-ul"></i>Dashboard</button>
            <button className='account__nav-btn'><i className="bi bi-bag-check"></i>CHECK OUT</button>
            <Link to="/account/address">
              <button className='account__nav-btn'><i className="bi bi-geo-alt"></i>EDIT ADDRESS</button>
            </Link>
            <button className='account__nav-btn'><i className="bi bi-heart"></i>VIEW WISHLIST (0)</button>
            <button className='account__nav-btn account__nav-btn--logout' onClick={logout}>
              <i className="bi bi-box-arrow-right"></i>LOGOUT
            </button>
          </div>
        </div>

        <div className='account__details'>
          <h4 className='account__details-title'>Account details:</h4>

          <table className='account__table'>
            <tbody>
              <tr className='account__table-row'>
                <th className='account__table-header'>Name</th>
                <td className='account__table-data'>
                  {userData?.address?.firstName} {userData?.address?.lastName}
                </td>
              </tr>
              <tr className='account__table-row'>
                <th className='account__table-header'>Country</th>
                <td className='account__table-data'>{userData?.address?.country}</td>
              </tr>
              <tr className='account__table-row'>
                <th className='account__table-header'>E-Mail</th>
                <td className='account__table-data'>{userData?.email}</td>
              </tr>
              <tr className='account__table-row'>
                <th className='account__table-header'>Phone</th>
                <td className='account__table-data'>{userData?.address?.phone}</td>
              </tr>
              <tr className='account__table-row'>
                <th className='account__table-header'>City</th>
                <td className='account__table-data'>{userData?.address?.city}</td>
              </tr>
              <tr className='account__table-row'>
                <th className='account__table-header'>Zip</th>
                <td className='account__table-data'>{userData?.address?.zip}</td>
              </tr>
              <tr className='account__table-row'>
                <th className='account__table-header'>Address</th>
                <td className='account__table-data'>{userData?.address?.address}</td>
              </tr>
              <tr className='account__table-row'>
                <th className='account__table-header'>Address 2</th>
                <td className='account__table-data'>{userData?.address?.address2}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <InstagramPromo />
    </div>
  )
}

export default Account