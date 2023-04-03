import { useState } from 'react';
import './App.css'

function App() {
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setDay(value);
    
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(`Form submitted with day value: ${day}`);
  }

  return (
    <div className="background">
      <form className="card" onSubmit={handleFormSubmit}>
        <div className="input-section">
          <div className="day input">
            <label htmlFor="day">DAY</label>
            <input 
              type="number" 
              id="day" 
              onChange={handleInputChange} 
              // value={day ?? ''} 
            />
          </div>
          <div className="month input">
            <label htmlFor="month">MONTH</label>
            <input type="number" id="month"/>
          </div>
          <div className="year input">
            <label htmlFor="year">YEAR</label>
            <input type="number" id="year" />
          </div>
        </div>
        <hr />
        <button>Calculate</button>
        <hr />
        <div className="output-section">
          <div className="year-output">38 years</div>
          <div className="month-output">3 months</div>
          <div className="day-output">26 days</div>
        </div>
      </form>
    </div>
  )
}

export default App
