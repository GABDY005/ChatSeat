
import React, { useEffect } from 'react';
import { createUser, getUserByEmail } from '../Controller/UserController';

function TestUser() {
  useEffect(() => {
    const newUser ={
      firstName: 'Darshi',
      lastName: 'Gabani',
      email:'darshi@gmail.com',
      password:'123456',
      role: 'listener',
    };

    const createdUser = createUser(newUser);
    console.log('Created User:', createdUser);

    const found = getUserByEmail(newUser.email);
    console.log('Found User:', found);
  }, []);

  return (
    <div>
      <h1>Check your console for user data</h1>
    </div>
  );
}

export default TestUser;
