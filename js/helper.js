game.ToolBoxHelper = {
	selected: "treeentity",
	items: {
		TREE: 'treeentity',
		TRASH: 'trashentity',
		ROADLIGHT: 'roadlentity',
		TRAFFICLIGHT: 'trafficlentity'
	},
	setSelected: function(key) {
		var value = game.ToolBoxHelper.items.TREE;
		if (key == "trash")
			value = game.ToolBoxHelper.items.TRASH;
		else if (key == "roadlight")
			value = game.ToolBoxHelper.items.ROADLIGHT;
		else if (key == "trafficlight")
			value = game.ToolBoxHelper.items.TRAFFICLIGHT;
		this.selected = value;
	},
	addTree: function(x, y) {
		/*var settings = {};
	    settings.image = "treeentity";
	    settings.spritewidth = 32;
	    settings.spriteheight = 32;
	    settings.name = "treeentity";
	    
		var tree = new game.TreeEntity(x, y , settings);
		
		me.game.add(tree,5);
		me.game.sort();*/
		game.ToolBoxHelper.addItem(x,y,"treeentity");
	},
	addChosen: function(x,y, text) {
		return game.ToolBoxHelper.addItem(x,y,game.ToolBoxHelper.selected,{text: text});
	},
	addItem: function(x, y, name, data) {
		
		if (name == "treeentity" && game.character == "female") {

			name = "treeentitypink";
		}
			
		var settings = {};
	    settings.image = name;
	    settings.spritewidth = 32;
	    settings.spriteheight = 32;
	    settings.name = "treeentity";
	    settings.width = 32;
	    settings.height = 32;
	    settings.manual = true;
	    settings.data = data;
	    
	    console.log("additem",settings,x,y);
		var item = new game.TreeEntity(x, y , settings);
		
		me.game.add(item, 5);
		me.game.sort();
		return settings;
	}
};