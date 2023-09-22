import "./App.css";
import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const returnClarifaiRequestOptions = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentication
  const PAT = "c998e70a93f04ff291469ab00f1df1ad";
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "5hdnsuctgr7b";
  const APP_ID = "test";
  // Change these to whatever model and image URL you want to use
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };
  return requestOptions;
};

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = async () => {
    try {
      const response = await fetch(
        "https://api.clarifai.com/v2/models/face-detection/outputs",
        returnClarifaiRequestOptions(input)
      );

      if (response) {
        const userResponse = await fetch("http://localhost:3000/image", {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
          }),
        });
        const count = await userResponse.json();
        setUser(
          Object.assign(user, {
            entries: count,
          })
        );
      }

      const result = await response.json();
      displayFaceBox(calculateFaceLocation(result));

      setImageUrl(input);
      console.log(input);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setLoggedIn(false);
    } else if (route === "home") {
      setLoggedIn(true);
    }
    setRoute(route);
  };
  return (
    <div className="App text-center">
      <Navigation loggedIn={loggedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <>
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm submit={onSubmit} onInputChange={onInputChange} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : (
        <main>
          {route === "signin" ? (
            <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
          ) : (
            <Register loadUser={loadUser} onRouteChange={onRouteChange} />
          )}
        </main>
      )}
    </div>
  );
};

export default App;
