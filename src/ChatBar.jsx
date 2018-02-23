import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { messageText: ''};
    this.onMessageTextChange = this.onMessageTextChange.bind(this);
    this.onMessageTextPressEnter = this.onMessageTextPressEnter.bind(this);
  }

  // Get changes in the message input
  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }

  // Get Enter to addNewMessage in the App.jsx
  onMessageTextPressEnter(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(this.state.messageText);
      this.setState({messageText: ''});
    }
  }
  
  render() {

    const { messageText } = this.state;
    // Functions form the App.jsx to handle inputs
    const { onUserNameChange, onUserNamePressEnter, username } = this.props;

    return (
      <footer className="chatbar">
        <input className="chatbar-username" 
        defaultValue={ username } 
        onChange={ e => onUserNameChange(e.target.value) }
        onKeyPress={ e => onUserNamePressEnter(e) }/>
        <input className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          value={ messageText }
          onChange={ this.onMessageTextChange }
          onKeyPress={ this.onMessageTextPressEnter } />
      </footer>
    );
  }
}
export default ChatBar;