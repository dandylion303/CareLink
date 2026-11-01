import { Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from 'react-router-dom';

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
            element={<Dashboard />}
          />
      </Routes>
    </>
  )
}

export default App