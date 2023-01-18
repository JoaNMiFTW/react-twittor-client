import { useState } from "react";
import { SignInSignUp } from "./page/SignInSignUp/SignInSignUp";
import { ToastContainer } from "react-toastify"


export default function App() {
    const [user, setUser] = useState("asd")

    return (
        <div>
            {
                user ?
                    (
                        <>
                            <SignInSignUp />
                        </>
                    ) : (
                        <h1>No estas logeado</h1>
                    )
            }
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover
            />
        </div>
    )

}