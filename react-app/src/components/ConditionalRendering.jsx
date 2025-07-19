import { useState } from 'react';

const ConditionalRendering = () => {
  // const [course, setCourse] = useState('vue');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  let text = null;
  if (isLoggedIn) {
    text = 'Welcome back, user!';
  } else {
    text = 'Click the button to login';
  }

  return (
    <div>
      <h2>Conditional Rendering</h2>
      <p>This component demonstrates conditional rendering in React.</p>
      {/* { 
        course === 'react' ? (
          <p>This is react course</p>
        ) : course === 'vue' ? (
          <p>This is vue course</p>
        ) : null
      } */}
      <p>{text}</p>
      {
        isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )
      }
    </div>
  )
}

export default ConditionalRendering;