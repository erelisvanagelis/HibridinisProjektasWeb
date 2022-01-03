import logo from "./logo.svg";
import "./App.css";
import Form from "./pages/Form";
import { useState, useEffect } from "react";
import * as constants from "./utilities/constants";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { app } from "./utilities/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Landing from "./pages/Landing";
import Home from "./pages/NewAdvert";
import CustomAppBar from "./components/CustomAppBar";
import NewAdvert from "./pages/NewAdvert";
import Pending from "./pages/Pending";
import Progress from "./pages/Progress";
import Completed from "./pages/Completed";

const pages = ["New Advert", "Pending", "In Progress", "Completed"];
const settings = ["Logout"];

function App() {
  const [email, setEmail] = useState("xxxatmsxxx@gmail.com");
  const [password, setPassword] = useState("123456");
  const [auth, setAuth] = useState(null);
  const [action, setAction] = useState({
    title: "Sign In",
    handleAction: () => handleAction(constants.ACTION_TO_SIGN_IN),
  });
  const authentication = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth Token");
    setAuth(authToken);
  }, []);
  useEffect(() => {
    console.log(`Auth: ${auth}`)
    if (auth) {
      setAction({
        title: "Sign Out",
        handleAction: () => handleAction(constants.ACTION_SIGN_OUT),
      });
    } else if (auth === null) {
      setAction({
        title: "Sign In",
        handleAction: () => handleAction(constants.ACTION_TO_SIGN_IN),
      });
    }
    // console.log(`Auth: ${auth}`)
  }, [auth]);

  const handleAction = async (id) => {
    console.log(`actionId: ${id}`);
    console.log(`email: ${email}`);
    console.log(`password: ${password}`);
    switch (id) {
      case constants.ACTION_SIGN_IN:
        try {
          const response = await signInWithEmailAndPassword(
            authentication,
            email,
            password
          );
          console.log(response);
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
          setAuth(response._tokenResponse.refreshToken);
          navigate(constants.ROUTE_NEW);
        } catch (error) {
          console.log(error);
          // alert(error)
        }
        break;
      case constants.ACTION_SIGN_UP:
        const response = await createUserWithEmailAndPassword(
          authentication,
          email,
          password
        );
        console.log(response);
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );
        break;

      case constants.ACTION_SIGN_OUT:
        sessionStorage.setItem(
          "Auth Token",
          null
        );        
        setAuth(null)

        navigate(constants.ROUTE_LANDING);
        break;

      case constants.ACTION_TO_SIGN_IN:
        navigate(constants.ROUTE_SIGN_IN);
        break;
      case constants.ACTION_TO_SIGN_UP:
        navigate(constants.ROUTE_SIGN_UP);
        break;
      case constants.ACTION_TO_NEW:
        navigate(constants.ROUTE_NEW);
        break;
      case constants.ACTION_TO_PROGRESS:
        navigate(constants.ROUTE_PROGRESS);
        break;
      case constants.ACTION_TO_PENDING:
        navigate(constants.ROUTE_PENDING);
        break;
      case constants.ACTION_TO_COMPLETED:
        navigate(constants.ROUTE_COMPLETED);
        break;
      default:
        console.log(`Action unhandled`);
    }
  };

  //   const pages = ["New Advert", "Pending", "In Progress", "Completed"];
  // const settings = ["Logout"];
  return (
    <div className="App">
      <CustomAppBar
        pages={[
          {
            title: "Create Advert",
            handleAction: () => handleAction(constants.ACTION_TO_NEW),
          },
          {
            title: "Pending",
            handleAction: () => handleAction(constants.ACTION_TO_PENDING),
          },
          {
            title: "In Progress",
            handleAction: () => handleAction(constants.ACTION_TO_PROGRESS),
          },
          {
            title: "Completed",
            handleAction: () => handleAction(constants.ACTION_TO_COMPLETED),
          },
          action,
        ]}
        settings={settings}
      />
      <Routes>
        <Route
          path={constants.ROUTE_LANDING}
          element={
            <Landing
              handleSignIn={() => handleAction(constants.ACTION_TO_SIGN_IN)}
              handleSignUp={() => handleAction(constants.ACTION_TO_SIGN_UP)}
            />
          }
        />
        <Route
          path={constants.ROUTE_SIGN_IN}
          element={
            <Form
              title="Sign In"
              setEmail={setEmail}
              setPassword={setPassword}
              handleAction={() => handleAction(constants.ACTION_SIGN_IN)}
            />
          }
        />
        <Route
          path={constants.ROUTE_SIGN_UP}
          element={
            <Form
              title="Sign Up"
              setEmail={setEmail}
              setPassword={setPassword}
              handleAction={() => handleAction(constants.ACTION_SIGN_UP)}
            />
          }
        />
        <Route
          path={constants.ROUTE_NEW}
          element={
            <NewAdvert
              handleSignIn={() => handleAction(constants.ACTION_TO_SIGN_IN)}
              handleSignUp={() => handleAction(constants.ACTION_TO_SIGN_UP)}
            />
          }
        />
        <Route
          path={constants.ROUTE_PENDING}
          element={
            <Pending
              handleSignIn={() => handleAction(constants.ACTION_TO_SIGN_IN)}
              handleSignUp={() => handleAction(constants.ACTION_TO_SIGN_UP)}
            />
          }
        />
        <Route
          path={constants.ROUTE_PROGRESS}
          element={
            <Progress
              handleSignIn={() => handleAction(constants.ACTION_TO_SIGN_IN)}
              handleSignUp={() => handleAction(constants.ACTION_TO_SIGN_UP)}
            />
          }
        />
        <Route
          path={constants.ROUTE_COMPLETED}
          element={
            <Completed
              handleSignIn={() => handleAction(constants.ACTION_TO_SIGN_IN)}
              handleSignUp={() => handleAction(constants.ACTION_TO_SIGN_UP)}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
