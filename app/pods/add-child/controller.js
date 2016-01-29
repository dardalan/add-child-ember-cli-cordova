import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  imagePath: 'images/img-avatar.png',
  fullName: 'Sally Smith',
  flavor: 'Boy',
  birthDate: '',
  childs: [],

  showPlaceholder: Ember.computed('birthDate', function() {
    return Ember.isEmpty(this.get('birthDate')) ? `Date of birth` : ``
  }),

  isFlavorBoy: Ember.computed.equal('flavor', 'Boy'),
  isFlavorGirl: Ember.computed.equal('flavor', 'Girl'),
  isFlavorPregnant: Ember.computed.equal('flavor', 'Pregnant'),

  actions: {
    addChild: function() {
      if (!Ember.isEmpty(this.get('birthDate'))) {
        this.get('childs').pushObject(Ember.Object.create({
          flavor: this.get('flavor'),
          birthDate: moment(this.get('birthDate'), 'YYYY-MM-DD').format('MM/DD/YYYY')
        }));

        this.setProperties({flavor: 'Boy', birthDate: ''});
      }
    },

    removeChild: function(child) {
      this.get('childs').removeObject(child);
    },

    editPhoto: function() {
      this.transitionToRoute('photo');
    }
  }
});
