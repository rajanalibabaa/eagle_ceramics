// utils/auth.js

// Store token
export const setAdminToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminToken', token);
  }
};

// Get token
export const getAdminToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

// Store admin data
export const setAdminData = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminData', JSON.stringify(data));
  }
};

// Get admin data
export const getAdminData = () => {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem('adminData');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error parsing admin data:', error);
      return null;
    }
  }
  return null;
};

// Decode JWT token to get payload
export const decodeJwt = (token) => {
  if (!token) return null;
  
  try {
    // JWT token has 3 parts separated by dots: header.payload.signature
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

// Get user ID from stored data
export const getAdminUserId = () => {
  const data = getAdminData();
  return data?.id || null;
};

// Clear all auth data (logout)
export const clearAdminData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getAdminToken();
  const data = getAdminData();
  return !!(token && data);
};