import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as EvokeLogo } from "../../assets/svg/evoke-logo.svg";
import "./navigation.styles.scss";

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link to="/" className="logo-container">
                    <EvokeLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link to="shop" className="nav-link">
                        SHOP
                    </Link>
                    <Link to="sign-in" className="nav-link">
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
