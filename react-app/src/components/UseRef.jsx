import { useState, useRef, useEffect } from "react";

const UseRef = () => {
  const [input, setInput] = useState({name: "", email: "", password: ""});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.style.border = "1px solid red"
  }, []);

  return (
    <div>
      <h2>UseRef Example</h2>
      <input type="text" name="name" ref={inputRef} value={input.name} onChange={handleChange} />
      <input type="email" name="email" value={input.email} onChange={handleChange} />
      <input type="password" name="password" value={input.password} onChange={handleChange} />
    </div>
  );
}

export default UseRef;