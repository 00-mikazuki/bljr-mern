import { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div>
      <h2>Timer Component</h2>
      <p>Current Time: {time.toLocaleTimeString()}</p>
    </div>
  )
}

export default Timer;