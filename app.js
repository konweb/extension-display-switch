var attr = "ex-display-visible",
		attrInline = "ex-display-visible-inline",
		i,DOM,num;

if($(document).find("[" + attr + "]")[0]){
	DOM = $(document).find("[" + attr + "]");
}else{
	DOM = $(document).find(":hidden");
}
num = DOM.length;

for(i = 0;i < num;i++){
	if(
		DOM[i].nodeName === "HEAD"
		|| DOM[i].nodeName === "META"
		|| DOM[i].nodeName === "LINK"
		|| DOM[i].nodeName === "TITLE"
		|| DOM[i].nodeName === "STYLE"
		|| DOM[i].nodeName === "SCRIPT"
		|| DOM[i].nodeName === "NOSCRIPT"
		|| DOM[i].nodeName === "IFRAME" && String($(DOM[i])[0].src).match(/chrome-extension:/)
	){
		continue;
	}
	if(!$(DOM[i]).is(':visible')){
		if($(DOM[i]).parents("[" + attr + "]").attr(attr) === "false"){
			continue;
		}
		if(DOM[i].style.display === "none"){
			DOM[i].setAttribute(attrInline, "");
		}
		DOM[i].style.display = "block";
		DOM[i].setAttribute(attr, "true");
	}else{
		if(DOM[i].getAttribute(attr)){
			DOM[i].setAttribute(attr, "false");
			if(DOM[i].getAttribute(attrInline) === ""){
				DOM[i].style.display = "none";
			}else{
				DOM[i].style.display = "";
			}
		}
	}
}

$(document).on("click", function(e){
	if(!$(e.target).attr(attr) || !$(e.target).parents("[" + attr + "]")){
		$("[" + attr + "]").css("display", "");
		$("[" + attrInline + "]").css("display", "none");
		$("[" + attr + "]").attr(attr, "false");
	}
});