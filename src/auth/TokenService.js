// TokenService.js

const refreshToken = async () => {
    const token = sessionStorage.getItem('token');
    const tokenExpiration = sessionStorage.getItem('tokenExpiration');
  
    if (!token || !tokenExpiration) {
      // Token or expiration not found, perform login
      // (You might want to redirect the user to the login page)
      return;
    }
  
    const currentTimestamp = new Date().getTime();
    const expirationTimestamp = parseInt(tokenExpiration, 10);
  
    if (currentTimestamp >= expirationTimestamp - 5 * 60 * 1000) {
      // Token is about to expire in the next 5 minutes, refresh it
      try {
        const response = await fetch('https://api.peeranat.online/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          const newTokenExpiration = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('tokenExpiration', newTokenExpiration.getTime());
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error during token refresh:', error);
      }
    }
  };
  
  export { refreshToken };
  