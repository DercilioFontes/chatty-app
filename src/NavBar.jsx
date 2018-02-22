import React, {Component} from 'react';

class NavBar extends Component {
  render() {

    let usersOnline = `${this.props.numberUsersConnected} user online`;
    if (this.props.numberUsersConnected > 1) {
      usersOnline = `${this.props.numberUsersConnected} users online`;
    }

    return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p>{usersOnline}</p>
        </nav>
    );
  }
}
export default NavBar;