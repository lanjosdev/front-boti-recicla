// Funcionalidades / Libs:
import { Routes, Route } from "react-router-dom";

// Pages:
import Cadastro from "../pages/Cadastro";
import Instrucoes from "../pages/Instrucoes";
import ConfirmaPesagem from "../pages/ConfirmaPesagem";
import Resultados from "../pages/Resultados";

// Components:
// import ControllerRouter from "./ControllerRouter";



export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={ <Cadastro /> } />

            <Route path="/instrucoes" element={ <Instrucoes /> } />

            <Route path="/confirma-pesagem" element={ <ConfirmaPesagem /> } />

            <Route path="/resultados" element={ <Resultados /> } />

        </Routes>
    )
}