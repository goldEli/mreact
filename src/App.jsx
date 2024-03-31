import React from "./react/React"
// function App() {
//   return <div>hi</div>;
// }
// const App = <div>hi, <h1>123</h1></div>;
const App = React.createElement("div", { id: "app" }, "hi- ", "mini-react");

export default App;
