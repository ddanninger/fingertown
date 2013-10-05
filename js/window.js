game.Toolbox = Object.extend({
	toggle: function() {
		var effect = 'slide';
		 
	    // Set the options for the effect type chosen
	    var options = { direction: 'left' };
	 
	    // Set the duration (default: 400 milliseconds)
	    var duration = 500;
	 
	    $('#toolbox').toggle(effect, options, duration);
	},
	init: function() {
		console.log("toolbox init");
		var self = this;
		$('#toolbox li').bind("click",function() {
			$("#toolbox .selected").removeClass("selected");
			$(this).addClass("selected");
			self.changedItem();
		});
	},
	changedItem: function() {
		var selected = $("#toolbox .selected"),
			key = selected.attr("data-key");

		game.ToolBoxHelper.setSelected(key);
	}
});

game.ProfileInfo = Object.extend({
	toggle: function(func) {
		var effect = 'slide';
		 
	    // Set the options for the effect type chosen
	    var options = { direction: 'left' };
	 
	    // Set the duration (default: 400 milliseconds)
	    var duration = 500;
	    if (typeof func != "undefined")
	    	$('#profileinfo').toggle(effect, options, duration, func);
	    else
	    	$('#profileinfo').toggle(effect, options, duration);
	    
	    
	},
	init: function() {
		
		console.log("toolbox init");
		var self = this;
		$('#profileinfo .close').bind("click",function() {
			self.toggle(function() {
				game.PlayScreen.showProfile = false;
				var mainPlayer = me.game.getEntityByName('mainPlayer')[0];
        	    mainPlayer.blockInput = false;
				game.Toolbox.toggle();
			});
		});
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
    		console.log("came here");
            if (!this.characterWindowShowing){           
            	
                $('#characterDialogLayer').reveal({
                    animation: 'fadeAndPop',                   //fade, fadeAndPop, none
                    animationspeed: 200,                       //how fast animtions are
                    closeonbackgroundclick: false,              //if you click background will modal close?
                    dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
               });
                
                $('#characterDialogLayer .next').bind('click', function( event ) {
                    if ($(".chosen")) {
                    	game.activateGame($(".chosen").attr("data-value"));
                    	this.hide();
                    	game.ProfileInfo.toggle(function() {
                    		console.log("Block");
                    		var mainPlayer = me.game.getEntityByName('mainPlayer')[0];
                    	    mainPlayer.blockInput = true;
                    	});
                    }
                    
                }.bind(this));
                
                $('#characterDialogLayer .close-reveal-modal').bind('click', function( event ) {
                	this.unbind();
                    
                }.bind(this));
                
                $('#characterDialogLayer .female').bind('click', function( event ) {
                	$("#characterDialogLayer .chosen").removeClass("chosen");
                	$(this).addClass("chosen");
                    console.log("Chose female.");
                });
                
                $('#characterDialogLayer .male').bind('click', function( event ) {
                	$("#characterDialogLayer .chosen").removeClass("chosen");
                	$(this).addClass("chosen");
                    console.log("Chose male.");
                });

                // console.log("Show message...");
                this.characterWindowShowing = true;
            }
    },
        
    "unbind": function() {
    	$('#characterDialogLayer .female').unbind('click');
    	$('#characterDialogLayer .male').unbind('click');
        $('#characterDialogLayer .next').unbind('click');
        
        this.characterWindowShowing = false;
    },
    
    "hide": function hide() {
    	console.log("called hide");
        if (this.characterWindowShowing){
        	console.log("close");

            $('#characterDialogLayer').trigger("reveal:close");
            
            this.unbind();
            

            
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
                 //var $htmlInner = ('<div id="helpScreen"><p>Goverment Office is talking now and asking about place,location and so on. <a href="javascript:;" class="close">Close Window</a></p></div>');
                    
                //$('#dialogLayer').append($htmlInner);
                
                //$('#dialogLayer').fadeIn(500);
            	
            	$('#dialogLayer').reveal({
                    animation: 'fadeAndPop',                   //fade, fadeAndPop, none
                    animationspeed: 200,                       //how fast animtions are
                    closeonbackgroundclick: false,              //if you click background will modal close?
                    dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
               });
            	
            	$('#dialogLayer .close-reveal-modal').bind('click', function( event ) {
                	this.unbind();
                    
                }.bind(this));
                
                $('#dialogLayer .ok').bind('click', function( event ) {
                    console.log("Close event...");
                    this.hide();
                }.bind(this));

                // console.log("Show message...");
                this.dialogwindowShowing = true;
            }
    },
    
    "unbind": function() {
    	
    },
        
    "hide": function hide() {
        if (this.dialogwindowShowing){
        	$('#dialogLayer').trigger("reveal:close");
            /*$('#dialogLayer').fadeOut( 200 , function(){
                $('#dialogLayer .close').unbind('click');
                //lears all the child divs, but leaves the master intact.
                $("#dialogLayer").children().remove();
            });
            */
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