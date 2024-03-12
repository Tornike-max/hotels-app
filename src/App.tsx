import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AppLayout from "./layout/AppLayout";
import ProfilePage from "./pages/ProfilePage";
import UpdatePass from "./components/auth/UpdatePass";
import CabinsPage from "./pages/CabinsPage";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/:username" element={<ProfilePage />} />
            <Route path="/cabins" element={<CabinsPage />} />

            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/updatePass" element={<UpdatePass />} />

            <Route path="*" element={<div>No Data Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
