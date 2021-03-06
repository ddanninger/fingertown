/* the in game stuff*/
game.PlayScreen = me.ScreenObject.extend({
	init: function() {
        this.parent(true);
        
        
	},
	showProfile: true,
	
    onResetEvent: function() {
    	game.loadData();
    	
    	var imgName = "profile_male";
    	if (game.character == "female")
    		imgName = "profile_female";
    	this.title = me.loader.getImage(imgName);
        // stuff to reset on state change
        // load a level
        me.levelDirector.loadLevel("FingerTown");
    },
    
    draw: function(context) {
    	if (this.showProfile) {
    		//
    		
    		context.drawImage(this.title, 0, 0);
    	}
    	//console.log("draw playscreen")
        
 
        //this.font.draw(context, "PRESS ENTER TO PLAY", 20, 240);
        //this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
        
        
    },
 
    /* ---
 
    action to perform when game is finished (state change)
 
    --- */
    onDestroyEvent: function() {
    }
 
});