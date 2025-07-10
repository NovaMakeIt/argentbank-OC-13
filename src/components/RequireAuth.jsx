import React from 'react';
import { useAppSelector } from '../app/hooks';
import { Navigate } from 'react-router-dom';

// Composant de garde de route : protège l'accès aux routes privées
export default function RequireAuth({ children }) {
  // On récupère le token depuis le state Redux
  const token = useAppSelector((state) => state.auth.token);

  // Si pas de token, on redirige vers la page principale
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Sinon, on affiche le contenu protégé
  return children;
}
