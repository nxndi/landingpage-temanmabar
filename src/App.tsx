import Wrapper from "./components/layouts/Wrapper/Wrapper";
import ContentRouter from "./components/router/Content.router";
import FooterRouter from "./components/router/Footer.router";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <div className="flex grow flex-col bg-[#030303] dark:bg-background-900 text-text-900 dark:text-text-50">
        <Wrapper>
          <Navbar />
          <ContentRouter />
          <FooterRouter />
        </Wrapper>
      </div>
    </>
  );
}

export default App;
