import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getUserInfo } from './../../ducks/reducer'
import Header from './../../Header'

import './Profile.css'



class Profile extends Component {

  componentDidMount() {
    this.props.getUserInfo();
  }


  render() {
    console.log(this.props.user)
    return (
      <div className='profile-container'>

        <Header title='PROFILE'/>
        <div className="profilepic">
          <img src={this.props.user.picture} alt='' />
        </div>
        <div className='button-container'>
          <div className='button-container-child'>
          <Link to='/bag'>
              <button> SAC </button>
            </Link>
            <Link to='outbound/requests'>
              <button> MADE REQUESTS </button>
            </Link>
            <Link to='inbound/requests'>
              <button> RECEIVED REQUESTS </button>
            </Link>
            <Link to='./../Search/Search'>
              <button> SEARCH </button>
            </Link>
            <a href={process.env.REACT_APP_LOGOUT}><button> LOGOUT </button> </a>
          </div>

        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { getUserInfo })(Profile);
