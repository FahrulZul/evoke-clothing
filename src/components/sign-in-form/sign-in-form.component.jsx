import { useState } from "react";
import { useDispatch } from "react-redux";
import {
    emailSignInStart,
    googleSignInStart,
} from "../../store/user/user.action";
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-fomr.styles.scss";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            setFormFields(defaultFormFields);
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("Incorrect password for email!");
                    break;
                case "auth/user-not-found":
                    alert("No user associated with this email");
                    break;
                default:
                    console.log(error);
            }
        }
    };

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with you email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={email}
                    required
                />

                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={password}
                    required
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button
                        type="button"
                        buttonType="google"
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
