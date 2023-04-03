import './App.css'

function App() {

  return (
    <div className="background">
      <div className="card">
        <div className="input-section">
          <div className="day input">
            <label htmlFor="day">DAY</label>
            <input type="number" id="day" />
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
        <div className="output-section">
          <div className="year-output">38 years</div>
          <div className="month-output">3 months</div>
          <div className="day-output">26 days</div>
        </div>
      </div>
    </div>
  )
}

export default App
