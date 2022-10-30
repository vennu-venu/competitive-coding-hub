import { NavbarLeft } from 'responsive-navbar-react'
import 'responsive-navbar-react/dist/index.css'
import React from "react";

function NavBar() {
  const props = {
    items: [
      {
        text: 'Home',
        link: '/home'
      },
      {
        text: 'New Post',
        link: '/new-post'
      },
      {
        text: 'My Posts',
        link: '/my-posts'
      },
      {
        text: 'Profile',
        link: '/profile/' + localStorage.getItem("cch-user-username")
      },
      {
        text: 'Sign out',
        link: '/sign-out'
      }
    ],
    logo: {
      text: 'CCH'
    },
    style: {
      logoStyles: {
        color: '#308d50',
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        fontWeight: '400',
        fontSize: '2em',
        padding: '20px',

      },
      barStyles: {
        background: 'black',
        boxShadow: 'none',
        color: 'whitesmoke',
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        fontWeight: '200',
        fontSize: '1.2em',
        justifyContent: 'center'
      },
      sidebarStyles: {
        background: '#1c1c1c',
        buttonColor: 'whitesmoke',
        boxShadow: 'none',
        color: 'whitesmoke',
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        fontWeight: '200',
        fontSize: '1.1em',
        paddingTop: '20px'
      },
      linkStyles: {
        color: 'whitesmoke',
        marginLeft: '10px',
        marginRight: '20px'
      },
    },
    align:'left'
  }



  return (
    <div style={{padding: '20px 10px', position: 'sticky', top: '0px', background: 'black', zIndex: '100'}}>
    	<NavbarLeft {...props}/>
    </div>
  )
}

export default NavBar;