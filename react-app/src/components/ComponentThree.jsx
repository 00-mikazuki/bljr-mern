import { useContext } from "react";
import CourseContext from "./context/courseContext";

const ComponentThree = () => {
  const context = useContext(CourseContext);
  return (
    <div>
      <h2>Component Three</h2>
      {/* <CourseContext.Consumer>
        {(value) => (
          <p>Course from context: {value.course}</p>
        )}
      </CourseContext.Consumer> */}
      <p>Course from context: {context.course}</p>
    </div>
  )
}

export default ComponentThree;