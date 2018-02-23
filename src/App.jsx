import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001');
    this.state = {
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      numberUsersConnected: ''
    }
    this.oldUserName = this.state.currentUser.name;
    this.changeUserName = this.changeUserName.bind(this);
    this.onUserNamePressEnter=this.onUserNamePressEnter.bind(this);
  }

  // Get changes in the username input field and set to the state
  changeUserName(name) {
    this.setState({currentUser: { name }});
  }

  // Send msg notification to the socket server after username have changed the name
  sendNotificationOfChangedUserName() {
    const newNotificationObj = {
      type: 'postNotification',
      oldUserName: this.oldUserName,
      newUserName: this.state.currentUser.name,
    };
    this.oldUserName = this.state.currentUser.name;
    this.socket.send(JSON.stringify(newNotificationObj));
  }

  // Get the Enter key when the username change the name
  onUserNamePressEnter(event) {
    if (event.key === 'Enter') {
      this.sendNotificationOfChangedUserName();
    }
  }

  // Get new message from the Chart Bar and send to the Socket Server
  addNewMessage(messageText) {

    // Check if also user have changed their name and send notification too
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

    // Get new message from the server and push to the array "messages" of the state
    const messages = this.state.messages;

    this.socket.onmessage = (event) => {
      const newMessageObj = JSON.parse(event.data);

      switch(newMessageObj.type){ 

        case 'numberUsersConnectedNotification':
          // Case a new message from socket server about user jointing or leaving the channel and update the numberUsersConnected in the state
          // Change the message type to show as system's message
          newMessageObj.type = 'incomingNotification';
          messages.push(newMessageObj);
          this.setState({
            messages: messages,
            numberUsersConnected: newMessageObj.numberUsersConnected
          });
          break;

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
        <NavBar numberUsersConnected={this.state.numberUsersConnected}/>
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser.name} 
        onUserNameChange={ this.changeUserName }
        onUserNamePressEnter={this.onUserNamePressEnter}
        newMessage={this.addNewMessage.bind(this)}/>
      </React.Fragment>
    );
  }
}

export default App;