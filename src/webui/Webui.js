import React, { useState } from 'react';
import UserList from './UserList';
import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const MS_GRAPH_SCOPE = 'https://graph.microsoft.com/.default';

function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

let token =
  'eyJ0eXAiOiJKV1QiLCJub25jZSI6ImJ3MGt0QW5jTzA3YnhTcmphX0dXU3BtTHZuTnN4MkJKYjUycWNJMGRKcU0iLCJhbGciOiJSUzI1NiIsIng1dCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSIsImtpZCI6Imh1Tjk1SXZQZmVocTM0R3pCRFoxR1hHaXJuTSJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xZGViNWFjNC1iM2YxLTRhOWQtYjcyMC04MjA0YTQ5ZDJhNjAvIiwiaWF0IjoxNTk1OTIxOTE3LCJuYmYiOjE1OTU5MjE5MTcsImV4cCI6MTU5NTkyNTgxNywiYWlvIjoiRTJCZ1lKRHU4RzNhSUhUTnBqTnhWZmorakkyVEFBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJUZXN0IEFwcCIsImFwcGlkIjoiYWNmN2NhYzMtNWZlNS00YzdlLWEwODYtZjMxNTUyZTU3ZGY0IiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMWRlYjVhYzQtYjNmMS00YTlkLWI3MjAtODIwNGE0OWQyYTYwLyIsIm9pZCI6ImJjOGU0OTdkLTMyYzktNGIyZS05MDA2LTc3ZDlmNjhhMDM5NyIsInJvbGVzIjpbIlVzZXIuUmVhZC5BbGwiLCJVc2VyLkV4cG9ydC5BbGwiXSwic3ViIjoiYmM4ZTQ5N2QtMzJjOS00YjJlLTkwMDYtNzdkOWY2OGEwMzk3IiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiMWRlYjVhYzQtYjNmMS00YTlkLWI3MjAtODIwNGE0OWQyYTYwIiwidXRpIjoiTjE2SHhMejVpMHlXVnBtZzU1czdBUSIsInZlciI6IjEuMCIsInhtc190Y2R0IjoxNTkxMzM3NjY0fQ.dGw1UBtOGvxCTMFpRloVrxdqP2U64Eiq0YjsJVy6EBwMHbEDXz6fuTxmKNils9x_y5zbP_WrLfjW-ShANi8xgNavTvXLSJoTTCW6URnnbEqnVf3IK0eTzULZMZ-3jxUywlGz7dsliNXkNto0vbtVDgEkHozH3NmtMC5LuEcqCgD2-jLGhSqjkm2dslXK1W0SV7aHBHe6zTHdl6mHRU7gtEeKPr_tejRKBSsw21-PQTAY6nnsZGmKI3dI9mT0aFaXKbM8LZhwd635kQS-n2RuJCZCo6y9KrLABoVE850YXahANNT-JaBYyedWzq97GnAasG_ccZlQNmBoQuYZYz_EAQ';

const Webui = () => {
  const tenenetName = React.useRef();
  const appId = React.useRef();
  const appSecret = React.useRef();
  const [rows, setRows] = useState(0);

  const getTenents = () => {
    const config = {
      method: 'get',
      url: 'https://graph.microsoft.com/v1.0/users',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    axios(config)
      .then(function (response) {
        const rows = response.data.value; // assgn response to
        setRows(rows);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = () => {
    const APP_ID = appId.current.value;
    const APP_SECERET = appSecret.current.value;
    const TOKEN_ENDPOINT =
      'https://login.microsoftonline.com/' + tenenetName.current.value + '/oauth2/v2.0/token';

    const postData = {
      client_id: APP_ID,
      scope: MS_GRAPH_SCOPE,
      client_secret: APP_SECERET,
      grant_type: 'client_credentials',
    };

    axios
      .post(TOKEN_ENDPOINT, qs.stringify(postData))
      .then((response) => {
        console.log(response.data);
        token = response.data.access_token;
        getTenents();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <label>
          App Id :
          <input ref={appId} />
        </label>
        <br />
        <label>
          App Secret :
          <input ref={appSecret} />
        </label>
        <br />
        <label>
          Tenant Id :
          <input ref={tenenetName} />
        </label>
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <br />
      <br />
      <div>
        <button onClick={getTenents}>View Users</button>
        <h3>user list</h3>
        <UserList rows={rows} />
      </div>
    </div>
  );
};

export default Webui;
