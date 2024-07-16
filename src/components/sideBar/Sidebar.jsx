import React, { useEffect, useRef, useState } from 'react'
import "./style.css"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BugIcon from '@mui/icons-material/PestControl';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import gsap from 'gsap';
import chatIcon from "../../assets/chatIcon.jpg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const SideBar = ({isVisible,onClose,chat,isDarkMode,toggleDarkMode}) => {
  const sidebarRef = useRef(null);

  

  
  useEffect(() => {
    if (isVisible) {
      gsap.to(sidebarRef.current, {
        duration: 0.3,
        x: 0,
        opacity: 1,
        ease: 'power3.out',
      });
    } else {
      gsap.to(sidebarRef.current, {
        duration: 0.3,
        x: '-100%',
        opacity: 0,
        ease: 'power3.in',
      });
    }
  }, [isVisible]);
  
  return (
    <div ref={sidebarRef} className={`sidebar ${isVisible ? 'visible' : ''}  ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className='sideBar-header'>
        <div className='sideBar-top-header'>
         <img src={chatIcon} alt=""  />  
         {isDarkMode ? (
            <LightModeIcon fontSize='large' onClick={toggleDarkMode} /> 
          ) : (
            <DarkModeIcon fontSize='large' onClick={toggleDarkMode} /> 
          )}
        </div>  
        <div className='sideBar-bottom-header'>
          <div className='sideBar-bottom-header-left'>
          <h3>Rayyan Akhter</h3>
          <p >+91 9675070725</p>
          </div>
          
            <ExpandMoreIcon fontSize='large'/>
          
        </div>
       </div>
      <ul className='list' >

        <li>
          <BookmarkBorderIcon  className='icon'/>
          Saved Messages</li>
        <li>
          <PermIdentityIcon  className='icon'/>
          Contacts</li>
        <li>
          <SlowMotionVideoIcon className='icon'/>
          My Stories</li>
        <li>
          <SettingsIcon className='icon'/>
          Setting</li>
        <li>
        {isDarkMode ? (
            <LightModeIcon className='icon' />
          ) : (
            <DarkModeIcon className='icon' />
          )}
          {isDarkMode ? 'Light mode' : 'Night mode'}
        </li>
        <li>
          <HelpOutlineIcon className='icon'/>
          Telegram Features</li>
        <li>
          <BugIcon className='icon'/>
          Report Bug</li>
        <li>
          <i className='icon'>K</i>
          Switch to K Version</li>
        <li>
          <AddCircleOutlineIcon className='icon'/>
          Install App</li>
      </ul>
        <footer>Telegram Web A 10.9.7</footer>
    </div>
  )
}

export default SideBar