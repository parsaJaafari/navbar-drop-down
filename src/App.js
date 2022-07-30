import React, { useState } from 'react';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { CSSTransition } from 'react-transition-group';

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState('main');

  const [menuHeight, setMenuHeight] = useState(null);

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const DropdownItem = (props) => {
    return (
      <a href="#" className="menu-item" onClick={() => props.gotoProps && setActiveMenu(props.gotoProps)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  };

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        onEnter={calcHeight}
        in={activeMenu === 'main'}
        timeout={300}
        classNames="menu-primary"
        unmountOnExit
      >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem gotoProps="settings" rightIcon={<CogIcon />} leftIcon={<ChevronIcon />}>
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        onEnter={calcHeight}
        in={activeMenu === 'settings'}
        timeout={300}
        classNames="menu-secondary"
        unmountOnExit
      >
        <div className="menu">
          <DropdownItem gotoProps="main">My Profile</DropdownItem>
          <DropdownItem rightIcon={<CogIcon />} leftIcon={<ChevronIcon />}>
            Some 2 side Icon
          </DropdownItem>
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem rightIcon={<CogIcon />} leftIcon={<ChevronIcon />}>
            Some 2 side Icon
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

const Navbar = ({ children }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{children}</ul>
    </nav>
  );
};

const NavItem = (props) => {
  const [open, setOpen] = useState(false);

  console.log(props.children && open);

  return (
    <li className="nav-item">
      <a className="icon-button" onClick={() => setOpen(!open)} href="#">
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
};

const App = () => {
  return (
    <Navbar>
      <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />

      <NavItem icon={<CaretIcon />}>
        <DropdownMenu />
        {/* todo give this an option prop to whether be a multi dimensional or not */}
      </NavItem>
    </Navbar>
  );
};

export default App;
