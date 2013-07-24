/* setting up the cookie so users don't have to seem animation past their first visit */
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}


/* two.js animation */
$(function() {

  //create cookie if none found
  var cookieValue = readCookie('nathanLogo');
  if(cookieValue != 'here'){
    createCookie('nathanLogo', 'here', 1);
  }
  /*
else{
    console.log('cookie found. its value is "' + cookieValue + '"');
    //eraseCookie('nathanLogo');
  }
*/

  var two = new Two({
    fullscreen: false
  }).appendTo(document.getElementById("nathan"));

  $.get('/img/nathanOutline.svg', function(doc) {

    var fresh = two.interpret($(doc).find('svg')[0]);
    
    //if cookie is present, don't do the animation
    if(cookieValue == "here"){
      var t = 1;
    }else{
      var t = 0;
    }
    var startOver, movingmouse = false;
    var hasFinished = false;
    var clearT = function() {
      //t = 0;
      setEnding(fresh, 0);
      startOver = _.after(60, clearT);
    };
    var stopMouse = _.debounce(function() {
      movingmouse = false;
    }, 1000);
    
    /* setting size of vector output */
    two.width = 320;
    two.height = 150;

    fresh.center().translation.set(two.width / 2, two.height / 2);
    fresh.distances = calculateDistances(fresh);
    fresh.total = 0;  fresh.stroke = 'white';
    fresh.linewidth = 1;
    fresh.fill = "white";
    fresh.scale = 0.5;
    _.each(fresh.distances, function(d) {
      fresh.total += d;
    });

    clearT();
    
    $("svg")
      .bind('mousemove', mousemove)
      .bind('touchmove', function(e) {
          var touch = e.originalEvent.changedTouches[0];
          mousemove({
            clientX: touch.pageX,
            clientY: touch.pageY
          });
        return false;
      });

    _.defer(function() {

      two
        .bind('resize', function() {

          fresh.translation.set(two.width / 2, two.height / 2);

        })
        .bind('update', function() {

          if (movingmouse) {
            return;
          }
          if (hasFinished == false) {
          
            if (t < 0.9999) {
              t += 0.00625;
            } else {
              hasFinished = true;
              startOver();
            }
            setEnding(fresh, t);
          }
        }).play();

    });

    function mousemove(e) {
      if (hasFinished == true) {
        var rect = fresh.getBoundingClientRect();
        movingmouse = true;
        t = cmap(e.clientX-(window.innerWidth/3.3)+320, rect.left, rect.right, 0, 1);
        setEnding(fresh, t);
        stopMouse();
        setTimeout(finishAnimation, 5000);
      }
    }
    
    function finishAnimation() {
      hasFinished = false;
      startOver();
    }

    function setEnding(group, t) {

      var i = 0;
      var traversed = t * group.total;
      var current = 0;

      _.each(group.children, function(child) {
        var distance = group.distances[i];
        var min = current;
        var max = current + distance;
        var pct = cmap(traversed, min, max, 0, 1);
        child.ending = pct;
        current = max;
        i++;
      });

    }

  });

});

function calculateDistances(group) {
  return _.map(group.children, function(child) {
    var d = 0, a;
    _.each(child.vertices, function(b, i) {
      if (i > 0) {
        d += a.distanceTo(b);
      }
      a = b;
    });
    return d;
  });
}

function clamp(v, min, max) {
  return Math.max(Math.min(v, max), min);
}

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}

function cmap(v, i1, i2, o1, o2) {
  return clamp(map(v, i1, i2, o1, o2), o1, o2);
}

/* Mobile screen lock */
/*
var lockTouchScreen = function( isLocked ) {
  if( isLocked == false ) {
    document.ontouchmove = null;
  } else {
    document.ontouchmove = function( event ) {
      event.preventDefault();
    };
  }
};
lockTouchScreen( isLocked = true );
*/

/* fade in on text below logo */
function addClass() {
  var descr = document.getElementById("nathanDescr");
  
  if(cookieValue == 'true'){
    descr.className = "";
  }else{
    descr.className += " fadeIn";
  }
}
if(cookieValue = 'true'){
  addClass();
}else{
  setTimeout(addClass, 3000);
}

function loadClass() {
  var content = document.getElementById("content");
  content.className = "load"
}
loadClass();
