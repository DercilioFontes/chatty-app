# Project Chatty App
### Lighthouse Labs (Vancouver - BC)

Chatty App is a chat web SPA (Single Page Application), like Slack or WhatsApp, built with ReactJS, Babel and WebPack that communicates with a server via WebSocekts (using Node package ws on the server-side, and native WebSocket on client side) for multi-user real-time updates.

## Final Product

![Showing a user view](https://raw.githubusercontent.com/DercilioFontes/chatty-app/master/docs/screenshot1.png)
![Showing another user view](https://raw.githubusercontent.com/DercilioFontes/chatty-app/master/docs/screenshot2.png)

## Dependencies

- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server
- react
- react-dom

- WebSockets server
  - express
  - ws
  - uuid

## Getting Started

Install the dependencies and start the server.

``` cli
npm install
npm start
open http://localhost:3000
```

## Instrutions

Run Websocket Server in the folder chatty_server

``` cli
npm install
npm start
```
