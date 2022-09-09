import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Error! Password not same");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));

            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use.");
            } else {
                console.log("User creation encountered an error", error);
            }
        }
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    name="displayName"
                    onChange={handleChange}
                    value={displayName}
                    autoComplete="off"
                    required
                />

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

                <FormInput
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={confirmPassword}
                    required
                />
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
