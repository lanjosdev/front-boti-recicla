// Funcionalidades / Libs:
import { Routes, Route, Navigate } from "react-router-dom";

// Pages:
import Cadastro from "../pages/Cadastro";
import Instrucoes from "../pages/Instrucoes";
import ConfirmaPesagem from "../pages/ConfirmaPesagem";
import Resultados from "../pages/Resultados";

// Components:
import ControllerRouter from "./ControllerRouter";



export default function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={ <Cadastro /> } />

            <Route path="/instrucoes" element={ <ControllerRouter> <Instrucoes /> </ControllerRouter> } />

            <Route path="/confirma-pesagem" element={ <ControllerRouter> <ConfirmaPesagem /> </ControllerRouter> } />

            <Route path="/resultados" element={ <Resultados /> } />


            {/* Rota fallback para redirecionar para a raiz (/) */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}