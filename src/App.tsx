import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AppLayout from "./layout/AppLayout";
import ProfilePage from "./pages/ProfilePage";
import UpdatePass from "./components/auth/UpdatePass";
import CabinsPage from "./pages/CabinsPage";
import BookingsPage from "./pages/BookingsPage";
import BookingDetails from "./pages/BookingDetails";
import SettingsPage from "./pages/SettingsPage";
import BookingCreateFormPage from "./pages/BookingCreateFormPage";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/cabins" element={<CabinsPage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route
              path="/bookings/create"
              element={<BookingCreateFormPage />}
            />

            <Route
              path="/booking/details/:bookingId"
              element={<BookingDetails />}
            />
            <Route path="/settings" element={<SettingsPage />} />

            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/updatePass" element={<UpdatePass />} />

            <Route path="*" element={<div>No Data Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
