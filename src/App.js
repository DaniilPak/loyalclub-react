import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState('');

  // Function to authenticate user and get JWT token
  const handleLogin = async () => {
    const response = await axios.post('http://localhost:3000/api/auth', { "phoneNumber": "77054809351", "password": "password" });
    setToken(response.data.token);
    console.log(token);
  };

  // Function to access protected data
  const handleProtectedData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/protected', { headers: { Authorization: token } });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Function to access protected data
  const updateBusinessInfo = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/business/update', { 
        "name": "K.chicken"
      } , { headers: { Authorization: token, businessid: "6424638f5e0484cbd121f1d8" } });
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleProtectedData}>Access Protected Data</button>
      <button onClick={updateBusinessInfo}>Update business info</button>
    </div>
  );
};

export default App;
