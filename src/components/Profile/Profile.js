import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { getUserInfo } from './../../ducks/reducer'
import Header from './../../Header'


import './Profile.css'



class Profile extends Component {
  constructor() {
    super()

    this.state = {
      wannado: [],
      can_do: []
    }
  }


  componentDidMount() {
    this.props.getUserInfo().then( () => {
      this.setState({
        wannado: this.props.user.outdoorwannados,
        can_do: this.props.user.outdoordos
      })
    });
  }


  render() {
    var can_do = this.state.can_do.map((e, i, arr) => {
      return <p className="thingswedo" key={i}> - {e} </p>
  })
    var wannado = this.state.wannado.map((e, i, arr) => {
      return <p className="thingswedo" key={i}> - {e} </p>
  })
  console.log(this.state)
    return (
      <div className='profile-container'>
      
        <Header title='PROFILE'/>
        <div className="profilepic">
          <img src={this.props.user.picture} alt='' />
        </div>
        <div className='button-container'>
          <div className='button-container-child'>
        <div className="user-info">
                <div>
                  <h1 className='name'> {this.props.user.first_name} {this.props.user.last_name} </h1>
                </div>
                <h1> About the User </h1>
                { this.props.user.aboutme ?
                <div className="aboutme">
                  {this.props.user.aboutme}
                </div>
                : <p className="noaboutme"> this user has no about me set up </p> }
                <div className="thingstodo">
                  <div> <h1> Things I do: </h1>
                  <div className="list-dos">
                  {can_do}
                  </div></div>
                  <div>
                  <h1> Things I want to do: </h1>
                  <div className="list-dos">
                  {wannado}
                  </div>
                  </div>
                </div>
                
          </div>
          {/* <Link to='/bag'>
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
            </Link> */}
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
