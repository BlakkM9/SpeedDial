const Fields = 15;

function restoreData()
{			
	for (i = 0; i < Fields; i++)
	{		
		var reg = iToReg(i);	
		document.getElementById(reg).href = localStorage.getItem(reg) || "#";
				
		reg = iToReg(i) + "p";
		document.getElementById(reg).src = localStorage.getItem(reg) || "thumbnails/add.png";
		
		regfx = iToReg(i) + "pfx"
		
		if (reg === "c1p" || reg === "c2p" || reg === "c3p" || reg === "c4p" || reg === "c5p")
		{
			document.getElementById(regfx).src = localStorage.getItem(reg) || "thumbnails/add.png";
		}
	}
}

function iToReg(i)
{
	var reg = i + 1;
	
	if (i >= 0 && i < 5)
	{
		reg = "a" + reg;
	}
	else if (i >= 5 && i < 10)
	{
		reg = "b" + (reg - 5)
	}
	else
	{
		reg = "c" + (reg - 10)
	}
	
	return reg;
}

function onError(error)
{
	console.log(`Error: ${error}`);
}

// Storage
document.addEventListener("DOMContentLoaded", restoreData);