import { Link } from 'react-router-dom';

function Navbar() {
    return (        
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <div className="navbar-brand">Palms Park Bridge Club</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Navigation Menu</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item" data-bs-dismiss="offcanvas">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item" data-bs-dismiss="offcanvas">
                                <Link to="/events" className="nav-link">Events</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;