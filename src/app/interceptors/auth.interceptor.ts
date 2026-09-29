// =====================================================
// AUTH INTERCEPTOR — The heart of automatic token injection
// =====================================================
//
// WHAT IS AN AXIOS INTERCEPTOR?
// An interceptor is a function that runs automatically
// BEFORE every request is sent, or AFTER every response
// is received. Think of it like a checkpoint at a gate:
// every request must pass through it.
//
// WHY IS IT USEFUL?
// Without an interceptor, you'd have to manually write:
//   headers: { Authorization: `Bearer ${token}` }
// in EVERY single API call. That's repetitive and error-prone.
//
// With an interceptor, you write it ONCE here, and EVERY
// Axios request automatically gets the token — you never
// have to think about it again.
//
// HOW IT WORKS:
// 1. You (or a service) calls axiosInstance.get('/some-api')
// 2. BEFORE the request goes to the network, the interceptor runs
// 3. The interceptor reads the token from localStorage
// 4. It adds the Authorization header to the request config
// 5. The request goes out WITH the token already attached
// 6. The API sees the token and returns protected data
// =====================================================

import axios from 'axios';

// We create a CUSTOM axios instance (not the default one).
// This lets us configure a base URL and attach interceptors
// only to our requests, without affecting any other axios usage.
const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── REQUEST INTERCEPTOR ──────────────────────────────
// This runs BEFORE every request is sent to the server.
axiosInstance.interceptors.request.use(
  (config) => {
    // Step 1: Read the token from localStorage
    // localStorage is the browser's built-in key-value storage.
    // We stored the token here after login.
    const token = localStorage.getItem('accessToken');

    // Step 2: If a token exists, attach it to the request header
    // The format "Bearer <token>" is the standard way to send JWTs.
    // Bearer means "the person bearing (carrying) this token".
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Step 3: Return the modified config so the request can proceed
    return config;
  },
  (error) => {
    // If something goes wrong BEFORE the request is sent, reject it
    return Promise.reject(error);
  }
);

// ── RESPONSE INTERCEPTOR ─────────────────────────────
// This runs AFTER every response comes back from the server.
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful (2xx), just pass it through
    return response;
  },
  (error) => {
    // If the server responds with 401 (Unauthorized),
    // it means the token is missing, expired, or invalid.
    // We handle it globally here: clear the token and redirect to login.
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export the configured instance — all services will import THIS,
// not the default axios, so every request automatically uses our interceptors.
export default axiosInstance;
