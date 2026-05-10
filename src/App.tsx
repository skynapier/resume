import { Navigate, Route, Routes } from "react-router-dom";
import { ResumePage } from "./pages/ResumePage";
import { BydhPage } from "./pages/BydhPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ResumePage />} />
      <Route path="/bydh" element={<BydhPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
