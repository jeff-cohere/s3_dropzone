import React from 'react';
import { render } from 'react-dom';

import {App} from './App';

// set up fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(<App />, document.getElementById('root'));
