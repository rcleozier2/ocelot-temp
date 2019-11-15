import React from 'react';
import ReactDOM from 'react-dom';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Ocelot from './container/Ocelot'
import settings from './config/settings';

ReactDOM.render(<Ocelot />, document.getElementById('root'));
console.info(settings);