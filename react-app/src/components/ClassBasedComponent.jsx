import React from "react";

class ClassBasedComponent extends React.Component {
  constructor(props) {
    // console.log(props);
    super(props);
    // create state using constructor
    this.state = {
      course: "React",
      counter: 0,
    };
  }

  // create state using class field syntax
  // state = {
  //   course: "React",
  // };

  // method will be called when the component is rendered
  componentDidMount() {
    console.log("Component mounted");
    // this.setState({ course: "Vue", counter: this.state.counter + 1 });
    this.setState((prevState) => ({
      course: "Vue",
      counter: prevState.counter + 1,
    }));
  }

  // method will be called when the component is closed
  componentWillUnmount() {}

  render() {
    console.log("Render method called");
    return (
      <div>
        <h2>Class Based Component</h2>
        <p>This is a class-based component.</p>
        <p>Child: {this.props.children}</p>
        <p>Props: {this.props.text}</p>
        <p>State: {this.state.course}</p>
        <p>Counter: {this.state.counter}</p>
      </div>
    );
  }
}

export default ClassBasedComponent;