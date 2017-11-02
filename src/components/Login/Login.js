import React, { Component } from 'react'
import './Login.css';


export class Login extends Component {
  render() {
    return (
      <main className='main_background'>
        <div className='box_position'>
          <section className='login_box'>
            <div className='logo'></div>
            <div className='helo'>GET OUTSIDE</div>
            <a href={process.env.REACT_APP_LOGIN}>
              <button className='login_button'>LOGIN</button>
            </a>
          </section>
        </div>
      </main>
    )
  }
}

export default Login
