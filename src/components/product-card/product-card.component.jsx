import "./product-card.styles.scss";
import Button from "../button/button.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, price, imageUrl } = product;

    const handleAddToCart = () => {
        dispatch(addItemToCart(cartItems, product));
    };

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">RM{price}</span>
            </div>
            <Button buttonType="inverted" onClick={handleAddToCart}>
                Add to cart
            </Button>
        </div>
    );
};

export default ProductCard;
