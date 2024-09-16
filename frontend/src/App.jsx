import "./App.css";
import "./App-Responsive.css";
import Chat from "./pages/Chat";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider, useCookies } from "react-cookie";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
      mutations: {
        retryDelay: 30 * 1000,
      },
    },
  });
 
  const [cookies, ...fn] = useCookies(["ut"]);

  return (
    <CookiesProvider>
      <ChatContextProvider>
        <QueryClientProvider client={client}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route
                path="/chat/"
                element={cookies.ut ? <Chat /> : <Navigate to="/log-in/" />}
              />

              <Route
                path="/sign-up/"
                element={!cookies.ut ? <SignUp /> : <Navigate to="/chat/" />}
              />

              <Route
                path="/log-in/"
                element={!cookies.ut ? <LogIn /> : <Navigate to="/chat/" />}
              />
            </Routes>
          </Router>
        </QueryClientProvider>
      </ChatContextProvider>
    </CookiesProvider>
  );
}

export default App;
