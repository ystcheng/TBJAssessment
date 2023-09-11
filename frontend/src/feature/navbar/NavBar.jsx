import React, { useState } from "react";
import { Navigate, NavLink as RRNavLink, useNavigate } from "react-router-dom";
import { NavLink, Navbar, NavItem, NavbarBrand, NavbarToggler, Collapse, Nav, Container } from "reactstrap";
import './style.css'
import logo from '../../assets/img/homebase-logo.png'

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open)
  }

  const classNameFunc = ({ isActive }) => (isActive ? "active": "")

  return (
    <div style={{ background: "#204377"}}>
      <Container>
        <Navbar style={{}} dark expand="md">
          <NavbarBrand>
            <img src={logo} className="navbar-logo" alt="" />
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={open} navbar>
            <Nav className="ms-auto" navbar>
              <NavItem>
                <NavLink 
                  tag={RRNavLink} 
                  exact={true} 
                  to="/" 
                  className={classNameFunc}
                  onClick={() => window.location = "/"}
                > 
                  Teams
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} exact to="/leaderboard" className={classNameFunc}>Leaderboards</NavLink>
              </NavItem>
            </Nav>
          </Collapse>

        </Navbar>
      </Container>
    </div>
  )
}

export default NavBar