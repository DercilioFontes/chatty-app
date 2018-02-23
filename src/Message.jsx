import React, {Component} from 'react';

class Message extends Component {

  // Render a message and check if is system or user message
  render() {

    const userColorStyle = {color: this.props.userColor};
    return (
      <React.Fragment>
        <div className={(this.props.type === 'incomingNotification') ? 'message system' : 'message'}>
          <span className="message-username" style={userColorStyle}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      </React.Fragment>
    );
  }
}
export default Message;