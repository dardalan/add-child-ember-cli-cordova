import Ember from 'ember';

export default Ember.Component.extend({
  isFlavorBoy: false,
  isFlavorGirl: false,
  isFlavorPregnant: false,
  birthDate: '',
  flavor: '',
  showPlaceholder: '',

  actions: {
    setFlavor: function(type) {
      this.set('flavor', type);
    }
  }
});
