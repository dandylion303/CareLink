import { Login } from "./pages/Login";
import { Carers } from "./pages/Carers";
import { Families } from "./pages/Families";
import { NewCarerForm } from "./pages/NewCarerForm";
import { NewFamilyForm } from "./pages/NewFamilyForm";
import { NewRequestForm } from "./pages/NewRequestForm";
import { Requests } from "./pages/Requests";
import { RequestEdit } from "./pages/RequestEdit";
import Dashboard from "./pages/Dashboard";
import { Layout } from "./components/Layout";
import { Route, Routes } from 'react-router-dom';
import { RequestDetailPage } from "./pages/RequestDetailPage";
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
            path='carers'
            element={<Carers />} />
          <Route
            path='carers/new'
            element={<NewCarerForm />} />
          <Route
            path='family'
            element={<Families />} />
          <Route
            path='family/new'
            element={<NewFamilyForm />} />
          <Route
            path='request/new'
            element={<NewRequestForm/>}/>
          <Route
            path='request'
            element={<Requests/>}/>
          <Route
            path='request/:id'
            element={<RequestDetailPage/>}/>
          <Route
            path='request/:id/edit'
            element={<RequestEdit/>}/>
          
            
        </Route>
      </Routes>
    </>
  )
}

export default App