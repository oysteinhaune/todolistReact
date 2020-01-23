import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { apiResponse: ""}
  }

  callAPI() {
    fetch("http://localhost:9000")
    .then(res => res.text())
    .then(res => this.setState({ apiResponse: res}))
  }

  componentDidMount() {
    this.callAPI()
  }

  render() {

    return (
      <div>
        < Header />

        <div className="box" id="heading">
          <h1> {this.state.apiResponse.listTitle} </h1>
          <p> {this.state.apiResponse.date} </p>
        </div>

        <div className="box">
          {
            this.state.apiResponse.newListItems.forEach((item) => {
              <div className="item">
                <form className="item" action="/delete" method="post">
                  <input type="checkbox" name="checkbox" value={item._id} onChange="this.form.submit()"></input>
                  <p>{item.name}</p>
                  <input type="hidden" name="listName" value={item.listTitle}></input>
                </form>
              </div>
          })
        }
        {
        this.state.apiResponse.newListItems.forEach((item) => {
            <form className="item" action="/" method="post">
              <input type="text" name="newItem" placeholder="New Item" autocomplete="off" autofocus></input>
              <button type="submit" name="list" value={item.listTitle}>+</button>
            </form>

      })
}
</div>
      < Footer />
      </div>
    )
}
}

export { App };
