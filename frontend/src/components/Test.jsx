import React, { useEffect, useState } from 'react';
import { getUsers } from '../network/dataset_api';

const UsersComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
      console.log(users);
    });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersComponent;