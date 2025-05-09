// Funcionalidades / Libs:
import { Routes, Route } from "react-router-dom";

// Pages:
import Cadastro from "../pages/Cadastro";
import Instrucoes from "../pages/Instrucoes";

// Components:
// import ControllerRouter from "./ControllerRouter"; MODIFCAR PARA O PROJETO BOTICARIO



export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={ <Cadastro /> } />

            <Route path="/instrucoes" element={ <Instrucoes /> } />

        </Routes>
    )
}