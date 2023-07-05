import { Landing, Error, Register, ProtectedRoute } from "./Pages"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {
  Profile,
  AddJob,
  AllJobs,
  Stats,
  SharedLayout
} from './Pages/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index="stat" element={<Stats />} />
          <Route path="allJobs" element={<AllJobs />} />
          <Route path="addJob" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" autoClose="1500" />
    </BrowserRouter>
  )
}

export default App
