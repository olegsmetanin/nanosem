import Server from './../../src/server/Server.js';
import webdriverio from 'webdriverio';

global.server = new Server();
global.webdriverio = webdriverio;

import './webdriver.js';


