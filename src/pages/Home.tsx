import ContentLayout from "../components/ContentLayout";
import LoggedInHomePage from "../components/LoggedInHomePage";
import LoggedOutHomePage from "../components/LoggedOutHomePage";
import useAuth from "../hooks/useAuth"

const Home = () => {
  const { token } = useAuth()
  console.log(token)
  return <>{!token ? <LoggedOutHomePage /> : <LoggedInHomePage />}</>;
};

export default Home;
