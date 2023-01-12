import React, { useState } from 'react';
function Controls() {
    const [time, setTime] = useState('24h');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setTime(event.target.time.value);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="time">
          Select time:
          <select id="time" name="time">
            <option value="24h">24 hours</option>
            <option value="7d">7 days</option>
            <option value="30d">30 days</option>
          </select>
        </label>
        <button type="submit">Update</button>
      </form>
    );
  }
  export default Controls;