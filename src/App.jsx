import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';
import Header from './components/Header';
import Footer from './components/Footer';
import RequireAuth from './components/RequireAuth';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUserProfile } from './features/auth/authSlice';

function App() {
  // Récupération automatique du profil utilisateur si token présent
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [token, dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* Route protégée : nécessite d'être connecté */}
        <Route path="/user" element={
          <RequireAuth>
            <User />
          </RequireAuth>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
