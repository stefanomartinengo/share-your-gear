import React, { Component } from 'react';
import './Header.css';
import logo from './assets/-rendition;size=1200;version=0.png';
import { Link } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EnhancedButton from 'material-ui/internal/EnhancedButton'
import ContentFilter from 'material-ui/svg-icons/content/filter-list'
import dropDown from './assets/equal.png'
import backpack from './assets/backpack.png'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      valueSingle: '1'
    }

  }


  handleChangeSingle = (event, value) => {
    this.setState({
      valueSingle: value,
    })
  }

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    });
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    });
  }

  render() {
    EnhancedButton.defaultProps.disableTouchRipple = true;
    //gets rid of ugly on touch black highlight
    return (
      <div className='main-header'>

        <Link to='/search'>{<img src={backpack} alt='' />}</Link>
        <h1> {this.props.title} {this.props.image} </h1>
        <div className='new-dropdown'>
          <div>
            <IconMenu anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              className='icon' iconButtonElement={<IconButton
                disableTouchRipple={true}
              > <img className='dropdownimg' src={dropDown} /> </IconButton>}
              onChange={this.handleChangeSingle}
              onExited={this.handleChangeSingle}
              value={this.state.valueSingle}
            >
              <Link to='/search'><MenuItem value="1" primaryText="Search" /></Link>
              <Link to='/profile'><MenuItem value="2" primaryText="Profile" /></Link>
              <Link to='/bag'>

                {/* NESTED MENU */}
                <MenuItem value="3" primaryText="Sac" menuItems=
                  {[
                    <Link to='/bag/view'>
                      <MenuItem primaryText='View Sac' value='4' />
                    </Link>,
                    <Link to='/bag/add'>
                      <MenuItem primaryText='Add To Sac' value='5' />
                    </Link>]} />
              </Link>
              {/* NESTED MENU */}
              <Link to='inbound/requests'>
                {/* NESTED MENU */}
                <MenuItem onClick={this.value = '5'} value='6' primaryText="Requests" menuItems={[
                  <Link to='/inbound/requests'>
                    <MenuItem primaryText="Inbound Requests" value="7" />
                  </Link>,
                  <Link to='/outbound/requests'>
                    <MenuItem value="8" primaryText="Outbound Requests" />
                  </Link>
                ]} />
              </Link>
              {/* NESTED MENU */}
              <Link to='/inbox'>
                    <MenuItem value="9" primaryText="Inbox" />
                  </Link>
            </IconMenu>

          </div>
        </div>
      </div>
    )
  }
}

