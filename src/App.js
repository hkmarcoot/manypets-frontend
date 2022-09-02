import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:3000";

function App() {
  const [numOfQuote, setNumOfQuote] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [isPending, setIsPending] = useState(true);

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
      </div>
      <div className="quote-form">
        <p>Your email:</p>
      </div>
    </div>
  );
}

export default App;
