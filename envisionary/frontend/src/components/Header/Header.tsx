import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../App';
import { AppTheme } from '../../AppTheme';
import ThemeToggle from '../ThemeToggle';
import './Header.css'

function Header() {
  const { theme } = useContext(ThemeContext);

  // Ensure that the body has the same color depending on theme
  useEffect(() => {
    const body = document.getElementsByTagName("body");
    if (theme === 'dark') {
      body[0].style.backgroundColor = '#101d28';
    } else {
      body[0].style.backgroundColor = '#dfe9f2';
    }
  },[theme]);

  return (
    <header>
      <nav className='header' style={{backgroundColor: '#172a3a'}}>
        <div id="logoContainer"><Link id='logoLink' to="/">ENVISIONARY</Link></div>
          <div className='linkContainer'>
            <div className='link'><ThemeToggle /></div>
            <Link className='link' to="/">Countries</Link>
            <Link className='link' to="/info-page">Information</Link>
          </div>
      </nav>
    </header>
  );
}
export default Header