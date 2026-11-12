import { Login } from "./pages/Login";
import { Carers } from "./pages/carers/Carers";
import { Families } from "./pages/families/Families";
import { NewCarerForm } from "./pages/carers/NewCarerForm";
import { NewFamilyForm } from "./pages/families/NewFamilyForm";
import { NewRequestForm } from "./pages/requests/NewRequestForm";
import { Requests } from "./pages/requests/Requests";
import { RequestEdit } from "./pages/requests/RequestEdit";
import Dashboard from "./pages/Dashboard";
import { Layout } from "./components/Layout";
import { Route, Routes } from 'react-router-dom';
import { RequestDetailPage } from "./pages/requests/RequestDetailPage";
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