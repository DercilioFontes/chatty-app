import React, {Component} from 'react';

class Message extends Component {

  changeTextToImage() {
    const https = /https:\/\//;
    const www = /www/;
    const jpg = /jpg/;
    const png = /png/;
    const gif = /gif/;
    const content = this.props.content;

    if ( 
      ( https.test(content) || www.test(content) ) && 
      ( jpg.test(content) || png.test(content) || gif.test(content) ) 
      ) {
        const indexStart = content.indexOf('https');
        const inedxEnd = (content.indexOf('jpg') || 
                          content.indexOf('png') || 
                          content.indexOf('gif')) + 3;
        const url = content.substring(indexStart, inedxEnd);
        const spanStyle = {display: 'block'};
        const imgStyle = { width: '60%' };

        return (<div>
                  <span className="message-content" style={spanStyle}>{content}</span>
                  <img src= {url} style={imgStyle}/>
                </div>);
      } else {
        return (  <React.Fragment>
                    <span className="message-content">{content}</span>
                  </React.Fragment> );
      }
  }

  // Render a message and check if is system or user message
  render() {

    const textOrImage = this.changeTextToImage();

    const userColorStyle = {color: this.props.userColor};
    return (
      <React.Fragment>
        <div className={(this.props.type === 'incomingNotification') ? 'message system' : 'message'}>
          <span className="message-username" style={userColorStyle}>{this.props.username}</span>
          {textOrImage}
        </div>
      </React.Fragment>
    );
  }
}
export default Message;