import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Navigate } from "react-router-dom";
import Notification from "../components/common/Notification";
import useNotification from "../hooks/useNotification";
import LoadingButton from "../components/admin/common/LoadingButton";
import "./Login.css";

function Login() {

    const navigate = useNavigate();
    const {
        notification,
        showNotification,
    } = useNotification();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const res = await login(form);

            localStorage.setItem("token", res.token);

            showNotification(
                "Login Successful",
                "success"
            );

            setTimeout(() => {

                navigate("/admin");

            }, 700);

        }

        catch (err) {

            showNotification(
                err.response?.data?.message || "Login Failed",
                "error"
            );

        }

        finally {

            setLoading(false);

        }

    };


    if (localStorage.getItem("token")) {
        return <Navigate to="/admin" replace />;
    }

    return (

        <div className="loginPage">

            <div className="loginCard">

                <h1>Portfolio Admin</h1>

                <p>Sign in to continue</p>

                <form onSubmit={handleSubmit} className="loginForm">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <LoadingButton
                        loading={loading}
                        text="Login"
                        loadingText="Signing In..."
                        type="submit"
                    />

                </form>

            </div>

            <Notification
                visible={notification.visible}
                message={notification.message}
                type={notification.type}
            />
        </div>

    );

}

export default Login;