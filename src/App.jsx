import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001');
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.changeUserName = this.changeUserName.bind(this);
  }

  changeUserName(name) {
    this.setState({currentUser: { name }});
  }

  // Get new message from the Chart Bar and send to the Socket Server
  addNewMessage(messageText) {

    const newMessageObj = {
      username: this.state.currentUser.name,
      content: messageText
    };
    
    this.socket.send(JSON.stringify(newMessageObj)); 
  }

  componentDidMount() {

    // Get new message from the server and push to the array "messages" in the this.state
    const messages = this.state.messages;

    this.socket.onmessage = (event) => {
      const newMessageObj = JSON.parse(event.data);
      messages.push(newMessageObj);

      this.setState({
       messages: messages
     });

    }

  }

  render() {

    return (
      <React.Fragment>
        <NavBar />
        <MessageList messages={this.state.messages}/>
        <ChatBar username={this.state.currentUser.name} 
        onUserNameChange={ this.changeUserName }
        newMessage={this.addNewMessage.bind(this)}/>
      </React.Fragment>
    );
  }
}

export default App;