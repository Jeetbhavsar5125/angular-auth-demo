// This interface describes the shape of the user object
// returned by the DummyJSON /auth/me API.
// Using an interface gives us type safety — TypeScript will
// warn us if we try to access a property that doesn't exist.

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
}

// This interface describes the login request body
export interface LoginCredentials {
  username: string;
  password: string;
}

// This interface describes the login API response
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
