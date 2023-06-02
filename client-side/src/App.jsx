import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./stores";
import router from "./routers";

function App() {
  return (
    <div className="App">
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </div>
  );
}

export default App;
