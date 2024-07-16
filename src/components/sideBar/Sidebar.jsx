import React from 'react'
import "./style.css"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BugIcon from '@mui/icons-material/PestControl';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const SideBar = ({isVisible,onClose}) => {

  
  
  return (
    <div className={`sidebar ${isVisible ? 'visible' : ''}`}>
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
          <DarkModeIcon className='icon'/>
          Night mode
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