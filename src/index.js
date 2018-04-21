import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App';
import registerServiceWorker from './js/services/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
