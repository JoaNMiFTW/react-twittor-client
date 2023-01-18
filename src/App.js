import { useState } from "react";
import { SignInSignUp } from "./page/SignInSignUp/SignInSignUp";


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
                    )
                    :
                    (
                        <h1>No estas logeado</h1>
                    )
            }
        </div>
    )

}