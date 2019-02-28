class AlgebraController{
	updateGAInfo(currentCode){
		els.macrosContent.innerHTML='';
		var description = this.retrieveGAInfo(currentCode);
		
		var metricTitle = document.createElement("p");
		// if there is a GA description
		if (description!=null){
			metricTitle.innerHTML = "Basis and Metric";
			els.macrosContent.appendChild(metricTitle);
			
			var metricTable = document.createElement("table");
			metricTable.appendChild(constructLine(description.basis));
			metricTable.appendChild(constructLine(description.metric));
			
			els.macrosContent.appendChild(metricTable);
		}
		// if there isn't a GA description
		else{
			metricTitle.innerHTML = "No Geometric Algebra in the console.";
			els.macrosContent.appendChild(metricTitle);
		}
	}

	retrieveGAInfo(currentCode){
		if(currentCode.length!=0){
			/* delete comments */
			var args=currentCode.replace(/\/\*[\s\S]*?\*\//g, " ");
			// delete comments //
			args=args.replace(/\/\/.*/g, " ");
			// search Algebra
			var index = args.indexOf("Algebra");
			//substring since Algebra
			args = args.substring(index+8);
			// slice between ( and (
			var argsArray = args.split("(", 1);
			// slice between ( and )
			argsArray = argsArray[0].split(")", 1);
			// if ends with , delete it
			if(argsArray[0].endsWith(","))
				args=argsArray[0].substring(0, argsArray[0].length-1);
			else args=argsArray[0];
			this.algebra = args;
			// retrieve the description object
			var description = new Function('return Algebra(' + args + ').describe();');
			return description();
		}
	}

	constructor(name){
		this.name = name;
		this.algebra = "";
	}
}