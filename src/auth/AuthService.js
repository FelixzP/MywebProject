
const login = async (username, password) => {
    try {
      const response = await fetch('https://api.peeranat.online/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const expirationTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('tokenExpiration', expirationTime.getTime());
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  export { login };
  