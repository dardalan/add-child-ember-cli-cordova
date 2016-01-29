import Ember from "ember";

export default Ember.Mixin.create({
  loadCanvas: function() {
    Ember.run.schedule('afterRender', this, function() {

      var theCanvas = document.getElementById("theCanvas");
      var drawingUtil = new DrawingUtil(theCanvas);

      theCanvas.width = window.innerWidth;
      theCanvas.height = window.innerHeight;

      function DrawingUtil(aCanvas) {
        var canvas = aCanvas;
        var context = canvas.getContext("2d");
        var isDrawing = false;
        context.lineWidth = 15;
        context.strokeStyle = 'blue';

        init();

        function start(event) {
          isDrawing = true;
          context.beginPath();
          context.moveTo(getX(event),getY(event));
          event.preventDefault();
        }

        function draw(event) {
          if(isDrawing) {
            context.lineTo(getX(event),getY(event));
            context.stroke();
          }
          event.preventDefault();
        }

        function stop(event) {
          if(isDrawing) {
            context.closePath();
            context.stroke();
            isDrawing = false;
          }
          event.preventDefault();
        }

        function getX(event) {
          if(event.type.indexOf("touch") > -1) {
            return event.targetTouches[0].pageX;
          }
          else {
            return event.pageX;
          }
        }

        function getY(event) {
          if(event.type.indexOf("touch") > -1) {
            return event.targetTouches[0].pageY;
          }
          else {
            return event.pageY;
          }
        }

        function init() {
          canvas.addEventListener("touchstart",start,false);
          canvas.addEventListener("touchmove",draw,false);
          canvas.addEventListener("touchend",stop,false);
          canvas.addEventListener("mousedown",start,false);
          canvas.addEventListener("mousemove",draw,false);
          canvas.addEventListener("mouseup",stop,false);
          canvas.addEventListener("mouseout",stop,false);
        }
      }
    });
  },

  actions: {
    clearCanvas: function() {
      var canvas = document.getElementById("theCanvas"),
        ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height)
    },

    onChangeColor: function() {
      var canvas = document.getElementById("theCanvas"),
        ctx = canvas.getContext("2d");

      ctx.strokeStyle = $('input')[0].value;
    }
  }
});
