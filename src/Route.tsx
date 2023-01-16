import {Home} from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import {History} from "./pages/History";

export function Router(){
    return(
        <Routes>
            <Route path="/" element={<Home  />}></Route>
            <Route path="/history" element={<History  />}></Route>
        </Routes>
    )
}
