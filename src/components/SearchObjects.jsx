import React, { useState, useEffect } from 'react';
const SearchObjects = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const [timer, setTimer] = useState(null);
  const handleChange = (e) => {
    const value = e.target.value;
    //props.searchValue(e.target.value);
    setSearchValue(value);
  };
  useEffect(() => {
    if (timer) {
      clearTimeout(timer); 
    }
    const newTimer = setTimeout(() => {
      props.searchValue(searchValue);;
    }, 1700);
    setTimer(newTimer);

    return () => clearTimeout(timer); 

  }, [searchValue]);

  return (
   <div>
    {console.log("ji")}
    <form
      method='POST'
      onSubmit={(e) => {
        e.preventDefault();
      }}
      name='formName'
      className='center'
    >
      <label>
        <span>Search Objects: </span>
        <input
          autoComplete='off'
          type='text'
          name='searchTerm'
          onChange={handleChange}
        />
      </label>
    </form>
    </div>
  );
};

export default SearchObjects;
