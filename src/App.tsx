import { useState } from 'react';
import './App.css'
import moment, { weekdaysShort } from 'moment';

function App() {
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);


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


  // const calcAge = (day: number, month: number, year: number) => {
  //   const MILLISECINAYEAR = 31536000000;
    

  //   const birthDate = new Date(`${year}-${month}-${day}`)
  //   const currentDate = new Date();
  //   const ageInMilliSec = currentDate.valueOf() - birthDate.valueOf();
    
  //   const numYears = ageInMilliSec /  MILLISECINAYEAR;
  //   const years = Math.floor(numYears);
  //   const numMonths = (numYears - years) * 12;
  //   const months = Math.floor(numMonths);
  //   const days = Math.floor((numMonths - months) * 30.44);
  //   console.log(`${years} years, ${months} months, ${days} days`);
  // }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, fieldType: 'day' | 'month' | 'year') => {
    const value = parseInt(event.target.value);
    
    if (fieldType === 'day') {
      setDay(value);
    } else if (fieldType === 'month') {
      setMonth(value);
    } else {
      setYear(value);
    }

  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usersAge = calcAge('1999-11-01', '2023-04-06');

    console.log(`${usersAge.years} years, ${usersAge.months} months, ${usersAge.days} days`);
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
          <div className="year-output">{year} years</div>
          <div className="month-output">{month} months</div>
          <div className="day-output">{day} days</div>
        </div>
      </form>
    </div>
  )
}

export default App
