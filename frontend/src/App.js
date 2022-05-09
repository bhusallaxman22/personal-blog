import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/Home';
import Edit from './Components/Edit';
import New from './Components/New';
import Description from './Components/Description';
import Header from './Components/commons/Header';
import Login from "./Components/Login"
import Register from "./Components/Register"
import axios from 'axios';
import Footer from './Components/commons/Footer';
// import Footer from './Components/commons/Footer';


function App() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({})

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        "x-auth-token": token,
      },
    };
    if (token) {
      axios
        .get("/user/auth", config)
        .then((response) => {
          if (response.data) {
            setLoggedIn(true);
            setUser(response.data);
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          localStorage.clear()
        });
    }
  }, [isLoggedIn]);


  const url = "/blogs/api";
  return (
    <div className="App">
      <Router >
        <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <div style={{ height: "80vh", overflow:"scroll" }}>

          <Routes >
            <Route exact path="/" element={<Home user={user} url={url} />} />
            <Route path="/blogs/new" element={<New user={user} />} />
            <Route path="/blogs/:id/edit" element={<Edit />} />
            <Route path="/blogs/:id" element={<Description isLoggedIn={isLoggedIn} user={user} />} />
            <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer style={{ height: "15vh" }} />
      </Router>

    </div>
  );
}

export default App;
