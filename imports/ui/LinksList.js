import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';

export default class LinkList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    console.log('ComponentDidMount LinksList');
    this.linksTracker = Tracker.autorun(() => {
      const links = Links.find().fetch();
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    console.log('ComponentWillUnMount LinksList');
    this.linksTracker.stop();
  }
  renderLinksListItems() {
    return this.state.links.map((link) => {
      return <p key={link._id}>{link.url}</p>
    })
  }
  render() {
    return (
      <div>
        <p>Links list</p>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    );
  }
};
