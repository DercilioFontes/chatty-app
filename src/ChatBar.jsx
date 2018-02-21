import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { messageText: ''};
  }

  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }

  onMessageTextPressEnter(event) {
    if (event.key === 'Enter') {
      this.props.newMessage(this.state.messageText);
      this.setState({messageText: ''});
    }
  }
  
  render() {  
    const name = this.props.user.name;

    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={name} disabled/>
        <input 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          value={this.state.messageText}
          onChange={this.onMessageTextChange.bind(this)}
          onKeyPress={this.onMessageTextPressEnter.bind(this)} />
      </footer>
    );
  }
}
export default ChatBar;