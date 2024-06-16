import { Route, Routes } from "react-router-dom";
import { Login, Main, Registration } from "./pages";
import { useState } from "react";

export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("loggedIn"));
    return (
        <div className="App">
            <Routes>
                {/*<Route path="/requests" element={<RequestForm />}/>*/}
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route path="/registration" element={<Registration />} />
                <Route path="/" element={<Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}   />} />
            </Routes>
        </div>
    );
};
