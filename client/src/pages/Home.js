

import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {

  const { user } = useSelector((state) => state.AuthReducer);

  return (
    <div className='container'>
      <h1>Welcome {user.username}</h1>
    </div>
  )
}

export default Home;