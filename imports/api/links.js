import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import shortid from 'shortid';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Links = new Mongo.Collection('links');

const Link = new SimpleSchema({
  _id: {
    type: String,
    min: 1
  },
  url: {
    type: String,
    label: 'Your link',
    regEx: SimpleSchema.RegEx.Url
  },
  visible: {
    type: Boolean
  },
  userId: {
    type: String,
    min: 1
  },
  visitedCount: {
    type: Number,
    min: 0
  },
  lastVisitedAt: {
    type: String,
    optional: true
  },
});

Links.attachSchema(Link);

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    });
  },

  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Links.update({_id, userId: this.userId}, {
      $set: { visible }
    })
  },

  'links.trackVisit'(_id) {
    Links.update({ _id }, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })
  }
});
