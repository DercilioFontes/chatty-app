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
    this.oldUserName = this.state.currentUser.name;
    this.changeUserName = this.changeUserName.bind(this);
    this.onUserNamePressEnter=this.onUserNamePressEnter.bind(this);
  }

  changeUserName(name) {
    this.setState({currentUser: { name }});
  }

  sendNotificationOfChangedUserName() {
    const newNotificationObj = {
      type: 'postNotification',
      oldUserName: this.oldUserName,
      newUserName: this.state.currentUser.name,
    };
    this.oldUserName = this.state.currentUser.name;
    this.socket.send(JSON.stringify(newNotificationObj));
  }

  onUserNamePressEnter(event) {
    if (event.key === 'Enter') {
      this.sendNotificationOfChangedUserName();
    }
  }

  // Get new message from the Chart Bar and send to the Socket Server
  addNewMessage(messageText) {

    // Check if also user have changed their name and send notification
    if(this.oldUserName !== this.state.currentUser.name) {
      this.sendNotificationOfChangedUserName();
    }
    const newMessageObj = {
      type: 'postMessage',
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

      ////// THIS SWITCH DOES NOTHING YET!!! /////
      switch(newMessageObj.type){ /////////////
        case 'incomingMessage':
        messages.push(newMessageObj);
          this.setState({
            messages: messages
          });
          break;
        case 'incomingNotification':
        messages.push(newMessageObj);
          this.setState({
            messages: messages
          });
          break;
        default:
          throw new Error('Unknown event type ' + newMessageObj.type);
      }
    }
  }

  render() {

    return (
      <React.Fragment>
        <NavBar />
        <MessageList messages={this.state.messages}/>
        <ChatBar username={this.state.currentUser.name} 
        onUserNameChange={ this.changeUserName }
        onUserNamePressEnter={this.onUserNamePressEnter}
        newMessage={this.addNewMessage.bind(this)}/>
      </React.Fragment>
    );
  }
}

export default App;