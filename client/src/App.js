import { Route, Routes } from "react-router-dom";
import { RequestForm, RequestsTable, Login, Registration } from "./components";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/request" element={<RequestForm />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/registration" element={<Registration />} />
                <Route path="/" element={<RequestsTable />} />
            </Routes>
        </div>
    );
}

export default App;
