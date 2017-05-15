/**Variables*/

var contextMenuClassName = "context-menu";
var contextMenuItemClassName = "context-menu__item";
var contextMenuLinkClassName = "context-menu__link";
var contextMenuActive = "context-menu--active";

var taskItemClassName = 'task';
var taskItemInContext;

var clickCoords;
var clickCoordsX;
var clickCoordsY;

var menu = document.querySelector("#context-menu");
var menuItems = menu.querySelectorAll(".context-menu__item");
var menuState = 0;
var menuWidth;
var menuHeight;
var menuPosition;
var menuPositionX;
var menuPositionY;

var windowWidth;
var windowHeight;

//Disables default context menu
document.addEventListener('contextmenu', dblDefaultContextmenu, false)

function dblDefaultContextmenu(e)
{
	e.preventDefault();
}

/**
* Initialise our application's code.
*/
function init()
{
	contextListener();
	clickListener();
	keyupListener();
	resizeListener();
}

function resizeListener()
{
	window.onresize = function(e)
	{
		toggleMenuOff();
	};
}

/**
* Listens for contextmenu events.
*/
function contextListener()
{
	document.addEventListener( "contextmenu", function(e)
	{
		if ( clickInsideElement( e, taskItemClassName ) )
		{
			toggleMenuOn();
			positionMenu(e);
		}
		else
		{
			toggleMenuOff();
		}
	});
}

/**
* Listens for click events.
*/

function clickListener()
{
	document.addEventListener( "click", function(e)
	{
	var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );

	if ( clickeElIsLink )
	{
		menuItemListener( clickeElIsLink );
	}
	else
	{
		var button = e.which || e.button;
		if ( button === 1 )
		{
			toggleMenuOff();
		}
	}
	});
}

function contextListener()
{
	document.addEventListener( "contextmenu", function(e)
	{
		taskItemInContext = clickInsideElement( e, taskItemClassName );

		if ( taskItemInContext )
		{
			toggleMenuOn();
			positionMenu(e);
		}
		else
		{
			taskItemInContext = null;
			toggleMenuOff();
		}
	});
}

/**
* Listens for keyup events.
*/
function keyupListener()
{
	window.onkeyup = function(e)
	{
		if ( e.keyCode === 27 )
		{
			toggleMenuOff();
		}
	}
}

/**
* Turns the custom context menu on.
*/
function toggleMenuOn()
{
	if ( menuState !== 1 )
	{
		menuState = 1;
		menu.classList.add( contextMenuActive );;
	}
}

function toggleMenuOff()
{
	if ( menuState !== 0 )
	{
		menuState = 0;
		menu.classList.remove( contextMenuActive );
	}
}

function clickInsideElement( e, className )
{
	var el = e.srcElement || e.target;

	if ( el.classList.contains(className) )
	{
		return el;
	}
	else
	{
		while ( el = el.parentNode )
		{
			if ( el.classList && el.classList.contains(className) )
			{
				return el;
			}
		}
	}

	return false;
}

function getPosition(e)
{
	var posx = 0;
	var posy = 0;

	if (!e) var e = window.event;

	if (e.pageX || e.pageY)
	{
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY)
	{
		posx = e.clientX + document.body.scrollLeft + 
						   document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop + 
						   document.documentElement.scrollTop;
	}

	return { x: posx, y: posy }
}

function positionMenu(e)
{
	clickCoords = getPosition(e);
	clickCoordsX = clickCoords.x;
	clickCoordsY = clickCoords.y;

	menuWidth = menu.offsetWidth + 4;
	menuHeight = menu.offsetHeight + 4;

	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	if ( (windowWidth - clickCoordsX) < menuWidth )
	{
		menu.style.left = windowWidth - menuWidth + "px";
	}
	else
	{
		menu.style.left = clickCoordsX + "px";
	}

	if ( (windowHeight - clickCoordsY) < menuHeight )
	{
		menu.style.top = windowHeight - menuHeight + "px";
	}
	else
	{
		menu.style.top = clickCoordsY + "px";
	}
}


//get task + action
function menuItemListener( link )
{
	var data_id = taskItemInContext.getAttribute("data-id");
	
	toggleMenuOff();
	
	if (link.getAttribute("data-action") === "ChangeURL")
	{
		var URL = prompt("Please enter new URL", "https://www.");
		document.getElementById(data_id).href = URL;		
		localStorage.setItem(data_id, URL);
	}
	else if (link.getAttribute("data-action") === "ChangeIMG")
	{
		data_id = data_id + "p";
		var IMG = prompt("Please enter new Image-URL", "");
		//normal img
		document.getElementById(data_id).src = IMG;
		localStorage.setItem(data_id, IMG);
		//reflection
		data_idfx = data_id + "fx"
		if (data_id === "c1p" || data_id === "c2p" || data_id === "c3p" || data_id === "c4p" || data_id === "c5p")
		{			
			document.getElementById(data_idfx).src = document.getElementById(data_id).src;
		}

	}
}


/**
* Run the app.
*/
init();