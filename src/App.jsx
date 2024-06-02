import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage from "./Components/Auth/AuthPage";
import AppLayout from "./Components/Layout/AppLayout";
import store from "./store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  { path: "/", element: <AuthPage /> },
  { path: "/transactions/all", element: <AppLayout /> },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
