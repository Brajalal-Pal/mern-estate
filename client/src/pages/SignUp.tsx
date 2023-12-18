import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSnackbar } from 'notistack';

import styles from "./styles.module.css";


function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
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

    const saveSignupDetails = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        const data = {
            username: username,
            email: email,
            password: password
        }

        axios.post("/api/v1/users/signup", data)
            .then(_response => {
                enqueueSnackbar('You have been successfully registered!', { variant: "success", autoHideDuration: 3000, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
                setLoading(false);
                // clear the form
                setUsername("");
                setEmail("");
                setPassword("");
            })
            .catch(err => {
                enqueueSnackbar(`${err?.response?.data?.message}`, { variant: "error", autoHideDuration: 3000, anchorOrigin: { vertical: 'top', horizontal: 'center' } });
                setLoading(false);
            })
    }

    return (
        <div className={styles.signup_container}>
            <h1>Sign Up</h1>
            <form onSubmit={saveSignupDetails}>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' placeholder="Username" value={username} onChange={onChangeHandler} required />
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' placeholder="Email" value={email} onChange={onChangeHandler} required />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' placeholder="Password" value={password} onChange={onChangeHandler} required />
                <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<PersonAddIcon />}
                    variant="contained"
                    type='submit'
                >
                    Sign Up
                </LoadingButton>
            </form>
            <div style={{ marginTop: "10px" }}>
                Have an account? <span style={{ color: "darkblue", fontWeight: "bold" }}><Link to={"/sign-in"}>Sign In</Link></span>
            </div>
        </div>
    )
}

export default SignUp
