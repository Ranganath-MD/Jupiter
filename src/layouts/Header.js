import React, { useState } from 'react'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink,
    MDBNavbarToggler, MDBCollapse, MDBContainer, MDBIcon
} from "mdbreact";
import "./header.css"
import { Link } from 'react-router-dom';

const  Header = () => {
    const [navOpen, setNavOpen] = useState(false)

    const toggleCollapse = () => {
        setNavOpen(!navOpen);
    }

    return (
        <MDBNavbar color="black" dark expand="md" className="navbar">
            <MDBContainer>
                <MDBNavbarBrand>
                    <strong className="brand">
                        <Link to="/" className="brand_name">Jupiter</Link>
                    </strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={navOpen} navbar>
                    <MDBNavbarNav right>
                        {/* <MDBNavItem>
                            <MDBNavLink to="/">Home</MDBNavLink>
                        </MDBNavItem> */}
                        <MDBNavItem>
                            <MDBNavLink to="/discover/movie" className="links">Movies</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/discover/tv-shows" className="links">TV Shows</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a href="https://github.com/Ranganath-MD/Jupiter" target="_blank" rel="noopener noreferrer">
                                <MDBIcon fab size="lg" icon="github" className="github" />
                            </a>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Header;