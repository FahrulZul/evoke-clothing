import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as EvokeLogo } from "../../assets/svg/evoke-logo.svg";
import "./navigation.styles.scss";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const currentUser = useSelector(selectCurrentUser);

    const signOutUser = () => dispatch(signOutStart());

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
                    {currentUser ? (
                        <span className="nav-link" onClick={signOutUser}>
                            SIGN OUT
                        </span>
                    ) : (
                        <Link to="auth" className="nav-link">
                            SIGN IN
                        </Link>
                    )}
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
