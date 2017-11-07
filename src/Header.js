import React, { Component } from 'react';
import './Header.css';
import logo from './assets/-rendition;size=1200;version=0.png';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu'

export function Header(props) {

  return (
    <div className='main-header'>
      
      <Link to='/search'>{<img src={logo} alt='' />}</Link>
      <h1> {props.title} </h1>
      <MuiThemeProvider>
        <DropDownMenu className='dropdown-menu'>
          <Link to='/search'><p> Search Sacs </p> </Link>
          <Link to='/profile'><p> Profile </p> </Link>
          <Link to='/inbound/requests'><p> Inbound Requests </p> </Link>
          <Link to='/outbound/requests'><p> Outbound Requests </p> </Link>
          <Link to='/bag'><p> Sac </p> </Link>
        </DropDownMenu>
      </MuiThemeProvider>
    </div>
  )
}

export default Header
