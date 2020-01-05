import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MockAsyncStorage from "mock-async-storage";

/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const { JSDOM } = require("jsdom");

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  });
}

// fetch
global.fetch = require('jest-fetch-mock');

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: "node.js"
};
copyProps(window, global);

const originalConsoleError = console.error;
console.error = message => {
  if (message.startsWith("Warning:")) {
    return;
  }
  originalConsoleError(message);
};

// SETUP MOCKS
// AsyncStorage
const mockImpl = new MockAsyncStorage();
jest.mock('AsyncStorage', () => mockImpl);

jest.mock('NativeAnimatedHelper');

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */

configure({ adapter: new Adapter() });



// Console
/*
global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
};*/
