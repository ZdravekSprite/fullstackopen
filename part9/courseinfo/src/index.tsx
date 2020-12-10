import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartOne extends CoursePartBase {
    name: "Fundamentals";
    description: string;
  }

  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }

  interface CoursePartThree extends CoursePartBase {
    name: "Deeper type usage";
    description: string;
    exerciseSubmissionLink: string;
  }

  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

  return (
    <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));