import { getAccessToken } from '../lib/storage';

const BASE_URL = 'http://13.201.5.111';

async function authHeaders() {
  const token = await getAccessToken();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function registerUser(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || data.message || 'Registration failed');
  }
  return data;
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || data.message || 'Login failed');
  }
  return data;
}

export async function getMyProfile() {
  const response = await fetch(`${BASE_URL}/api/v1/users/me`, {
    method: 'GET',
    headers: await authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || data.message || 'Failed to get profile');
  }
  return data;
}

export async function sendMessage(message: string) {
  const response = await fetch(`${BASE_URL}/api/v1/companion/chat`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || data.message || 'Failed to send message');
  }
  return data;
}

export async function saveOnboarding(data: {
  sobriety_status?: string;
  framework_orientation?: string;
  trigger_map?: object;
  their_why?: string;
}) {
  const response = await fetch(`${BASE_URL}/api/v1/onboarding/complete`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.detail || result.message || 'Failed to save onboarding');
  }
  return result;
}