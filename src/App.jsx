import { Routes, Route, Navigate } from 'react-router-dom';
// import {createContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

// Import components
import Login from '../src/Components/Login';
import LoginError from '../src/Components/LoginError';
import UserList from '../src/Components/UserList';
// import Signup from './components/Signup';
// import ForgotPassword from './components/ForgotPassword';

// Create User Context
// export const UserContext = createContext(null);

function App() {
  // const [user, setUser] = useState(null);

  // Check if user is authenticated
  const isAuthenticated = () => {
    return Cookies.get('token') !== undefined;
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div>
       <ToastContainer position="top-center" autoClose={3000} />
    {/* <UserContext.Provider value={{ user, setUser }}> */}
      <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/forgot" element={<ForgotPassword />} /> */}
          <Route path="/login-error" element={<LoginError />} />
          <Route path="/users" element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    {/* </UserContext.Provider> */}
    </div>
  );
}

export default App;