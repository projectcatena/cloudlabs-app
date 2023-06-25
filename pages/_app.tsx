import '@/styles/globals.css';
import { createTheme } from "@mui/material";
import { AppProps } from 'next/app';

const theme = createTheme({});
//{ Component, pageProps }: AppProps
function App({ Component, pageProps }: AppProps) {
  
  return (
    <Component {...pageProps} />
    
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
  */
  );
}

export default App;
