game.Pathfinder = Object.extend({
	init: function() {
		
	},
	
	getPath : function getPath( start, end){
		console.log("path test",start,end)
		// console.log('Start:', start , 'End:', end , 'layerName:', layerName);
		
		// Get layer object
		var layer = me.game.currentLevel.getLayerByName("collision");
		
		// set array to layer
		var myLayerArray = new Array(layer.cols);
		
		// parse all the layer tiles 
		for ( var x = 0; x < layer.cols; x++) 
		{ 
			// create multidimensional array
			myLayerArray[x] = new Array(layer.rows);
		
			for ( var y = 0; y < layer.rows; y++) 
		   { 
				var testTile = layer.layerData[y][x];
				
				// if null not collide then 0 free path with Astar algoritm
				if (testTile == null){
					myLayerArray[x][y] = 0;
				}else { // 1 block the path
					myLayerArray[x][y] = 1;
				}
			}
		}
		
		console.log("astar");
		var result = AStar(myLayerArray, start, end, "Manhattan");
		console.log(result);
		/*
			Get the result and transform to get only the start and end points of a line.
			to apply the Bresenham algorithm
		*/
		var pathArray = [];
		var countArray = 1;
		var equal ='';
		var x;
		var y;
		var nextX;
		var nextY;
		
		//first point
	
		pathArray[0] = start;
		
		$.each ( result, function (i, results ){
			if (i != result.length - 1){
				x = result[i][0];
				y = result[i][1];
				nextX = result[i + 1][0];
				nextY = result[i + 1][1];
				
				//if x is not equal to x+1 then y equal to y+1
				if ( x == nextX){
					if (equal == 'y') countArray++;
					pathArray[countArray] = [nextX,nextY];
					equal ='x';
				}else { // y equal
					if (equal == 'x') countArray++;
					pathArray[countArray] = [nextX,nextY];
					equal ='y';
				}

			}
			// console.log ("X: " , x , ' Y:', y);		
		});
		console.log("PATH ARRAY");
		$.each ( pathArray, function (i, point ){
			// console.log('pathArray:', i , '-' , point);
		 });
		return pathArray;
	},
	
	getPathTest : function getPathTest( start, end){
		/*
		 * 
		 * var start = [this.npcData.coordenadas[pathNumber].initStartX, this.npcData.coordenadas[pathNumber].initStartY];
                var end = [this.npcData.coordenadas[pathNumber].initDestX, this.npcData.coordenadas[pathNumber].initDestY];
		 * 
		 * 
		 */
        // Get layer object
        var layer = me.game.currentLevel.getLayerByName("collision");
        console.log("path test",start,end)
        // set array to layer
        var myLayerArray = new Array(layer.cols);
        
        // parse all the layer tiles 
        for ( var x = 0; x < layer.cols; x++) 
        { 
            // create multidimensional array
            myLayerArray[x] = new Array(layer.rows);
        
            for ( var y = 0; y < layer.rows; y++) 
           { 
                var testTile = layer.layerData[y][x];
                
                // if null not collide then 0 free path with Astar algoritm
                if (testTile == null){
                    myLayerArray[x][y] = 0;
                }else { // 1 block the path
                    myLayerArray[x][y] = 1;
                }
            }
        }
           var grid = new PF.Grid(50, 50, myLayerArray);
           
           var finder = new PF.AStarFinder();
           
           
           var path = finder.findPath(start[0], start[1], end[0], end[1], grid);

           return path;
	}
});