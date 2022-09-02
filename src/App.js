import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

const API_URL = "http://localhost:3000";

function App() {
  const [numOfQuote, setNumOfQuote] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [isPending, setIsPending] = useState(true);

  const [formFields, setFormFields] = useState({
    petsname: "",
    gender: "",
    species: "",
    breedType: "",
    breed: "",
    age: 0,
    address: "",
    email: "",
  });

  const [quote, setQuote] = useState(0);

  const [Id, setId] = useState("");

  function handleChange(event) {
    let value = event.target.value;
    setFormFields({ ...formFields, [event.target.name]: value });
  }

  function handleId(event) {
    let value = event.target.value;
    setId(value);
  }

  async function isBreedValid(species, breed) {
    let api;
    if (species === "cat") {
      api = "https://api.thecatapi.com/v1/breeds";
    } else if (species === "dog") {
      api = "https://api.thedogapi.com/v1/breeds";
    }

    console.log(api + "/search?q=" + breed.replace(" ", "_"));
    const response = await fetch(api + "/search?q=" + breed.replace(" ", "_"));
    const payload = await response.json();

    return payload.length; // update this later -> if length is 0, say no breed found, if length is > 1, say be more specific
  }

  async function getQuote() {
    let response = await fetch(`http://localhost:3000/quotes/${Id}`);
    let data = await response.json();
    setQuote(data.payload);
  }

  async function onSubmit() {
    // add in validation
    // for (let i = 0; i < pets.length; i++) {
    //   // check breed is valid, if it
    //   const results = isBreedValid(pets[i].species, pets[i].breed)

    //   if (results === 0) {
    //     res.json({ success: false, message: "Invalid breed - none found."})
    //     return;
    //   }

    //   if (results > 1) {
    //     res.json({ success: false, message: "Multiple breed founds - please be more specific."})
    //     return;
    //   }
    // }
    const results = await isBreedValid(formFields.species, formFields.breed);

    if (results === 0) {
      alert("Invalid breed - none found.");

      return;
    }

    if (results > 1) {
      alert("Multiple breed founds - please be more specific.");
      // res.json({ success: false, message: "Multiple breed founds - please be more specific."})
      return;
    }

    //add validation on the address

    // send the post request
    const response = await fetch("http://localhost:3000/quotes", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formFields),
    });

    alert("Form Submitted");
  }
  useEffect(() => {
    async function getnumofquote() {
      await fetch(`${API_URL}/users`, { referrerPolicy: "no-referrer" })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for for that resourse");
          }
          return res.json();
        })
        .then((data) => {
          //console.log(data);
          setIsPending(false);
          setNumOfQuote(data.payload);
          setError(null);
        })
        .catch((err) => {
          //auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        });
    }
    getnumofquote();
    // console.log("The number of quotes served today: " + numOfQuote);
  }, []);
  // console.log("The number of quotes served today: " + numOfQuote);
  return (
    <div className="App">
      <div className="dashboard">
        <div className="dashboard-container">
          <p className="quote-text">The number of quotes served today</p>
          <p className="quote-number">{numOfQuote}</p>
        </div>
        <div className="form">
          <label>name</label>
          <input
            type="text"
            name="name"
            value={formFields.name}
            onChange={handleChange}
          ></input>
          <br></br>
          <label>gender</label>
          <input
            type="text"
            name="gender"
            value={formFields.gender}
            onChange={handleChange}
          ></input>
          <br></br>
          <label>email</label>
          <input
            type="text"
            name="email"
            value={formFields.email}
            onChange={handleChange}
          ></input>
          <br></br>
          <label>species</label>
          <input
            type="text"
            name="species"
            value={formFields.species}
            onChange={handleChange}
          ></input>
          <br></br>
          <label>breed type</label>
          <input
            type="text"
            name="breedType"
            value={formFields.breedType}
            onChange={handleChange}
          ></input>
          <br></br>
          <label>breed</label>
          <input
            type="text"
            name="breed"
            value={formFields.breed}
            onChange={handleChange}
          ></input>
          <br></br>
          <label>age (months)</label>
          <input
            type="text"
            name="age"
            value={formFields.age}
            onChange={handleChange}
          ></input>
          <br></br>
          <label>address</label>
          <input
            type="text"
            name="address"
            value={formFields.address}
            onChange={handleChange}
          ></input>
        </div>
        <button onClick={onSubmit}>submit</button>
      </div>
      <div className="user-search">
        <label>User ID</label>
        <input type="text" name="Id" value={Id} onChange={handleId}></input>
        <button onClick={getQuote}>Get Quote</button>
        <h2>Yearly cost for your pets: {quote}</h2>
      </div>
    </div>
  );
}

export default App;
