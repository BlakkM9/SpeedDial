function updateColor(item)
{
	var Color = item.Color.toString();
	
	var gradient = document.getElementById("gradient");
	gradient.style.background = "-moz-linear-gradient(top,  rgba(" + hexToRgb(Color) + ",0) 0%, rgba(" + hexToRgb(Color) + ",1) 40%)";
	
	document.body.style.backgroundColor = "#" + Color;
	
	document.querySelector(".context-menu").Color = "#" + Color;
}

function updateGap(item)
{
	var Gap = item.Gap;
	var sizeAll = document.getElementById("all");
	var sizeContainer = document.getElementById("container");
	var yGap = document.querySelectorAll(".line");
	var xGap = document.querySelectorAll(".p");
	
	for (var i = 0; i < yGap.length ; i++)
	{
		yGap[i].style.marginTop = Gap + "px";
	}
	
	for (var i = 0; i < xGap.length ; i++)
	{
		xGap[i].style.marginLeft = Gap + "px";	
	}
	
	sizeAll.style.width = 1400 + 6 * Gap + "px";
	sizeAll.style.height = 680 + 4 * Gap + "px";
	sizeContainer.style.width = 1400 + 6 * Gap + "px";
	sizeContainer.style.top = 613 + 2 * Gap + "px";
}

function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}

function onError(error) {
  console.log(`Error: ${error}`);
}

//Get BackgroundColor from storage
var getColor = browser.storage.local.get("Color") || "#000000";
getColor.then(updateColor, onError);

//Get Gap from storage
var getGap = browser.storage.local.get("Gap") || "0";
getGap.then(updateGap, onError);

//Disable scrolling
window.onwheel = function(){ return false; }

//Loading Screen
function onReady(callback)
{
	var intervalID = window.setInterval(checkReady, 1000);

	function checkReady()
	{
		if (document.getElementsByTagName('body')[0] !== undefined)
		{
			window.clearInterval(intervalID);
			callback.call(this);
		}
	}
}

function show(id, value)
{
	document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function ()
{
	show('page', true);
	show('loader', false);
});