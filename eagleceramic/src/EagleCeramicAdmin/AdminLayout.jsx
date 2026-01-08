import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./Sidebar/AdminSidebar.jsx";
import {
  setAdminToken,
  setAdminData,
  getAdminData,
  decodeJwt,
} from "./utils/auth";
import axios from "axios";

const AdminLayout = () => {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to verify token with backend API
  const verifyTokenWithBackend = async (token) => {
    try {
      // Basic token format validation (minimum length check)
      if (!token || token.length < 10) {
        throw new Error("Invalid token format");
      }

      const response = await axios.get(
        `https://clientbackend.cholabiz.com/api/v1/chola/client/user`,
        {
          params: { token },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("[AdminLayout] Token verification response:", response.data);

      if (response.data.success && response.data.data) {
        return {
          verified: true,
          userData: response.data.data,
        };
      } else {
        throw new Error(response.data.message || "Token verification failed");
      }
    } catch (error) {
      console.error("[AdminLayout] Token verification error:", error);
      
      // More specific error messages
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error("Unauthorized: Invalid or expired token");
        } else if (error.response.status === 404) {
          throw new Error("User not found");
        } else {
          throw new Error(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        throw new Error("Network error: Unable to reach server");
      } else {
        throw new Error(error.message || "Token verification failed");
      }
    }
  };

  // Function to extract user data from JWT token
  const extractUserDataFromToken = (token) => {
    const payload = decodeJwt(token);

    if (!payload) {
      console.warn("[AdminLayout] Could not decode JWT token");
      return null;
    }

    console.log("[AdminLayout] All payload keys:", Object.keys(payload));
    console.log("[AdminLayout] Payload content:");
    Object.keys(payload).forEach((key) => {
      console.log(`  ${key}:`, payload[key]);
    });

    // Extract user ID from various possible claims
    const extractedId =
      payload.id ||
      payload.userId ||
      payload.sub ||
      payload.uid ||
      payload.user_id ||
      null;

    // Extract email from various possible claims
    const extractedEmail =
      payload.email || payload.username || payload.userEmail || null;

    console.log("[AdminLayout] Extracted ID:", extractedId);
    console.log("[AdminLayout] Extracted email:", extractedEmail);

    return {
      id: extractedId,
      brandDetails: {
        email: extractedEmail,
      },
      ...payload,
    };
  };

  useEffect(() => {
    const verifyAndInitializeAdmin = async () => {
      if (!token) {
        setError("No token provided");
        setLoading(false);
        setVerified(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Verify token with backend API
        const verificationResult = await verifyTokenWithBackend(token);

        if (verificationResult.verified) {
          // Store the token
          setAdminToken(token);

          // Extract user data from token
          const extractedData = extractUserDataFromToken(token);

          // Combine backend user data with extracted JWT data
          const adminData = {
            ...extractedData,
            ...verificationResult.userData,
            // Ensure brandDetails is properly structured
            brandDetails: {
              ...(extractedData?.brandDetails || {}),
              ...(verificationResult.userData?.brandDetails || {}),
            },
          };

          console.log("[AdminLayout] Setting admin data:", adminData);
          setAdminData(adminData);

          const storedData = getAdminData();
          console.log("[AdminLayout] Final stored admin data:", storedData);

          setVerified(true);

          // Redirect to dashboard if on root admin route
          if (location.pathname === `/admin/${token}`) {
            navigate(`/admin/${token}/dashboard`, { replace: true });
          }
        } else {
          throw new Error("Token verification failed");
        }
      } catch (error) {
        console.error("[AdminLayout] Admin initialization error:", error);
        setError(error.message);
        setVerified(false);
        
        // Optional: Redirect to login or error page
        // navigate('/login', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    verifyAndInitializeAdmin();
  }, [token]);

  // Show loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />
        <p>Verifying your access token...</p>
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          gap: 2,
          p: 3,
        }}
      >
        <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>
          {error}
        </Alert>
        <p>Please check your token and try again.</p>
        {/* Optional: Add a button to go back to login */}
        {/* <Button variant="contained" onClick={() => navigate('/login')}>
          Go to Login
        </Button> */}
      </Box>
    );
  }

  // Show verified admin layout
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {verified ? (
        <>
          <AdminSidebar token={token} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Outlet />
          </Box>
        </>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>
            Token Not Verified - Access Denied
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default AdminLayout;