import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={`${import.meta.env.VITE_DOMAIN}`}
    clientId={`${import.meta.env.VITE_CLIENT_ID}`}
    useRefreshTokens={true}
    cacheLocation="localstorage"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
