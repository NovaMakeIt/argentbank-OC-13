import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { updateUserProfile } from '../features/auth/authSlice';

function User() {
  // On récupère le profil utilisateur et le statut de l'update
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const updateStatus = useAppSelector((state) => state.auth.status);
  const updateError = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();

  // State local pour le mode édition
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState('');
  const firstNameInputRef = React.useRef(null);

  // Ouvre le formulaire d'édition
  const handleEdit = () => {
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setLocalError('');
    setIsEditing(true);
    setTimeout(() => {
      if (firstNameInputRef.current) {
        firstNameInputRef.current.focus();
      }
    }, 0);
  };

  // Annule l'édition
  const handleCancel = () => {
    setIsEditing(false);
    setLocalError('');
  };

  // Sauvegarde la modification
  const handleSave = (e) => {
    e.preventDefault();
    setLocalError('');
    // Nettoyage : trim + suppression espaces internes
    const clean = (val) => val.trim().replace(/\s+/g, '');
    const cleanedFirst = clean(firstName);
    const cleanedLast = clean(lastName);
    // Validation : lettres, tiret, apostrophe uniquement
    const validName = (val) => /^[A-Za-zÀ-ÿ\-']+$/.test(val);
    if (!cleanedFirst || !cleanedLast) {
      setLocalError('Le prénom et le nom sont obligatoires.');
      return;
    }
    if (!validName(cleanedFirst) || !validName(cleanedLast)) {
      setLocalError('Caractères non valides dans le prénom ou le nom.');
      return;
    }
    dispatch(updateUserProfile({
      token,
      profile: {
        firstName: cleanedFirst,
        lastName: cleanedLast
      }
    }))
      .unwrap()
      .then(() => {
        setIsEditing(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      })
      .catch(() => {
        setLocalError('Erreur lors de la mise à jour du profil.');
      });
  };


  return (
    <main className="main bg-dark">
      {/* Message de succès global */}
      {success && (
        <div className="profile-success-message">
          Profil mis à jour avec succès !
        </div>
      )}
      <div className="header">
        {!isEditing ? (
          <>
            <h1>Welcome back<br />
              {user ? (
                <>{user.firstName} {user.lastName}!</>
              ) : (
                <>User!</>
              )}
            </h1>
            <button className="edit-button" onClick={handleEdit}>Edit Name</button>
          </>
        ) : (
          <form className="edit-name-form" onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
            {/* Titre uniquement Welcome back en mode édition */}
            <h1>Welcome back</h1>
            {/* Inputs vides, placeholder = prénom/nom actuel */}
            <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
              <input
                type="text"
                ref={firstNameInputRef}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setLocalError('');
                }}
                placeholder={user?.firstName || 'First Name'}
                required
                style={{ padding: '0.5rem', fontSize: '1.1rem', maxWidth: '200px', flex: 1 }}
              />
              <input
                type="text"
                onChange={(e) => {
                  setLastName(e.target.value);
                  setLocalError('');
                }}
                placeholder={user?.lastName || 'Last Name'}
                required
                style={{ padding: '0.5rem', fontSize: '1.1rem', maxWidth: '200px', flex: 1 }}
              />
            </div>
            {/* Message d'erreur local ou API */}
            {(localError || updateError) && (
              <div className="profile-error-message">{localError || updateError}</div>
            )}

            {/* Boutons alignés sous les inputs, même largeur, style personnalisé */}
            <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
              <button
                className="edit-button profile-edit-save"
                type="submit"
                disabled={updateStatus === 'loading'}
              >
                {updateStatus === 'loading' ? 'Saving...' : 'Save'}
              </button>
              <button
                className="edit-button profile-edit-cancel"
                type="button"
                onClick={handleCancel}
                disabled={updateStatus === 'loading'}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default User;
