import Form from "./components/Form";
import "./App.css";

const App = () => {
  return (
    <div>
      <h1
        style={{
          color: "#17a2b8",
          textAlign: "center",
          fontFamily: "Roboto, 'Poppins', sans-serif",
        }}
      >
        User Management
      </h1>
      <Form />
    </div>
  );
};

export default App;
