import { useState } from 'react';
import './App.css'

interface User {
  years?: number;
  months?: number;
  days?: number;
}

function App() {
  const [inputDay, setInputDay] = useState<number>(0);
  const [inputMonth, setInputMonth] = useState<number>(0);
  const [inputYear, setInputYear] = useState<number>(0);
  const [user, setUser] = useState<User>();


  const calcAge = (startDateStr: string, endDateStr: string) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    let yearDiff = endDate.getFullYear() - startDate.getFullYear();
    let monthDiff = endDate.getMonth() -  startDate.getMonth();
    let dayDiff = endDate.getDate() -  startDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      yearDiff--;
      if (monthDiff < 0) {
        monthDiff += 12;
      }

      if (dayDiff < 0) {
        dayDiff += new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          0
        ).getDate();
      }
    }
    
   
    return { years: yearDiff, months: monthDiff, days: dayDiff };    
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, fieldType: 'day' | 'month' | 'year') => {
    const value = parseInt(event.target.value);
    
    if (fieldType === 'day') {
      setInputDay(value);
    } else if (fieldType === 'month') {
      setInputMonth(value);
    } else {
      setInputYear(value);
    }

  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentDate = new Date(); 
    const currentDateStr = currentDate.toISOString().slice(0, 10);

    const age = calcAge(`${inputYear}-${inputMonth}-${inputDay}`, currentDateStr);
    console.log(`${age.years} years, ${age.months} months, ${age.days} days`);
    setUser(age);
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
              onChange={(event) => handleInputChange(event, 'day')} 
            />
          </div>
          <div className="month input">
            <label htmlFor="month">MONTH</label>
            <input 
              type="number" 
              id="month"
              onChange={(event) => handleInputChange(event, 'month')}
              />
          </div>
          <div className="year input">
            <label htmlFor="year">YEAR</label>
            <input 
              type="number" 
              id="year"
              onChange={(event) => handleInputChange(event, 'year')}
              />
          </div>
        </div>
        <hr />
        <button>Calculate</button>
        <hr />
        <div className="output-section">
          <div className="year-output">{user?.years} years</div>
          <div className="month-output">{user?.months} months</div>
          <div className="day-output">{user?.days} days</div>
        </div>
      </form>
    </div>
  )
}

export default App
