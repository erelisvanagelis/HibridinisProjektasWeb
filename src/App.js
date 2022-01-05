import logo from "./logo.svg";
import "./App.css";
import Form from "./pages/Form";
import { useState, useEffect } from "react";
import * as constants from "./utilities/constants";
import * as firebase from "./utilities/firebase";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
  useCollectionDataOnce,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc, addDoc } from "firebase/firestore";

import Landing from "./pages/Landing";
import CustomAppBar from "./components/CustomAppBar";
import NewAdvert from "./pages/NewAdvert";
import Pending from "./pages/Pending";
import Progress from "./pages/Progress";
import Completed from "./pages/Completed";
import AdvertList from "./pages/AdvertList";

function App() {
  const [email, setEmail] = useState("xxxatmsxxx@gmail.com");
  const [password, setPassword] = useState("123456");
  const [user, loading, error] = useAuthState(firebase.authentication);
  const [advert, setAdvert] = useState("");
  const [userId, setUserId] = useState("");
  const [action, setAction] = useState({
    title: "Sign In",
    handleAction: () => handleAction(constants.ACTION_TO_SIGN_IN),
  });
  const navigate = useNavigate();

  const [newAdvertValues, setNewAdvertValues] = useState({
    city: "",
    url: "",
    price: "",
    date: "",
    comment: "",
    status: "pending",
  });

  const [cities] = useCollectionDataOnce(firebase.citiesRef, { idField: "id" });
  const q = query(firebase.advertsRef, where("userId", "==", userId));
  const [adverts] = useCollectionData(q, { idField: "id" });

  useEffect(() => {
    if (user !== null) {
      setUserId(user.uid);
      setAction({
        title: user.email + "(Sign Out)",
        handleAction: () => handleAction(constants.ACTION_SIGN_OUT),
      });
    } else {
      setUserId("");
      setAction({
        title: "Sign In",
        handleAction: () => handleAction(constants.ACTION_TO_SIGN_IN),
      });
    }
  }, [user]);

  const handleAction = async (id) => {
    console.log(`actionId: ${id}`);
    switch (id) {
      case constants.ACTION_SIGN_IN:
        try {
          const response = await signInWithEmailAndPassword(
            firebase.authentication,
            email,
            password
          );

          navigate(constants.ROUTE_NEW);
        } catch (error) {
          console.log(error);
          alert(error);
        }
        break;
      case constants.ACTION_SIGN_UP:
        try {
          const response = await createUserWithEmailAndPassword(
            firebase.authentication,
            email,
            password
          );

          navigate(constants.ROUTE_NEW);
          console.log(response);
        } catch (error) {
          alert(error);
        }

        break;

      case constants.ACTION_SIGN_OUT:
        firebase.authentication.signOut();
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
      case constants.ACTION_ADD_ADVERT:
        console.log(newAdvertValues);
        if (user == null) {
          alert("Sign in first");
        } else {
          await addDoc(firebase.advertsRef, {
            ...newAdvertValues,
            userId: userId,
            technicianId: 0,
          });

          setNewAdvertValues({
            city: "",
            url: "",
            price: "",
            date: "",
            comment: "",
            status: "pending",
          });
          navigate(constants.ROUTE_PENDING);
        }

        break;

      case constants.ACTION_CANCEL_ADVERT:
        console.log();

        await deleteDoc(doc(firebase.advertsRef, '/' + advert.id));
        // await deleteDoc(doc(db, "cities", "DC"));
        break;

      default:
        console.log(`Action unhandled`);
    }
  };

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
              comboBoxData={cities}
              values={newAdvertValues}
              setValues={setNewAdvertValues}
              handleAction={() => handleAction(constants.ACTION_ADD_ADVERT)}
            />
          }
        />
        <Route
          path={constants.ROUTE_PENDING}
          element={
            <AdvertList
              adverts={specificAdverts(adverts, "pending")}
              setAdvert={setAdvert}
              buttonLabel="Cancel"
              handleAction={() => handleAction(constants.ACTION_CANCEL_ADVERT)}
            />
          }
        />
        <Route
          path={constants.ROUTE_PROGRESS}
          element={
            <AdvertList
              setAdvert={setAdvert}
              adverts={specificAdverts(adverts, "progress")}
              buttonLabel=""
            />
          }
        />
        <Route
          path={constants.ROUTE_COMPLETED}
          element={
            <AdvertList
              adverts={specificAdverts(adverts, "completed")}
              setAdvert={setAdvert}
              buttonLabel="Details"
              handleAction={() => handleAction(constants.ACTION_CANCEL_ADVERT)}
            />
          }
        />
      </Routes>
    </div>
  );
}

function specificAdverts(adverts, status) {
  const array = [];
  if (adverts != null && adverts.length > 0) {
    adverts.map((advert) => {
      if (advert.status === status) {
        array.push(advert);
      }
    });
  }
  return array;
}
export default App;
