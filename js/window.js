game.Toolbox = Object.extend({
	toggle: function() {
		var effect = 'slide';
		 
	    // Set the options for the effect type chosen
	    var options = { direction: 'left' };
	 
	    // Set the duration (default: 400 milliseconds)
	    var duration = 500;
	 
	    $('#toolbox').toggle(effect, options, duration);
	}
});

game.CharacterWindow =  Object.extend({
    "init" : function init() {
        this.characterWindowShowing = false;

        console.log('Init character class...');
    },
    
    "isShowing" : function isShowing(){
        return this.characterWindowShowing;
    },
    
    "show": function show() {
    		var self = this;
            if (!this.characterWindowShowing){           
            	
                 // all help screen
                 var $htmlInner = ('<div id="characterScreen"><ul><li><a href="javascript:;" class="female" data-value="female"><img src="images/female.png"></a></li><li><a href="javascript:;" class="male" data-value="male"><img src="images/male.png"></a></li></ul><br><a href="javascript:;" class="next">Next</a></div>');
                    
                $('#characterDialogLayer').append($htmlInner);
                
                $('#characterDialogLayer').fadeIn(500);
                
                $('#characterDialogLayer .next').bind('click', function( event ) {
                    if ($(".chosen")) {
                    	game.activateGame($(".chosen").attr("data-value"));
                    	this.hide();
                    	game.Toolbox.toggle();
                    }
                    
                }.bind(this));
                
                $('#characterDialogLayer .female').bind('click', function( event ) {
                	$(".chosen").removeClass();
                	$(this).addClass("chosen");
                    console.log("Chose female.");
                });
                
                $('#characterDialogLayer .male').bind('click', function( event ) {
                	$(".chosen").removeClass();
                	$(this).addClass("chosen");
                    console.log("Chose male.");
                });

                // console.log("Show message...");
                this.characterWindowShowing = true;
            }
    },
        
    "hide": function hide() {
    	console.log("called hide");
        if (this.characterWindowShowing){
        	console.log("close");
            $('#characterDialogLayer').fadeOut( 200 , function(){
            	$('#characterDialogLayer .female').unbind('click');
            	$('#characterDialogLayer .male').unbind('click');
                $('#characterDialogLayer .next').unbind('click');

                $("#characterDialogLayer").children().remove();
            });
            
            //Get player entity and make the isShowHelp = false
            
            // If in play screen on menu do nothing
            // console.log("me.state.current():", me.state.isCurrent(me.state.PLAY));
            if(me.state.isCurrent(me.state.MENU)){
            	
                //var player = me.game.getEntityByName('mainPlayer')[0];
                //player.govermentDialogDone();
            	me.state.change(me.state.PLAY);
            }
            
            // console.log("hide message...");
            this.characterWindowShowing = false;

            // If game is on pause and the help window is closed then resume game
            if (!me.state.isRunning()) {
                me.state.resume();
            }
            
        }
    }
});

game.DialogWindow =  Object.extend({
    "init" : function init() {
        this.dialogwindowShowing = false;

        console.log('Init dialogwindow class...');
    },
    
    "isShowing" : function isShowing(){
        return this.dialogwindowShowing;
    },
    
    "show": function show() {
            if (!this.dialogwindowShowing){                
                 // all help screen
                 var $htmlInner = ('<div id="helpScreen"><p>Goverment Office is talking now and asking about place,location and so on. <a href="javascript:;" class="close">Close Window</a></p></div>');
                    
                $('#dialogLayer').append($htmlInner);
                
                $('#dialogLayer').fadeIn(500);
                
                $('#dialogLayer .close').bind('click', function( event ) {
                    console.log("Close event...");
                    this.hide();
                }.bind(this));

                // console.log("Show message...");
                this.dialogwindowShowing = true;
            }
    },
        
    "hide": function hide() {
        if (this.dialogwindowShowing){
            $('#dialogLayer').fadeOut( 200 , function(){
                $('#dialogLayer .close').unbind('click');
                //lears all the child divs, but leaves the master intact.
                $("#dialogLayer").children().remove();
            });
            
            //Get player entity and make the isShowHelp = false
            
            // If in play screen on menu do nothing
            // console.log("me.state.current():", me.state.isCurrent(me.state.PLAY));
            if(me.state.isCurrent(me.state.PLAY)){
                var player = me.game.getEntityByName('mainPlayer')[0];
                player.govermentDialogDone();
            }
            
            // console.log("hide message...");
            this.dialogwindowShowing = false;
            
            windowMenuOpen = false;
            
            // If game is on pause and the help window is closed then resume game
            if (!me.state.isRunning()) {
            	console.log("RUNNING");
                me.state.resume();
            }
            
        }
    }
});