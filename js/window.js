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