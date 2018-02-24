import React, {Component} from 'react';

class Message extends Component {

  // Ckeck if has url to image (jpg, png or gif) and set a img tag
  changeTextToImage() {
    // RegEpx to test
    const https = /https:\/\//;
    const jpg = /jpg/;
    const png = /png/;
    const gif = /gif/;
    const content = this.props.content;

    if  ( https.test(content) && 
        ( jpg.test(content) || png.test(content) || gif.test(content) ) ) {

      const indexStart = content.indexOf('https');
      let indexEnd = null;
      if (jpg.test(content)) {
        indexEnd = content.indexOf('jpg') + 3;
      } else if (png.test(content)) {
        indexEnd = content.indexOf('png') + 3;
      } else {
        indexEnd = content.indexOf('gif') + 3;
      }
      const url = content.substring(indexStart, indexEnd);
      const imgStyle = { width: '60%' };

      return (<div className="message-content" >
                <span  >{content}</span>
                <img src={url} style={imgStyle}/>
              </div>);
    } else {
      return (<React.Fragment>
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