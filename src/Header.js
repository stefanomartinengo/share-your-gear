import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import EnhancedButton from 'material-ui/internal/EnhancedButton'
import dropDown from './assets/equal.png'
import backpack from './assets/backpack.png'
import Divider from 'material-ui/Divider';

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
              > <img className='dropdownimg' src={dropDown} alt=''/> </IconButton>}
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
                    <MenuItem primaryText="Received Requests" value="7" />
                  </Link>,
                  <Link to='/outbound/requests'>
                    <MenuItem value="8" primaryText="Made Requests" />
                  </Link>
                ]} />
              </Link>
              {/* NESTED MENU */}
              <Link to='/inbox'>
                    <MenuItem value="9" primaryText="Inbox" />
                  </Link>
                  <Link to='/meetup/add'>
                    <MenuItem value = '11' primaryText='Add Trip'/>
                  </Link>
                  <Divider />
                  <a href={process.env.REACT_APP_LOGOUT}>
                  <MenuItem value="10" primaryText="Logout" />
                  </a>
            </IconMenu>

          </div>
        </div>
      </div>
    )
  }
}

