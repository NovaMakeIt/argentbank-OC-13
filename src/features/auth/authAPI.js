// API helpers for authentication
const API_URL = 'http://localhost:3001/api/v1/user';

export async function loginAPI(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw { response: { data: error } };
  }
  return response.json();
}

export async function fetchUserProfileAPI(token) {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw { response: { data: error } };
  }
  return response.json();
}

export async function updateUserProfileAPI(token, profile) {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  });
  if (!response.ok) {
    const error = await response.json();
    throw { response: { data: error } };
  }
  return response.json();
}
