import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import WaifuDetail from "./pages/WaifuDetail";
import Footer from "./components/Footer";
import GlobalStyle from "./GlobalStyles";
import BrowsePage from "./pages/BrowsePage";
import WalletPage from "./pages/WalletPage";

const Wrapper = styled.div`
  color: #29252a;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
`;

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
      <Router>
        <Navbar />

        <ContentWrapper>
          <Switch>
            <Route exact path="/waifu/:id" component={WaifuDetail} />
            <Route exact path="/browse" component={BrowsePage} />
            <Route exact path="/wallet" component={WalletPage} />
          </Switch>
        </ContentWrapper>

        <Footer />
      </Router>
    </Wrapper>
  );
}

export default App;
