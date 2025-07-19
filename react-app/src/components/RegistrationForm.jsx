import { useState } from 'react';

const RegistrationForm = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    gender: '',
    agreement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // setData((prevData) => ({
    //   ...prevData,
    //   [name]: type === 'checkbox' ? checked : value,
    // }));
    setData({
      ...data,
      [name]: type === 'checkbox' ? checked : value,
});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={data.username} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={data.email} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={data.password} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" name="country" value={data.country} onChange={handleChange}>
          <option value="">Select a country</option>
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          <option value="uk">UK</option>
        </select>
      </div>
      <div>
        <label>Gender:</label>
        <label>
          <input type="radio" name="gender" value="male" onChange={handleChange} />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" onChange={handleChange} />
          Female
        </label>
        <label>
          <input type="radio" name="gender" value="others" onChange={handleChange} />
          Others
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="agreement" checked={data.agreement} onChange={handleChange} />
          I agree to the terms and conditions
        </label>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;