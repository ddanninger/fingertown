game.LoadingScreen = me.ScreenObject.extend({
	init : function() {
		this.parent(true);
		this.invalidate = false;
		this.loadPercent = 0;
		me.loader.onProgress = this.onProgressUpdate.bind(this);
		
		this.logo = null;
	},

	onResetEvent: function() {
		if (this.logo == null) {
            // init stuff if not yet done
            this.logo = me.loader.getImage("logo");

 
        }
	},
	
	onProgressUpdate : function(progress) {
		this.loadPercent = progress;
		this.invalidate = true;
	},

	update : function() {
		if (this.invalidate === true) {
			this.invalidate = false;
			return true;
		}
		return false;
	},

	onDestroyEvent : function() {
		this.logo = null;
	},

	draw : function(context) {
		console.log("draw loading")
		me.video.clearSurface(context, "#efefef");
		
		
		context.drawImage(this.logo,
				95,0);
		

		var width = Math.floor(this.loadPercent * context.canvas.width);
		/*context.strokeStyle = "#fff200";
		context.strokeRect(0, (context.canvas.height / 2) + 40,
				context.canvas.width, 20);
		context.fillStyle = "#89b002";
		context.fillRect(2, (context.canvas.height / 2) + 42,
				width - 4, 18);*/
		
		context.strokeStyle = "#fff200";
	      context.strokeRect(0, (me.video.getHeight() / 2) + 40, me.video.getWidth(), 6);
	      context.fillStyle = "#f47920";
	      context.fillRect(2, (me.video.getHeight() / 2) + 42, width-4, 2);
	}

});