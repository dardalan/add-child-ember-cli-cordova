import Ember from 'ember';
import CanvasDraw from 'add-child/mixins/controllers/canvas-draw';

export default Ember.Controller.extend(CanvasDraw, {
  currentImagePath: "background-image:url(images/original.jpg);",

  loadCanvas: function() {
    this._super();
  }.on('init'),

  actions: {
    changePicture: function() {
      var self = this;

      if (!navigator.camera) {
        alert("Camera API not supported", "Error");
        return;
      }
      var options =   {   quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: 0      // 0:Photo Library, 1=Camera, 2=Saved Album
        //encodingType: 0     // 0=JPG 1=PNG
      };

      navigator.camera.getPicture(
        function(imgData) {
          self.set('currentImagePath', "background-image:url(" + "data:image/jpeg;base64," + imgData + ");");
        },
        function() {
          alert('Error taking picture', 'Error');
        },
        options);

      return false;
    }
  }
});
