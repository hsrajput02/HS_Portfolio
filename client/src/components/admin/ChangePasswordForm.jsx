import { useState } from "react";

import { useNavigate } from "react-router-dom";

import AdminForm from "./common/AdminForm";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

import { changePassword } from "../../services/authService";

function ChangePasswordForm() {

    const navigate = useNavigate();

    const {

        notification,

        showNotification,

    } = useNotification();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await changePassword(formData);

            showNotification(

                "Password Updated Successfully",

                "success"

            );

            setTimeout(() => {

                localStorage.removeItem("token");
                localStorage.removeItem("admin");

                navigate("/admin/login", {
                    replace: true,
                });

            }, 1500);

        }

        catch (error) {

            showNotification(

                error.response?.data?.message ||

                "Failed to update password.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>

            <AdminForm

                title="Change Password"

                onSubmit={handleSubmit}

                buttonText="Update Password"

                loading={loading}

                loadingText="Updating..."

            >

                <input

                    type="password"

                    name="currentPassword"

                    placeholder="Current Password"

                    value={formData.currentPassword}

                    onChange={handleChange}

                />

                <input

                    type="password"

                    name="newPassword"

                    placeholder="New Password"

                    value={formData.newPassword}

                    onChange={handleChange}

                />

                <input

                    type="password"

                    name="confirmPassword"

                    placeholder="Confirm Password"

                    value={formData.confirmPassword}

                    onChange={handleChange}

                />

            </AdminForm>

            <Notification

                visible={notification.visible}

                message={notification.message}

                type={notification.type}

            />

        </>

    );

}

export default ChangePasswordForm;