import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 'bsih',
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: 'klcs',
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    }
  }

  rando(){
    var letters = 'abcdefghijklmnopqrstuvwxyz';
    var alphabet = `0123456789${letters}${letters.toUpperCase()}`;
  
    var output = '';
    for (var i = 0; i < 6; i += 1) {
      output += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return output;
  }

  addNewMessage(messageText) {
    const newMessageObj = {
      id: this.rando(),
      username: this.state.currentUser.name,
      content: messageText
    };
    const newMessages = this.state.messages.concat(newMessageObj);

    this.setState({
      messages: newMessages
    });

  }

  componentDidMount() {
    console.log('componentDidMount <App />');
    setTimeout(() => {
      console.log('Simulating incoming message');
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {

    return (
      <React.Fragment>
        <NavBar />
        <MessageList messages={this.state.messages}/>
        <ChatBar user={this.state.currentUser} newMessage={this.addNewMessage.bind(this)}/>
      </React.Fragment>
    );
  }
}

export default App;