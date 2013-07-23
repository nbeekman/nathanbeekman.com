$(function() {
  var twoFace = new Two({
    fullscreen: false
  }).appendTo(document.getElementById("eyes"));

  Two.Resolution = 32;
  twoFace.width = 960;
  twoFace.height = 480;
  
  var blob = twoFace.makeCircle(230, twoFace.height / 2, twoFace.height / 3);
  blob.fill = 'black';
  blob.noStroke();
  blob.scale = 0.5;
  
  var blob2 = twoFace.makeCircle(530, twoFace.height / 2, twoFace.height / 3);
  blob2.fill = 'black';
  blob2.noStroke();
  blob2.scale = 0.5;
  
  for (var i = 0; i < blob.vertices.length; i++) {
    var v = blob.vertices[i];
    v.ink = Math.random() * 0.001;
  }
  reset();

  twoFace
    .bind('update', function() {
      reset();
      for (var i = 0; i < blob.vertices.length; i++) {
        var v = blob.vertices[i];
        var d = v.destination;
        v.x = d.x;
        v.y = d.y;
      }
      
      for (var i = 0; i < blob.vertices.length; i++) {
        var v2 = blob2.vertices[i];
        var d2 = blob.vertices[blob2.vertices.length-1-i].destination;
        v2.x = d2.x * -1;
        v2.y = d2.y;
      }
    }).play();

  function reset() {
    for (var i = 0; i < blob.vertices.length; i++) {
      var v = blob.vertices[i];
      var pct = (i + 1) / blob.vertices.length;
      var theta = pct * Math.PI * 2;
      var radius = 250;
      var x = radius * Math.cos(theta) + Math.cos(theta) * (Math.sin(i+Date.now()*v.ink)*60);
      var y = radius * Math.sin(theta) + Math.sin(theta) * (Math.sin(i+Date.now()*v.ink)*60);
      v.destination = new Two.Vector(x, y);
    }
  }
});

$(function() {
  var twoFace = new Two({
    fullscreen: false
  }).appendTo(document.getElementById("mouth"));

  Two.Resolution = 32;
  twoFace.width = 960;
  twoFace.height = 480;
  
  var blob = twoFace.makeEllipse(315, twoFace.height / 2, twoFace.height, twoFace.height / 3);
  blob.fill = 'black';
  blob.noStroke();
  blob.scale = 0.4;
  
  var blob2 = twoFace.makeEllipse(445, twoFace.height / 2, twoFace.height, twoFace.height / 3);
  blob2.fill = 'black';
  blob2.noStroke();
  blob2.scale = 0.4;
  
  for (var i = 0; i < blob.vertices.length; i++) {
    var v = blob.vertices[i];
    v.ink = Math.random() * 0.001;
  }
  reset();

  twoFace
    .bind('update', function() {
      reset();
      for (var i = 0; i < blob.vertices.length; i++) {
        var v = blob.vertices[i];
        var d = v.destination;
        v.x = d.x;
        v.y = d.y;
      }
      
      for (var i = 0; i < blob.vertices.length; i++) {
        var v2 = blob2.vertices[i];
        var d2 = blob.vertices[blob2.vertices.length-1-i].destination;
        v2.x = d2.x * -1;
        v2.y = d2.y;
      }
    }).play();

  function reset() {
    for (var i = 0; i < blob.vertices.length; i++) {
      var v = blob.vertices[i];
      var pct = (i + 1) / blob.vertices.length;
      var theta = pct * Math.PI * 2;
      var radius = 200;
      var x = radius * Math.cos(theta) + Math.cos(theta) * (Math.sin(i+Date.now()*v.ink)*60);
      var y = radius * Math.sin(theta) + Math.sin(theta) * (Math.sin(i+Date.now()*v.ink)*60);
      v.destination = new Two.Vector(x, y);
    }
  }
});

$(function() {
  var twoFace = new Two({
    fullscreen: false
  }).appendTo(document.getElementById("cheeks"));

  Two.Resolution = 32;
  twoFace.width = 960;
  twoFace.height = 480;
  
  var blob = twoFace.makeCircle(150, twoFace.height / 2, twoFace.height / 3);
  blob.fill = 'black';
  blob.noStroke();
  blob.scale = 0.4;
  
  var blob2 = twoFace.makeCircle(600, twoFace.height / 2, twoFace.height / 3);
  blob2.fill = 'black';
  blob2.noStroke();
  blob2.scale = 0.4;
  
  for (var i = 0; i < blob.vertices.length; i++) {
    var v = blob.vertices[i];
    v.ink = Math.random() * 0.001;
  }
  reset();

  twoFace
    .bind('update', function() {
      reset();
      for (var i = 0; i < blob.vertices.length; i++) {
        var v = blob.vertices[i];
        var d = v.destination;
        v.x = d.x;
        v.y = d.y;
      }
      
      for (var i = 0; i < blob.vertices.length; i++) {
        var v2 = blob2.vertices[i];
        var d2 = blob.vertices[blob2.vertices.length-1-i].destination;
        v2.x = d2.x * -1;
        v2.y = d2.y;
      }
    }).play();

  function reset() {
    for (var i = 0; i < blob.vertices.length; i++) {
      var v = blob.vertices[i];
      var pct = (i + 1) / blob.vertices.length;
      var theta = pct * Math.PI * 2;
      var radius = 150;
      var x = radius * Math.cos(theta) + Math.cos(theta) * (Math.sin(i+Date.now()*v.ink)*40);
      var y = radius * Math.sin(theta) + Math.sin(theta) * (Math.sin(i+Date.now()*v.ink)*40);
      v.destination = new Two.Vector(x, y);
    }
  }
});