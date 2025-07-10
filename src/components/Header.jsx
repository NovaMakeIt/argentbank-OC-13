import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import argentBankLogo from '../assets/img/argentBankLogo.png';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/authSlice';

/**
 * Composant Header : affiche la barre de navigation principale.
 * Affiche les liens selon l'état de connexion utilisateur.
 */
function Header() {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Déconnexion : nettoie le state et redirige vers la page principale
const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Si utilisateur connecté, affiche prénom + bouton logout */}
        {token && user ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              <span className="main-nav-text">{user.firstName}</span>
            </Link>
            <Link
              className="main-nav-item"
              to="/"
              onClick={handleLogout}
            >
              <i className="fa fa-sign-out"></i>
              <span className="main-nav-text">Sign Out</span>
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            <span className="main-nav-text">Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
