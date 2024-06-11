import { Route, Routes } from "react-router-dom";
import { Main } from "./pages";

export const App = () => {
    return (
        <div className="App">
            <Routes>
                {/*<Route path="/request" element={<RequestForm />}/>*/}
                {/*<Route path="/login" element={<Login />}/>*/}
                {/*<Route path="/registration" element={<Registration />} />*/}
                <Route path="/" element={<Main />} />
            </Routes>
        </div>
    );
};
