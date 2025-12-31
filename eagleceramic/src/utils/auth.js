// auth.js
export const setAdminToken = (token, extras = {}) => {
  if (!token) return;
  const existingRaw = localStorage.getItem('adminData');
  let data = existingRaw ? { ...JSON.parse(existingRaw) } : {};
  data.adminAccessToken = token;

  // try to decode JWT payload to extract id/email
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = parts[1];
     
      const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(b64)
          .split('')
          .map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      const parsed = JSON.parse(jsonPayload);
      const extractedId = parsed.id || parsed._id || parsed.userId;
      const extractedEmail = parsed.email || parsed.eml;
      if (extractedId) data.id = extractedId;
      if (extractedEmail) data.brandDetails = { 
        ...(data.brandDetails || {}), 
        email: extractedEmail, 
        id: extractedId || data.brandDetails?.id 
      };
    }
  } catch (e) {
    // ignore decode errors
    console.warn('JWT decode failed', e);
  }

  if (extras.brandDetails) data.brandDetails = { 
    ...(data.brandDetails || {}), 
    ...extras.brandDetails 
  };
  
  if (extras.userId) data.userId = extras.userId;
  data.timestamp = new Date().toISOString();
  
  try {
    localStorage.setItem('adminData', JSON.stringify(data));
    localStorage.setItem('adminAccessToken', token);
    localStorage.setItem('adminUserId', extras.userId || data.userId || '');
  } catch (e) {
    console.error('Failed to save admin token:', e);
  }
};

export const getAdminData = () => {
  const raw = localStorage.getItem('adminData');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse adminData:', e);
    return null;
  }
};

export const getAdminToken = () => {
  return localStorage.getItem('adminAccessToken') || getAdminData()?.adminAccessToken || null;
};

export const getAdminUserId = () => {
  return localStorage.getItem('adminUserId') || getAdminData()?.userId || null;
};

// utils/auth.js
export const clearAdminData = () => {
  console.log('🔴 [Auth] Starting logout process...');
  
  try {
    // Check what we have before clearing
    const beforeToken = localStorage.getItem('adminAccessToken');
    const beforeData = localStorage.getItem('adminData');
    const beforeUserId = localStorage.getItem('adminUserId');
    
    console.log('📋 [Auth] Before clearing - Items found:');
    console.log('  - Token exists:', !!beforeToken);
    console.log('  - Data exists:', !!beforeData);
    console.log('  - User ID exists:', !!beforeUserId);
    
    if (beforeData) {
      try {
        const parsedData = JSON.parse(beforeData);
        console.log('👤 [Auth] User being logged out:');
        console.log('  - ID:', parsedData.id || 'N/A');
        console.log('  - Email:', parsedData.brandDetails?.email || 'N/A');
        console.log('  - Token stored at:', parsedData.timestamp || 'N/A');
      } catch (e) {
        console.warn('⚠️ [Auth] Could not parse user data:', e.message);
      }
    }
    
    // Clear the data
    localStorage.removeItem('adminData');
    localStorage.removeItem('adminAccessToken');
    localStorage.removeItem('adminUserId');
    
    console.log('✅ [Auth] All auth data cleared from localStorage');
    
    // Verify everything is cleared
    const afterToken = localStorage.getItem('adminAccessToken');
    const afterData = localStorage.getItem('adminData');
    const afterUserId = localStorage.getItem('adminUserId');
    
    console.log('🔍 [Auth] Verification after clearing:');
    console.log('  - Token removed:', !afterToken ? '✅' : '❌');
    console.log('  - Data removed:', !afterData ? '✅' : '❌');
    console.log('  - User ID removed:', !afterUserId ? '✅' : '❌');
    
    console.log('🚪 [Auth] Logout completed successfully');
    console.log('----------------------------------------');
    
    return true;
  } catch (error) {
    console.error('❌ [Auth] Error during logout:', error);
    console.error('Stack trace:', error.stack);
    return false;
  }
};

// Check if token is expired
export const isTokenValid = () => {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const payload = parts[1];
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(b64)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    const parsed = JSON.parse(jsonPayload);
    
    // Check expiration
    if (parsed.exp) {
      const now = Math.floor(Date.now() / 1000);
      return parsed.exp > now;
    }
    
    return true; // No expiration in token
  } catch (e) {
    return false;
  }
};