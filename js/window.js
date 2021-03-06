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
	hide: function() {
		this.toggle(function() {
			game.PlayScreen.showProfile = false;
			var mainPlayer = me.game.getEntityByName('mainPlayer')[0];
    	    mainPlayer.blockInput = false;
			game.Toolbox.toggle();
		});
	},
	init: function() {
		
		console.log("toolbox init");
		var self = this;
		$('#profileinfo .close').bind("click",function() {
			this.hide();
		}.bind(this));
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
	pos: null,
	data: {text: ""},
	type: "treeentity",
    "init" : function init() {
        this.dialogwindowShowing = false;

        console.log('Init dialogwindow class...');
    },
    
    "isShowing" : function isShowing(){
        return this.dialogwindowShowing;
    },
    
    "show": function show(type,pos) {
    	this.type = type;
    	this.pos = pos;
    	//this.setInfo();
    	console.log("DIALOG POS",type,pos)
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
                    this.save();
                    this.hide();
                }.bind(this));

                // console.log("Show message...");
                this.dialogwindowShowing = true;
            }
    },
    
    "save": function() {
    	var type = 1;
    	if (this.type == game.ToolBoxHelper.items.TRASH) {
			type = 2;
		}
		else if (this.type == game.ToolBoxHelper.items.ROADLIGHT) {
			type = 3;
		}
		else if (this.type == game.ToolBoxHelper.items.TRAFFICLIGHT) {
			type = 4;
		}
    	
    	var text = $("#dialogLayer textarea[name=reason]").val();
    	this.data.text = text;
    	
    	game.DataLoader.saveItem(text,type,Math.round(this.pos.x),Math.round(this.pos.y));
    	var player = me.game.getEntityByName('mainPlayer')[0];
        player.govermentDialogDone();
    },
    
    "setInfo": function() {
    	var img = "tree", text = "나무"; 
		if (this.type == game.ToolBoxHelper.items.TRASH) {
			img = "trash";
			text = "쓰레기통";
		}
		else if (this.type == game.ToolBoxHelper.items.ROADLIGHT) {
			img = "light";
			text = "가로등";
		}
		else if (this.type == game.ToolBoxHelper.items.TRAFFICLIGHT) {
			img = "traffic";
			text = "신호등";
		}

    	$( "#dialogLayer .type" ).html('<div><img src="images/'+img+'_big.png"><p>'+text+'</p></div>');
    },
    
    "getData": function() {
    	return $("#dialogLayer textarea[name=reason]").val();
    },
    
    "unbind": function() {
    	this.dialogwindowShowing = false;
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

game.InfoWindow =  Object.extend({
	data: {},
    "init" : function init() {
        this.infowindowShowing = false;

        console.log('Init infoLayer class...');
    },
    
    "isShowing" : function isShowing(){
        return this.infowindowShowing;
    },
    
    "show": function show(data) {
    	this.data = data;
    	this.setInfo();
            if (!this.infowindowShowing){                
            	$('#infoLayer').reveal({
                    animation: 'fadeAndPop',                   //fade, fadeAndPop, none
                    animationspeed: 200,                       //how fast animtions are
                    closeonbackgroundclick: false,              //if you click background will modal close?
                    dismissmodalclass: 'close-reveal-modal'    //the class of a button or element that will close an open modal
               });
            	
            	$('#infoLayer .close-reveal-modal').bind('click', function( event ) {
                	this.unbind();
                    
                }.bind(this));
                
                $('#infoLayer .ok').bind('click', function( event ) {
                    console.log("Close event...");
                    this.hide();
                }.bind(this));

                // console.log("Show message...");
                this.infowindowShowing = true;
            }
    },
    
    "unbind": function() {
    	this.infowindowShowing = false;
    },
    
    "setInfo": function() {
    	var img = "tree", text = "나무", realText = this.data.data.text; 
		if (this.data.name == game.ToolBoxHelper.items.TRASH) {
			img = "trash";
			text = "쓰레기통";
		}
		else if (this.data.name == game.ToolBoxHelper.items.ROADLIGHT) {
			img = "light";
			text = "가로등";
		}
		else if (this.data.name == game.ToolBoxHelper.items.TRAFFICLIGHT) {
			img = "traffic";
			text = "신호등";
		}
console.log("set info",this.data);
    	$( "#infoLayer .type" ).html('<div><img src="images/'+img+'_big.png"><p>'+text+'</p></div>');
    	$( "#infoLayer .reason .text" ).html(realText);
    },
        
    "hide": function hide() {
        if (this.infowindowShowing){
        	$('#infoLayer').trigger("reveal:close");

            if(me.state.isCurrent(me.state.PLAY)){
                
            }
            

            this.infowindowShowing = false;

            if (!me.state.isRunning()) {
                me.state.resume();
            }
            
        }
    }
});