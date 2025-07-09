import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, fetchUserProfile } from '../features/auth/authSlice';

function SignIn() {
  // Local state pour les champs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.auth.user);

  // Redirection si déjà connecté
  useEffect(() => {
    if (user) {
      navigate('/user', { replace: true });
    }
  }, [user, navigate]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch du thunk login
    const resultAction = await dispatch(login({ email, password, remember }));
    if (login.fulfilled.match(resultAction)) {
      // Si login OK, on récupère le profil utilisateur
      await dispatch(fetchUserProfile(resultAction.payload.token));
      navigate('/user');
    }
    // Sinon, l'erreur sera affichée automatiquement
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* Affichage d'un message d'erreur rouge si login échoue */}
          {auth.error && (
            <div style={{ color: 'red', marginBottom: '1rem' }}>
              {auth.error}
            </div>
          )}
          <button className="sign-in-button" type="submit" disabled={auth.status === 'loading'}>
            {auth.status === 'loading' ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  );
}


export default SignIn;
