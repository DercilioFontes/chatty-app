import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const messages = this.props.messages;
    const messagesList = messages.map((message) => {
      return (
        <Message 
          key={message.id}
          username={message.username}
          content={message.content}
        />
      );
    });

    return (
      <main className="messages">
        {messagesList}
      </main>
    );
  }
}
export default MessageList;