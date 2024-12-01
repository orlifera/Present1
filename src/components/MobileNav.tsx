import { NavLink } from 'react-router-dom';

const MobileNav = () => {
    return (
        <nav id='mobile-nav' className='navbar'>
            <ul className='nav-list'>
                <li className='nav-li'><NavLink className='link nav-link' to="/">Home</NavLink></li>
                <li className='nav-li'><NavLink className='link nav-link' to="/gallery">Gallery</NavLink></li>
                <li className='nav-li'><NavLink className='link nav-link' to="/wish">Wishlist</NavLink></li>
            </ul>
        </nav>
    );
}

export default MobileNav;