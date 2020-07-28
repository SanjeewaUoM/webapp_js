import React from 'react';

const UserList = (props) => {
  console.log(props.rows[0]);
  return props.rows
    ? props.rows.map((row) => (
        <ul key={row.id}>
          <li>{row.displayName}</li>
          <li>{row.userPrincipalName}</li>
        </ul>
      ))
    : null;
};

export default UserList;
