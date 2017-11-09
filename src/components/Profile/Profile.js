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
              <button> BAG </button>
            </Link>
            <Link to='outbound/requests'>
              <button> SENT REQUESTS </button>
            </Link>
            <Link to='inbound/requests'>
              <button> INCOMING REQUESTS </button>
            </Link>
            <Link to='./../Search/Search'>
              <button> SEARCH </button>
            </Link>
            <a href={'/auth/logout'}><button> LOGOUT </button> </a>
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
