import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import './App.css'
import MenteeDashboard from "./pages/Mentee/MenteeDashboard";
import MenteeCourses from "./pages/Mentee/MenteeCourses";
import MenteeReport from "./pages/Mentee/MenteeReport";
import Menteesummary from "./pages/Mentee/Menteesummary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/mentee" element={<MenteeDashboard />} >
        <Route index element={<MenteeCourses/>}/>
        <Route path="report" element={<MenteeReport/>}/>
        <Route path="summary" element={<Menteesummary/>}/>
      </Route>
    </Routes>
  );
}

export default App;
