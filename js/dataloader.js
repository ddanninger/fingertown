game.Endpoint = "http://oht.junho85.pe.kr/";

game.DataLoader = {
	getItems: function() {
		var self = this;
		$.ajax({
			type : "GET",
			url : "data/items.json",
			//dataType: "jsonp",
			//url : game.Endpoint + "server/item/get_list?callback=?",
			data : {
				town_id : 1
			},
			dataType: "json",
			success: function(result) {
				$.each(result, function(index, item) {
					self.prepareItem(item);
				});
			}
		});
	},
	prepareItem: function(item) {
		console.log("item is ",item);
		var currentType = parseInt(item.type),
			type = game.ToolBoxHelper.items.TREE,
			x = parseInt(item.coord_x),
			y = parseInt(item.coord_y);
		switch (currentType) {
			case 2:
				type = game.ToolBoxHelper.items.TRASH;
				break;
			case 3:
				type = game.ToolBoxHelper.items.ROADLIGHT;
				break;
			case 4:
				type = game.ToolBoxHelper.items.TRAFFICLIGHT;
				break;
			default:
				break;
		}
		game.ToolBoxHelper.addItem(x,y, type, {text: item.detail});
	}
};