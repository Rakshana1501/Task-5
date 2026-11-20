import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Form } from "./taks";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Form />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;
