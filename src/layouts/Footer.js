import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import "./footer.css"
const Footer = () => {
    return (
        <MDBFooter color="black" className="font-small pt-0 mt-0">
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com">Built by Ranganath </a>
                    </MDBContainer>
                </div>
        </MDBFooter>
    );
}

export default Footer;
