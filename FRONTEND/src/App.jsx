import { Login } from "./pages/Login";
import { Carers } from "./pages/Carers";
import Dashboard from "./pages/Dashboard";
import { Layout } from "./components/Layout";
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path='/login'
          element={<Login />}
        />

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>}>
          <Route
            index
            element={<Dashboard />}
          />
          <Route
            path='/carers'
            element={<Carers/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App