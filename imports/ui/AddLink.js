import React from 'react';
import { Meteor } from 'meteor/meteor'

export default class AddLink extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: ''
    }
  }
  onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.setState({ url: '' });
        }
      });
    }
  }
  onChange(e) {
    this.setState({
      url: e.target.value
    });
  }
  render() {
    return (
      <div>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.url}
            placeholder="URL"
            onChange={this.onChange.bind(this)}/>
          <button>Add Link</button>
        </form>
      </div>
    )
  }
}
