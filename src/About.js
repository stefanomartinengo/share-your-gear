import React from 'react';
import Header from './Header';
import './About.css'

export function About() {

    return (
        <div>
            <Header title = 'About' />
            <div> <h1 className = 'h1'> What This Is </h1> </div>
            <div> <h2 className = 'h2'> A platform for sharing outdoor gear with your neighbors </h2> </div>
            <div> <h3 className = 'h1'> What started this </h3>  </div>
            <div></div>
            <h1 className = 'h1'> How To Use </h1>
        </div>
    )
}