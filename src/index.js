import React from 'react';
import { render } from 'react-dom';

import {App} from './App';

// set up fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

// Read environment vars from .env.
require('dotenv').config();

// Fire it up!
render(<App />, document.getElementById('root'));
