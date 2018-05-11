import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      menuOpen: false
    };

    this.handleMenu = this.handleMenu.bind(this);
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  handleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }

  render() {
    const { menuOpen } = this.state;
    return (
      <div className="navbar">
        <nav>
          <div
            className={menuOpen ? 'change menu' : 'menu'}
            onClick={this.handleMenu}
          >
            <div>
              <div className="bar1" />
              <div className="bar2" />
              <div className="bar3" />
            </div>
          </div>
          <div className="text-center">
            <p>Stock Market Api</p>
          </div>
          <div className="time">
            <p>{this.state.date.toLocaleTimeString()}</p>
          </div>
        </nav>
        {menuOpen ? (
          <div onClick={this.handleMenu} className="nav-links">
            <Link to="/">
              <p>All Products</p>
            </Link>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Navbar;
