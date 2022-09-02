import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:3000";

function App() {
  const [numOfQuote, setNumOfQuote] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [isPending, setIsPending] = useState(true);


  const [formFields, setFormFields] = useState({
    name: "",
    gender: "",
    species: "",
    breedType: "",
    breed: "",
    age: 0,
    address: "",
    email: "",
  })

  function handleChange(event){
        let value = (event.target.value)
        setFormFields({ ...formFields, [event.target.name]: value });
  }

  function onSubmit(){

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
          <input type="text" name="name" value={formFields.name} onChange={handleChange}></input>
          <label>gender</label>
          <input type="text"  name="gender" value={formFields.gender} onChange={handleChange}></input>
          <label>email</label>
          <input type="text"  name="email" value={formFields.email} onChange={handleChange}></input>
          <label>species</label>
          <input type="text"  name="species" value={formFields.species} onChange={handleChange}></input>
          <label>breed type</label>
          <input type="text"  name="breedType" value={formFields.breedType} onChange={handleChange}></input>
          <label>breed</label>
          <input type="text"  name="breed" value={formFields.breed} onChange={handleChange}></input>
          <label>age (months)</label>
          <input type="text"  name="age" value={formFields.age} onChange={handleChange}></input>
          <label>address</label>
          <input type="text"  name="address" value={formFields.address} onChange={handleChange}></input>
        </div>
        <button onClick={onSubmit}>submit</button>
      </div>
    </div>
  );
}

export default App;
