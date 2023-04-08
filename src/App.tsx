import { useEffect, useState } from 'react';
import './App.css'

interface User {
  years?: number;
  months?: number;
  days?: number;
}

interface componentTyping {
  handleError: (currentYear: number) => void;
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


  function daysToYMD(days: number) {
    const years = Math.floor(days / 365.25);
    const months = Math.floor((days - years * 365.25) / 30.44);
    const remainingDays = Math.floor(days - years * 365.25 - months * 30.44);
  
    return {years, months, days: remainingDays};
  }

  const calcAge = (birthDateStr: string, currentDateStr: string) => {
    const birthDate = new Date(birthDateStr);
    const currentDate = new Date(currentDateStr);

    const miliSecDiff = currentDate.getTime() - birthDate.getTime();
    const days = miliSecDiff / 86400000;
    
    const dateDiff = daysToYMD(days);
    
    return { years: dateDiff.years, months: dateDiff.months, days: dateDiff.days };    
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
      
      // handle error
      
      if (inputDay === 0) {
        setErrorDay('Must be a valid date')
        setIsError(true);
      }
      if (inputMonth === 0) {
        setErrorMonth('Must be a valid month')
        setIsError(true);
      } 
      if (inputYear === 0) {
        setErrorYear('Must be a valid year')
        setIsError(true);
      }
  
      
      if (inputMonth < 1 || inputMonth > 12) {
        setErrorMonth('Must be a valid month');
        setIsError(true);
        return;
      }
        
      if (inputYear > currentYear) {
        setErrorYear('Must be in the past');
        setIsError(true);
        return;
      }
      
      let daysInMonth;
      
      switch(inputMonth) {
        case 2:
          daysInMonth = isCurrentLeapYear ? 29 : 28;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          daysInMonth = 30;
          break;
        default:
          daysInMonth = 31;
          break;
      }
    
      if (inputDay < 1 || inputDay > daysInMonth) {
        setErrorDay('Must be a valid date')
        setIsError(true)
        return;
      }

      const age = calcAge(`${inputYear}-${inputMonth}-${inputDay}`, currentDateStr);
      setUser(age);
  }

  return (
    <div className="background">
      <form className="card" onSubmit={handleFormSubmit}>
        <div className="input-section">
          <div className="day input-container">
            <label className="" htmlFor="day">DAY</label>
            <input 
              type="number" 
              id="day" 
              onChange={(event) => handleInputChange(event, 'day')} 
              placeholder='DD'
            />
            <p className="error">{errorDay}</p>
          </div>
          <div className="month input-container">
            <label htmlFor="month">MONTH</label>
            <input 
              type="number" 
              id="month"
              onChange={(event) => handleInputChange(event, 'month')}
              placeholder='MM'
              />
              <p className="error">{errorMonth}</p>
          </div>
          <div className="year input-container">
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
        <div className='btn-container'>
          <hr />
          <button className='btn-calc'>
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="48" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" strokeWidth="3"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g></svg>
          </button>
          <hr className='hr-2' />
        </div>
        <div className="output-section">
          <div className="output"><span className='year output-value'>{user ? user?.years : "- -"}</span> years</div>
          <div className="output"><span className='month output-value'>{user ? user?.months: "- -"}</span> months</div>
          <div className="output"><span className='day output-value'>{user ? user?.days : "- -"}</span> days</div>
        </div>
      </form>
    </div>
  )
}

export default App
