// Funcionalidades / Libs:
import { Routes, Route } from "react-router-dom";

// Pages:
import Cadastro from "../pages/Cadastro";

// Components:
// import ControllerRouter from "./ControllerRouter"; MODIFCAR PARA O PROJETO BOTICARIO



export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={ <Cadastro /> } />

        </Routes>
    )
}