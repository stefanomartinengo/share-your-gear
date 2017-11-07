import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './bag.css'
import { connect } from 'react-redux'
import { getUserInfo} from './../../ducks/reducer'
import Header from './../../Header'

export class Bag extends Component {


  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    return (
      <div className='container'>
        <Header title='SNAG MY SAC'/>
         <div className="profilepic">
          <img src={this.props.user.picture} alt='' />
        </div>
        <div className='button-container'>

          <div className='button-container-child'>
          <Link to='/bag/view'>
              <button> VIEW BAG </button>
            </Link>
            <Link to='bag/add'>
              <button> ADD TO BAG </button>
            </Link>

          <Link to='/profile'> <button> BACK </button></Link>
</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {getUserInfo})(Bag)
