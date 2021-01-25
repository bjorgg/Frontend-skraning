import { useEffect, useState } from "react";
import './App.css';
import logo1 from './img/TYR_MMA_Runir_Gulur.webp'
import logo2 from './img/TyrRunGul.webp'

function App() {

  const [attendeesList, setAttendeesList] = useState([]);
  const [newAttendee, setNewAttendee] = useState('');

  useEffect(() => {
    // Fetch from the api
    fetch("https://server-skraning.herokuapp.com/posts", {
      method: 'GET'}) 
    // Return json.
    .then((r) => r.json())
    // Set data to state.
    .then((data) => setAttendeesList(data))
    // Catching errors
    .catch((error) => console.error(error));

  }, [])


  const addAttendee = () => {
    // Fetch from the api with POST method to add do database
    fetch("https://server-skraning.herokuapp.com/posts", { 
      method: 'POST', 
      body: JSON.stringify({name: newAttendee}), 
      headers: {'Content-Type': 'application/json'}})
    .then((r) => r.json())
    // Setting the data to state and using concat to add to it
    .then((data) => setAttendeesList(attendeesList => attendeesList.concat(data))) 
    .catch((error) => console.error(error))
  }

  // Handle submit from input
  const handleSubmit = (e) => {
    e.preventDefault()
    addAttendee()
    // Clearing input after submit
    setNewAttendee('')
  }

  // Handle when input changes
  const handleChange = (e) => {
    setNewAttendee(e.target.value)
  }

  // Handle when delete button is clicked
  const handleDelete = (id) => {
    // Fetch from the api with DELETE method to delete from database
      fetch(`https://server-skraning.herokuapp.com/posts/${id}`, { 
        method: 'DELETE'
      })
      .then((r) => r.json())
      // Filtering and finding the name to remove from id
      .then(() => setAttendeesList(attendeesList.filter(attendee => id !== attendee._id)))
      .catch((error) => console.error(error)) 
  }


  return (
    <div className="App">
      <div>
        <img src={logo2} alt="logo2"></img>
      </div>
      <div>
        <img src={logo1} alt="logo1"></img>
      </div>
      <h2>Skráning í tíma</h2>
      <div className="class-container">
        <h1>Hermóður bardagaþrek</h1>
        <div>
          <input type="text" name="name" value={newAttendee} placeholder="Fullt nafn hér ..." onChange={handleChange} />
          <button onClick={handleSubmit}>Skrá</button>
        </div>
      
          <ul>
          {attendeesList && 
            attendeesList.map((attendee) => (
              <li id={attendee._id} key={attendee._id}>
                {attendee.name} <button onClick={() => handleDelete(attendee._id)}>Afskrá</button>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default App;
