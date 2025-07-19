import { useState } from "react";

const Form = () => {
  const [course, setCourse] = useState("");
  const [desc, setDesc] = useState("");
  const [country, setCountry] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "course") {
      setCourse(value);
    } else if (name === "desc") {
      setDesc(value);
    } else if (name === "country") {
      setCountry(value);
    } else if (name === "agreement") {
      setAgreement(event.target.checked);
    } else if (name === "gender") {
      setGender(value);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with values:");
    console.log("Course:", course);
  }

  return (
    <div>
      <h2>Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="course">Course:</label>
        <input type="text" name="course" value={course} onChange={handleChange} />
        <br />
        <label htmlFor="desc">Description:</label>
        <textarea name="desc" value={desc} onChange={handleChange}></textarea>
        <br />
        <label htmlFor="country">Country:</label>
        <select name="country" value={country} onChange={handleChange}>
          <option value="">Select a country</option>
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          <option value="uk">UK</option>
          <option value="australia">Australia</option>
        </select>
        <br />
        <label>
          <input
            type="checkbox"
            name="agreement"
            checked={agreement}
            onChange={handleChange}
          />
          I agree to the terms and conditions
        </label>
        <br />
        <label>Gender</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="others"
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form;