import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./styles.module.css";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        switch (id) {
            case "username":
                setUsername(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const saveSignupDetails = () => {
        const data = {
            username: username,
            email: email,
            password: password
        }
        console.log(data);

        const url = `http://localhost:5001/api/v1/users/signup`;
        axios.post(url, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className={styles.signup_container}>
            <h1>Sign Up</h1>
            <form>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' placeholder="Username" value={username} onChange={onChangeHandler} />
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' placeholder="Email" value={email} onChange={onChangeHandler} />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' placeholder="Password" value={password} onChange={onChangeHandler} />
                <button type="button" style={{ backgroundColor: "darkgreen" }} onClick={saveSignupDetails}>Sign Up</button>
                <button type="button" style={{ backgroundColor: "maroon" }}>Continue with Google</button>
            </form>
            <div style={{ marginTop: "10px" }}>
                Have an account? <span style={{ color: "darkblue", fontWeight: "bold" }}><Link to={"/sign-in"}>Sign In</Link></span>
            </div>
        </div>
    )
}

export default SignUp
