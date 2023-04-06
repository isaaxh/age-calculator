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
  const [errorYear, setErrorYear] =  useState<string>();
  const [errorMonth, setErrorMonth] =  useState<string>();
  const [errorDay, setErrorDay] =  useState<string>();
  const [isError, setIsError] = useState<boolean>();


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

  const isLeapYear= (year: number) => {
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      console.log(`${year} is leap year`);
      return true;
    } else {
      return false;
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsError(false);
    setErrorYear('');
    setErrorMonth('');
    setErrorDay('');
    const currentDate = new Date(); 
    const currentDateStr = currentDate.toISOString().slice(0, 10);
    const currentYear = currentDate.getFullYear();
    const isCurrentLeapYear = isLeapYear(currentYear);

    if (inputYear > currentYear) {
      setErrorYear('Must be in the past');
      setIsError(true);
      return;
    }

    if (inputMonth < 1 || inputMonth > 12) {
      setErrorMonth('Must be a valid month');
      setIsError(true);
      return;
    }

    if (inputDay < 0 || inputDay > 31) {
      setErrorDay('Must be a valid day')
      setIsError(true)
      return;
    }

    if (inputMonth === 2) {
      const daysInFebruary = isCurrentLeapYear ? 29 : 28;
      if (inputDay > daysInFebruary) {
        setErrorDay('Must be a valid day');
        setIsError(true);
        return;
      }
    }

    const age = calcAge(`${inputYear}-${inputMonth}-${inputDay}`, currentDateStr);
    console.log(`${age.years} years, ${age.months} months, ${age.days} days`);
    setUser(age);
  }

  return (
    <div className="background">
      <form className="card" onSubmit={handleFormSubmit}>
        <div className="input-section">
          <div className="day input">
            <label className="error" htmlFor="day">DAY</label>
            <input 
              type="number" 
              className='error-field'
              id="day" 
              onChange={(event) => handleInputChange(event, 'day')} 
              placeholder='DD'
            />
            <p className="error">{errorDay}</p>
          </div>
          <div className="month input">
            <label htmlFor="month">MONTH</label>
            <input 
              type="number" 
              id="month"
              onChange={(event) => handleInputChange(event, 'month')}
              placeholder='MM'
              />
              <p className="error">{errorMonth}</p>
          </div>
          <div className="year input">
            <label htmlFor="year">YEAR</label>
            <input 
              type="number" 
              id="year"
              onChange={(event) => handleInputChange(event, 'year')}
              placeholder='YYYY'
              />
              <p className="error">{errorYear}</p>
          </div>
        </div>
        <hr />
        <button>Calculate</button>
        <hr />
        <div className="output-section">
          <div className="output"><span className='year output-value'>{user?.years}</span> years</div>
          <div className="output"><span className='month output-value'>{user?.months}</span> months</div>
          <div className="output"><span className='day output-value'>{user?.days}</span> days</div>
        </div>
      </form>
    </div>
  )
}

export default App
