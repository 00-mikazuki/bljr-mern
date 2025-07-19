import { useState } from 'react';

// import '../css/style.css';
import styles from '../css/style.module.css';

const CssStyle = () => {
  const [color, setColor] = useState(false);

  const toggleColor = () => {
    setColor(!color);
  }

  return (
    // css styling applied through external CSS file
    // <div className="container">
    //   <h2>CSS Styling</h2>
    //   <p>This is a paragraph with custom CSS styling.</p>
    // </div>

    // css styling applied through inline styles
    // <div style={{ border: '5px solid black', backgroundColor: 'lightgray' }}>
    //   <h2>CSS Styling</h2>
    //   <p style={{ color: 'blue', fontSize: '20px' }}>
    //     This is a paragraph with inline CSS styling.
    //   </p>
    // </div>

    // css styling applied through module CSS
    // <div className={styles.container}>
    //   <h2>CSS Styling</h2>
    //   <p className={styles.text}>This is a paragraph with custom CSS styling.</p>
    // </div>

    // css styling applied through conditional class names
    <div className={color ? styles.container : styles.container1}>
      <h2>CSS Styling</h2>
      <p className={color ? styles.text : styles.text1}>This is a paragraph with custom CSS styling.</p>
      <button onClick={toggleColor}>
        Change Color
      </button>
    </div>
  )
}

export default CssStyle;