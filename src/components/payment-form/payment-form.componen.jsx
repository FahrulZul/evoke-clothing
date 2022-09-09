import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./payment.styles.scss";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
    };

    return (
        <div className="payment-form-container">
            <form className="form-container" onSubmit={paymentHandler}>
                <h3>Credit card payment: </h3>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>
                    Pay Now
                </Button>
            </form>
        </div>
    );
};

export default PaymentForm;
