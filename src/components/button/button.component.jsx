import "./button.styles.scss";

export const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted",
    payment: "payment",
};

const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
    return (
        <button
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            disabled={isLoading}
            {...otherProps}
        >
            {isLoading ? <div className="spinner-inButton"></div> : children}
        </button>
    );
};

export default Button;
