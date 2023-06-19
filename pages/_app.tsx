import NoSSR from '@/components/NoSSR/NoSSR';
import ProtectedRoute from '@/components/route/ProtectedRoute';
import '@/styles/globals.css';
import { Container, ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AccSettingsPage from './account_settings';
import ConsolePage from './console';
import HomePage from "./index";
import LoginPage from "./login";
import MainDashboard from './maindashboard';
import ModulePage from './module';
import SignUpPage from "./signup";
import UserPage from "./users";

const theme = createTheme({});
//{ Component, pageProps }: AppProps
function App() {
  
  return (
    //<Component {...pageProps} />
    <NoSSR>
    <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
        <Container maxWidth={false} disableGutters>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <ProtectedRoute path="/module" role={"USER"} component={ModulePage} />
              <ProtectedRoute path="/users" role={"TUTOR"} component={UserPage} />
              <ProtectedRoute path="/maindashboard" role={"USER"} component={MainDashboard} />
              <ProtectedRoute path="/account_settings" role={"USER"} component={AccSettingsPage} />
              <ProtectedRoute path="/console" role={"USER"} component={ConsolePage} />
              <Redirect to={"/login"} />
            </Switch>
          </BrowserRouter>
        </Container>
    </SnackbarProvider>
  </ThemeProvider>
  </NoSSR>
  /*
  <NoSSR>
    <ThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
        <Container maxWidth={false} disableGutters>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <ProtectedRoute path="/module" component={ModulePage} />
              <ProtectedRoute path="/users" component={UserPage} />
              <ProtectedRoute page="/account_settings" component={AccSettingsPage} />
              <ProtectedRoute page="/maindashboard" component={MainDashboard} />
              <Redirect to={"/login"} />
            </Switch>
          </BrowserRouter>
        </Container>
    </SnackbarProvider>
  </ThemeProvider>
  </NoSSR>
  */
  );
}

export default App;
