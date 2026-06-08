import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
    const [mode, setMode] = useState("signup");
    const {signUp, user, logout} = useContext(AuthContext)
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm();

    function onSubmit(data) {
        signUp(data.email, data.password)
    }

    return (
    <div className="page">
        <div className="container">
            <div className="auth-container">
                {user && <p>User is logged in as: {user.email}</p>}
                <button onClick={() => logout()}>Logout</button>
                <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>
                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input className="form-input" type="email" id="email"  {...register("email", { required: "Email is required"})}/>
                    {errors.email && <span className="form-error">{errors.email.message}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input placeholder="*******" {...register("password", {required: "Password is required", 
                        minLength: {
                            value: 4,
                            message: "Password must be atleast 4 characters",
                        },
                        maxLength: {
                            value: 12,
                            message: "Password must not be more than 12 characters",
                        },
                        })} className="form-input" type="password" id="password" />
                        {errors.password && (<span className="form-error">{errors.password.message}</span>)}
                    </div>

                    <button type="submit" className="btn btn-primary btn-large">
                        {mode === "signup" ? "Sign Up" : "Login"}
                    </button>
                </form>

                <div className="auth-switch">
                        { mode === "signup" ? <p> Already have an account <span className="auth-link" onClick={() => setMode("login")}>Login</span> </p> : (<p> Don't have an account yet? <span className="auth-link" onClick={() => setMode("signup")}>Sign Up</span> </p>)}
                </div>
            </div>
        </div>
    </div>)
}