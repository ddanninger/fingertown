/*------------------- 
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({
	destX: 0,
	destY: 0,
	dialogActive: false,
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
 
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 15);
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
 
        if (me.input.isKeyPressed('left')) {
        	this.animationspeed = me.sys.fps / (me.sys.fps / 3);
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
        	this.animationspeed = me.sys.fps / (me.sys.fps / 3);
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        }
        
        if (me.input.isKeyPressed('up'))
		{
			this.animationspeed = me.sys.fps / (me.sys.fps / 3);
			this.vel.y = -this.accel.y * me.timer.tick; 
			//this.renderable.setCurrentAnimation('up');
			this.direction = 'up';
		}
		else if (me.input.isKeyPressed('down'))
		{
			this.animationspeed = me.sys.fps / (me.sys.fps / 3);
			this.vel.y = this.accel.y * me.timer.tick; 
			//this.renderable.setCurrentAnimation('down');
			this.direction = 'down';
		}
        
        /*if (me.input.isKeyPressed('jump')) {
            // make sure we are not already jumping or falling
            if (!this.jumping && !this.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.vel.y = -this.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.jumping = true;
            }
 
        }*/
        
        
        if (me.input.isKeyPressed('space')) {
            console.log("space is pressed",me.game.getEntityByName('govermentPlayer')[0]);
            var govPlayer = me.game.getEntityByName('govermentPlayer')[0];
            if (govPlayer != null && typeof govPlayer != 'undefined')
            	govPlayer.moveToUser();
        }
        
 
        // check & update player movement
        this.updateMovement();
 
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        
         
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },
    
    govermentDialog: function() {
    	console.log(game.dialogWindow);
    	this.dialogActive = true;
    	game.dialogWindow.show();
        me.state.pause();
    },
    
    govermentDialogDone: function() {
    	var govPlayer = me.game.getEntityByName('govermentPlayer')[0];
    	govPlayer.returnHome();
    	
    	me.state.resume();
    	this.dialogActive = false;
    }
 
});

game.GovermentEntity = me.ObjectEntity.extend({
	/* -----
    constructor
    ------ */
    target: null,
    myPath: [],
    dest: null,
    lastPos: {x: -1, y: -1},
    pathAge: 0,
    started: false,
    startPos: {x: 0, y: 0},
    settings: null,
    context : null,
    removeMe: false,
    init: function(x, y, settings) {
    	console.log(x,y);
    	this.startPos = {x: x, y: y};
    	this.settings = settings;
    	//this.parent(0,0, settings);
        // call the constructor
        
        this.parent(x, y, settings);

        // chase even when offscreen
        this.alwaysUpdate = true;
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(0.25, 0.25);
        this.setMaxVelocity(3, 3);
        this.setFriction(0.05, 0.05);


        this.updateColRect(0, 32, 32, 32);
        

    },
    
    moveToUser: function() {
    	if (!this.started) {
    		
    		
    		
    		this.started = true;
    		this.draw(this.context);
    		console.log("get started");
    		//this.parent(this.startPos.x, this.startPos.y, this.settings);
    		//this.setVelocity(this.startPos.x,this.startPos.y)
    		//this.vel.x = this.startPos.x;
    		//this.vel.y = this.startPos.y;

    		//this.updateMovement();
    		
    		
    	}
    },
    

    
    returnHome: function() {
    	//this.started = false;

    	console.log("return home");
    	this.removeMe = true;
    },

    chessboard: function() {
        // return chessboard distance to target
        return Math.max( Math.abs(this.collisionBox.left - this.target.collisionBox.left), Math.abs(this.collisionBox.top - this.target.collisionBox.top));
    },

    /* -----

    update the player pos

    ------ */
    update: function() {
    	if (!this.started)
    		return false;
        var now = Date.now()
        this.updateColRect(0, 16, 16, 16);
        if (this.target == null) {
            // we should globally store this value
        	this.target = me.game.getEntityByName('mainPlayer')[0];
            return false;
        }
        
        

        
        var cbdist = this.chessboard();

        if (this.myPath.length < 1 || (cbdist >= 96 && this.pathAge+5000 < now)) {
            // not moving anywhere
            // friction takes over
            if (this.target != null) {
                this.myPath = me.astar.search(this.collisionBox.left,this.collisionBox.top,this.target.collisionBox.left,this.target.collisionBox.top);
                this.dest = this.myPath.pop();
                this.pathAge = now;
                //console.log(this.dest);

            }

        } else {
        	if (this.chessboard() <= 2 && this.removeMe != true) {
        		if (!this.target.dialogActive) {
        			this.target.govermentDialog();
        		}
            	return false;
            }
        	else if (this.chessboard() < 96) {
                // just go for it
                this.dest = this.target;
                this.pathAge = now-5000;
                
            } else if (this.collisionBox.overlaps(this.dest.rect) && this.myPath.length > 0) {
                // TODO - do this with non constant, add some fuzz factor
                //console.log("Reached "+this.dest.pos.x+","+this.dest.pos.y);
                this.dest = this.myPath.pop();

            }

            if (this.dest != null) {
                
                //console.log("@",this.collisionBox.pos.x,this.collisionBox.pos.y);
                //console.log("Moving toward ",this.dest.pos.x,this.dest.pos.y);
                // move based on next position

  
                var xdiff = this.dest.pos.x - this.collisionBox.left
                  , ydiff = this.dest.pos.y - this.collisionBox.top;


                if (xdiff < -2) {
                    this.vel.x -= this.accel.x * me.timer.tick;
                    this.lastPos.x = this.left;
                } else if (xdiff > 2) {
                    this.flipX(true);
                    this.vel.x += this.accel.x * me.timer.tick;
                    this.lastPos.x = this.left;
                }

                if (ydiff < -2) {
                    this.vel.y -= this.accel.y * me.timer.tick;
                    this.lastPos.y = this.collisionBox.pos.y;
                } else if (ydiff > 2) {
                    this.vel.y += this.accel.y * me.timer.tick;
                    this.lastPos.y = this.collisionBox.pos.y;
                }
            }
        }
        
        if (this.removeMe == true) {
        	console.log("remvoe me");
        	me.game.remove(this);
        }
        // check & update player movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
        	
            this.parent();
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },

    draw: function(context) {
    	this.context = context;
    	if (!this.started)
    		return false;
        // draw the sprite if defined
            if (this.renderable) {
                // translate the renderable position (relative to the entity)
                // and keeps it in the entity defined bounds
                // anyway to optimize this ?
                var x = ~~(this.pos.x + (this.anchorPoint.x * (this.width - this.renderable.width)));
                var y = ~~(this.pos.y + (this.anchorPoint.y * (this.height - this.renderable.height)));
                context.translate(x, y);
                this.renderable.draw(context);
                context.translate(-x, -y);
            }
        // draw dest rect
        debugAStar = true;
        if (debugAStar && this.dest) {
            if (this.dest && this.dest.rect) {
                this.dest.rect.draw(context, "green");
            }   
            for (var i = 0, ii = this.myPath.length; i < ii; i+=1) {
                if (this.myPath[i] && this.myPath[i].rect) {
                    this.myPath[i].rect.draw(context, "red");
                }
            }
        }
    }
});


game.TreeEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected
 
        // make sure it cannot be collected "again"
        //this.collidable = false;
        // remove it
        //me.game.remove(this);
    }
 
});