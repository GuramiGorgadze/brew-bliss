import React from 'react'

function Account() {
  return (
    <div className='account'>
      <div className="account-title">
        <h2 className="account-title__text">ACCOUNT</h2>
        <div className="account-title__line"></div>

        <div className="account-info">
          <div className="account-info__pages">

          </div>

          <div className="account-info__details">
            <h4 className='account-info__details--title'>Account details:</h4>

            <table>
              <tr>
                <th>Name</th>
              </tr>
              <tr>
                <th>Country:</th>
              </tr>
              <tr>
                <th>E-Mail:</th>
              </tr>
              <tr>
                <th>Phone</th>
              </tr>
              <tr>
                <th>City:</th>
              </tr>
              <tr>
                <th>Zip:</th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account