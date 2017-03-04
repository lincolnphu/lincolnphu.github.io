import React from 'react';
import ReactDOM from 'react-dom';
import Button from './DayTime';
import css from './css/style.css';
const App = () => (
  <div>
  <Button kind="primary"
  >Radium Button</Button>
  </div>
);


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
