import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 px-4 border-bottom">
            <Link to="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none" />
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>


            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><Link to="#" className="nav-link px-2 link-secondary" >Home</Link></li>
                <li><Link to="/all-songs" className="nav-link px-2 link-dark" >All songs</Link></li>
                <li><Link to="#" className="nav-link px-2 link-dark" >My songs</Link></li>
                <li><Link to="/create" className="nav-link px-2 link-dark" >Add song</Link></li>
                <li><Link to="#" className="nav-link px-2 link-dark" >Logout</Link></li>
            </ul>

            <div className="col-md-3 text-end">
                <button type="button" className="btn btn-outline-primary me-2"><Link to="/login">Login</Link></button>
                <button type="button" className="btn btn-outline-primary me-2"><Link to="/register">Sign-up</Link></button>
            </div>
        </header>
    )

}

export default Header;