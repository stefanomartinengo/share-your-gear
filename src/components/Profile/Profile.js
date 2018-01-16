import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUserInfo } from './../../ducks/reducer'
import Header from './../../Header'


import './Profile.css'



class Profile extends Component {
  constructor() {
    super()

    this.state = {
      wannado: [],
      can_do: [],
      pageToggle: false
    }
    this.editPageToggle = this.editPageToggle.bind(this)
  }


  componentDidMount() {
    this.props.getUserInfo().then( () => {
      this.setState({
        wannado: this.props.user.outdoorwannados,
        can_do: this.props.user.outdoordos
      })
      this.refs.first_name.value = this.props.user.first_name
      this.refs.last_name.value = this.props.user.last_name
      this.refs.aboutme.value = this.props.user.aboutme
    })
  }

  editPageToggle() {
    this.setState({ pageToggle: !this.state.pageToggle })

  }

  render() {
    console.log(this.user)
    var can_do = this.state.can_do.map((e, i, arr) => {
      return <input disabled={this.state.pageToggle ? false : true} className="thingswedo" key={i} value={e} /> 
  })
    var wannado = this.state.wannado.map((e, i, arr) => {
      return <input disabled={this.state.pageToggle ? false : true} className="thingswedo" key={i} value={e} />
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
                <div className='nameprofile'>
                <input disabled={this.state.pageToggle ? false : true} ref='first_name' /> 
                <input ref='last_name' disabled={this.state.pageToggle ? false : true} />
                </div>
                <h1> About the User </h1>
                <div className="aboutme">
                  <input className='name' disabled={this.state.pageToggle ? false : true} ref='aboutme' />
                </div>
                
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
                  <button className='uh' onClick={() => { this.editPageToggle() }}> Edit Page </button>
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
