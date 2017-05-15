function saveOptions(e)
{
	e.preventDefault();
	browser.storage.local.set({
	Color: document.querySelector("#Color").value
	});
	browser.storage.local.set({
	Gap: document.querySelector("#Gap").value
	});
}

function restoreOptions() {

  function setCurrentColor(result) {
    document.querySelector("#Color").value = result.Color || "000000";
  }
  
  function setCurrentGap(result) {
	document.querySelector("#Gap").value = result.Gap || "0";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getColor = browser.storage.local.get("Color");
  getColor.then(setCurrentColor, onError);
  
  var getGap = browser.storage.local.get("Gap")
  getGap.then(setCurrentGap, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);