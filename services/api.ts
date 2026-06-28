import { getAccessToken } from "../lib/storage";

const BASE_URL = "http://13.201.5.111";

// Helper function to build authorization headers
async function authHeaders() {
  const token = await getAccessToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Register a new user
export async function registerUser(
  email: string,
  password: string
) {
  const response = await fetch(
    `${BASE_URL}/api/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || data.message || "Registration failed"
    );
  }

  return data;
}

// Login existing user
export async function loginUser(
  email: string,
  password: string
) {
  const response = await fetch(
    `${BASE_URL}/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || data.message || "Login failed"
    );
  }

  return data;
}

// Get current user profile
export async function getMyProfile() {
  const response = await fetch(
    `${BASE_URL}/api/v1/users/me`,
    {
      method: "GET",
      headers: await authHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || data.message || "Failed to get profile"
    );
  }

  return data;
}

// Send a chat message
export async function sendMessage(
  message: string
) {
  const response = await fetch(
    `${BASE_URL}/api/v1/companion/chat`,
    {
      method: "POST",
      headers: await authHeaders(),
      body: JSON.stringify({
        message,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || data.message || "Failed to send message"
    );
  }

  return data;
}