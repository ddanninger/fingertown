/*------------------- 
a player entity
-------------------------------- */
game.PlayerEntity = me.ObjectEntity.extend({
	destX: 0,
	destY: 0,
	dialogActive: false,
	myPath: [],
    dest: null,
    lastPos: {x: -1, y: -1},
    pathAge: 0,
    startPos: {x: 0, y: 0},
    firstStep: true,
    reachedDest: true,
    blockInput: false,
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
    	var self = this;
        // call the constructor
    	if (game.character == "female")
    		settings.image="female"; 
    	else
    		settings.image="male"; 
    	
        this.parent(x, y, settings);
        
        // set the default horizontal & vertical speed (accel vector)
        //this.setVelocity(3, 15);
        //this.setFriction(0.5, 0.5);
        this.updateColRect(4,24,20,23);
        
        this.setVelocity(0.25, 0.25);
        this.setMaxVelocity(3, 3);
        this.setFriction(0.05, 0.05);
        this.gravity = 0;
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        
        this.direction = 'down';
        
        
        // Change Inventory and question layer position
        this.layerPosition = "right";
        
        // Keep this last direction to change only when hero change is direction
        this.lastDirection = this.direction;
        
        /*this.renderable.addAnimation("stand-down", [4]);
		this.renderable.addAnimation("stand-left", [8]);
		this.renderable.addAnimation("stand-up", [1]);
		this.renderable.addAnimation("stand-right", [11]);*/
		this.renderable.addAnimation("down", [2,2]);
		this.renderable.addAnimation("left", [3,3]);
		this.renderable.addAnimation("up", [0,0]);
		this.renderable.addAnimation("right", [1]);

		me.event.subscribe("entityclick", function (event) {
		    console.log("entity click fetched");
		    self.skipClick = true;
		    
    	});

		me.event.subscribe("mouseup", function (event) {
		    console.log("mouse click",event.pointerId, event.gameX, event.gameY);
		    self.mouseClick(event);
    	});
		
		
		this.renderable.setCurrentAnimation('down');
    },
 
    moveTo: false,
    eventData: null,
    skipClick: false,
    mouseClick: function(event) {

    	if (this.skipClick) {
    		me.event.publish("after/main/player/click", [ event ]);
    		this.skipClick = false;
    		return false;
    	}
    	if (this.blockInput) {
    		me.event.publish("after/main/player/click", [ event ]);
    		return false;
    	}
    	this.eventData = event;
    	var self = this;
    	this.firstStep = true;
    	this.reachedDest = false;
    	this.myPath = me.astar.search(this.collisionBox.left,this.collisionBox.top,Math.floor(this.eventData.gameX), Math.floor(this.eventData.gameY) - 32);
        this.dest = this.myPath.pop();

        /*var tile_size = 32;
        
        
        var initStartX = Math.round( this.pos.x / tile_size);
        var initStartY = Math.round( ( this.pos.y ) / tile_size);
        
        var initDestX = Math.round( event.gameX);
        var initDestY = Math.round( event.gameY );
        
        var start = [initStartX, initStartY];
        var end = [initDestX, initDestY];
        console.log("data pathfinder",start,end);
        var followPath = game.pathFinder.getPath(start, end);
        console.log(followPath);*/
    	/*console.log(this.myPath,this.dest)
    	console.log("vel",this.vel);
    	$.each(this.myPath,function(index,path) {
    		self.moveTo = true;
    		console.log("MOVE TO PATH",path.x);
    		self.moveToPos = path;
    		//this.vel.x = path.x;
    		//this.update();
    		//this.updateMovement();
    		//moveObject(this);
    		
    		self.moveTo = false;
    	})
    	console.log("out of array");
    	this.moveTo = false;*/
        me.event.publish("after/main/player/click", [ event ]);
    },
    
    arrivedAtDest: function(event) {
    	this.blockInput = true;
    	game.ToolBoxHelper.addChosen(Math.floor(this.eventData.gameX), Math.floor(this.eventData.gameY) - 32);
    	var govPlayer = me.game.getEntityByName('govermentPlayer')[0];
        if (govPlayer != null && typeof govPlayer != 'undefined')
        	govPlayer.moveToUser();
    },
    
    chessboard: function() {
        // return chessboard distance to target
        return Math.max( Math.abs(this.collisionBox.left - Math.floor(this.eventData.gameX)), Math.abs(this.collisionBox.top - Math.floor(this.eventData.gameY)));
    },
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
    	var now = Date.now();
    	
    	if (this.blockInput)
    		return false;
    	/*if (this.moveTo) {
    		console.log(this.moveToPos);
    		console.log("move to is active",this.moveTo);
    		this.vel.x -= this.moveToPos.x * me.timer.tick;
    		//this.vel.x += this.accel.x * me.timer.tick;
    		
    		var res = this.updateMovement();

    		// check for collision result with the environment
    		if (res.x != 0)
    		{
    		  // x axis
    		  if (res.x<0)
    		     console.log("x axis : left side !");
    		  else
    		     console.log("x axis : right side !");
    		}
    		else if(res.y != 0)
    		{
    		   // y axis
    		   if (res.y<0)
    		      console.log("y axis : top side !");
    		   else
    		      console.log("y axis : bottom side !");

    		   // display the tile type
    		   console.log(res.yprop.type)
    		}
    		//this.parent();
    		return true;
    	}*/
    	
    	this.updateColRect(0, 16, 16, 16);
    	
    	
    	if (this.eventData != null) {
    		
    		var cbdist = this.chessboard();
	        if (this.myPath.length < 1 || (cbdist >= 96 && this.pathAge+5000 < now)) {
	            // not moving anywhere
	            // friction takes over
	            this.myPath = me.astar.search(this.collisionBox.left,this.collisionBox.top,Math.floor(this.eventData.gameX), Math.floor(this.eventData.gameY) - 32);
	            this.dest = this.myPath.pop();
	            this.pathAge = now;
	        } else {
	        	if (this.chessboard() < 96) {
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
	                    //this.lastPos.x = this.left;
	                } else if (xdiff > 2) {
	                    this.flipX(true);
	                    this.vel.x += this.accel.x * me.timer.tick;
	                    //this.lastPos.x = this.left;
	                }
	
	                if (ydiff < -2) {
	                    this.vel.y -= this.accel.y * me.timer.tick;
	                    //this.lastPos.y = this.collisionBox.pos.y;
	                } else if (ydiff > 2) {
	                    this.vel.y += this.accel.y * me.timer.tick;
	                    //this.lastPos.y = this.collisionBox.pos.y;
	                }
	            }
	        }
    	}
    	
    	
    	if (this.vel.x != 0)
        {
          // x axis
          if (this.vel.x<0)
        	  this.renderable.setCurrentAnimation('right');
          else
        	  this.renderable.setCurrentAnimation('left');
        }
        else if(this.vel.y != 0)
        {
           // y axis
           if (this.vel.y<0)
        	   this.renderable.setCurrentAnimation('up');
           else
        	   this.renderable.setCurrentAnimation('down');
        }
    	
    	if (me.input.isKeyPressed('left'))
		{
			this.animationspeed = me.sys.fps / (me.sys.fps / 3);

			this.vel.x = -this.accel.x * me.timer.tick;
			console.log(this.vel.x);
			this.renderable.setCurrentAnimation('left');
			this.direction = 'left';
		}
		else if (me.input.isKeyPressed('right'))
		{
			this.animationspeed = me.sys.fps / (me.sys.fps / 3);
			this.vel.x = this.accel.x * me.timer.tick; 
			this.renderable.setCurrentAnimation('right');
			this.direction = 'right';
		}

		if (me.input.isKeyPressed('up'))
		{
			this.animationspeed = me.sys.fps / (me.sys.fps / 3);
			this.vel.y = -this.accel.y * me.timer.tick; 
			this.renderable.setCurrentAnimation('up');
			this.direction = 'up';
		}
		else if (me.input.isKeyPressed('down'))
		{
			this.animationspeed = me.sys.fps / (me.sys.fps / 3);
			this.vel.y = this.accel.y * me.timer.tick; 
			this.renderable.setCurrentAnimation('down');
			this.direction = 'down';
		}
        
		// If player Stop set stand animationa
		if (this.vel.y === 0 && this.vel.x === 0)
		{
			if (this.eventData != null && !this.firstStep && !this.reachedDest) {
				this.reachedDest = true;
				this.arrivedAtDest(this.eventData);
			}
			//this.renderable.setCurrentAnimation('stand-' + this.direction);
		}else{
		}
        
		
		if ( this.direction !== this.lastDirection ) {
           me.game.sort();
           
           // Keep this last direction to change only when hero change is direction
           this.lastDirection = this.direction;
       }
		
		// probably not needed
		var res = me.game.collide(this , true);
		var self =this;
		
		// Keep hero position before collide
		if( res.length == 0 ){
                // Save the last hero coordinates before collide with something
                self.posBeforeCollideX = self.pos.x;
                self.posBeforeCollideY = self.pos.y;
        }
        
        if (me.input.isKeyPressed('space')) {
            console.log("space is pressed",me.game.getEntityByName('govermentPlayer')[0]);
            var govPlayer = me.game.getEntityByName('govermentPlayer')[0];
            if (govPlayer != null && typeof govPlayer != 'undefined')
            	govPlayer.moveToUser();
            else {
   
            	/*var base = {
            	gid: null,
            	height: 47,
            	image: "govermentPlayer",
            	isEllipse: false,
            	isPolygon: false,
            	isPolyline: false,
            	name: "govermentPlayer",
            	spritewidth: 32,
            	width: 48,
            	x: 975,
            	y: 629,
            	z: 5,
            	};
            	//var govPlayer = new game.GovermentEntity(0, 0, base);
                //me.game.add(govPlayer, 5);
                //me.game.sort();
            	game.Goverment.create();
                //govPlayer.moveToUser();*/
            }
        }
        
 
 
        var res = this.updateMovement();
        
        if (this.eventData != null && this.firstStep) {
        	this.firstStep = false;
        }
        
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
    	console.log(this.eventData);
    	this.dialogActive = true;
    	game.dialogWindow.show({x: this.eventData.gameX, y: this.eventData.gameY});
        me.state.pause();
    },
    
    govermentDialogDone: function() {
    	var govPlayer = me.game.getEntityByName('govermentPlayer')[0];
    	govPlayer.returnHome();
    	var treeItem = me.game.getEntityByName('treeentity')[0];
    	
    	me.state.resume();
    	this.dialogActive = false;
    	
    	this.blockInput = false;
    },
    
    draw: function(context) {
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
    firstStep: false,
    reachedDest: true,
    init: function(x, y, settings) {
    	
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
        
        
        this.renderable.addAnimation("down", [2,2]);
		this.renderable.addAnimation("left", [3,3]);
		this.renderable.addAnimation("up", [0,0]);
		this.renderable.addAnimation("right", [1]);
		

		this.renderable.setCurrentAnimation('down');
    },
    
    moveToUser: function() {
    	if (!this.started) {

        	this.firstStep = true;
        	this.reachedDest = false;
    		
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
    
    arrivedAtDest: function() {
    	if (!this.target.dialogActive) {
			this.target.govermentDialog();
			
			this.firstStep = true;
		}
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
        	//console.log(this.chessboard());
        	if (this.chessboard() < 96) {
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
        
        
        if (this.vel.y === 0 && this.vel.x === 0)
		{
        	console.log("arrived",this.firstStep,this.reachedDest);
			if (!this.firstStep && !this.reachedDest) {
				this.reachedDest = true;
				this.arrivedAtDest();
			}
			//this.renderable.setCurrentAnimation('stand-' + this.direction);
		}
        
        if (this.vel.x != 0)
        {
          // x axis
          if (this.vel.x < 0)
        	  this.renderable.setCurrentAnimation('right');
          else
        	  this.renderable.setCurrentAnimation('left');
        }
        else if(this.vel.y != 0)
        {
           // y axis
           if (this.vel.y < 0)
        	   this.renderable.setCurrentAnimation('up');
           else
        	   this.renderable.setCurrentAnimation('down');
        }
        
        if (this.removeMe == true) {
        	console.log("remvoe me");
        	this.dead = true;
        	me.game.remove(this);
        	game.Goverment.create();
        }
        
        if (this.firstStep) {
        	this.firstStep = false;
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
    	//console.log("call gov draw",context)
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
                this.dest.rect.draw(context, "orange");
            }   
            for (var i = 0, ii = this.myPath.length; i < ii; i+=1) {
                if (this.myPath[i] && this.myPath[i].rect) {
                    this.myPath[i].rect.draw(context, "blue");
                }
            }
        }
    }
});

game.Goverment = Object.extend({

    create : function create() {
        var settings = {};
        settings.image = "govermentPlayer"
        settings.spritewidth = 32;
        settings.spriteheight = 42;
        settings.name = "govermentPlayer";
        settings.width = 48;
        // console.log("npcData.coordenadas[0].initStartX:", npcData.coordenadas[0].initStartX);

        // Create a new npc *ads_tile_size to transform map coordinates to tile coordinates
        character = new game.GovermentEntity(30 * 32, 11 * 32, settings);

        me.game.add(character, 7);
        me.game.sort();
    }
});

game.TreeEntity = me.CollectableEntity.extend({
	settings: null,
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
	mainPlayer: null,
	data:{},
    init: function(x, y, settings) {
    	settings.spritewidth = 32;
        // call the parent constructor
        this.parent(x, y, settings);
        this.settings = settings;
        this.data = this.settings.data;
        this.mainPlayer = me.game.getEntityByName('mainPlayer')[0];
        me.input.registerPointerEvent('mousedown', this.collisionBox, this.onMouseDown.bind(this), true, false);
        me.input.registerPointerEvent('mousemove', this.collisionBox, this.onMouseOver.bind(this), true, false);
    },
    onMouseOver: function(event) {
    	console.log("entity over");
    },
    onMouseDown: function(event) {
    	var self = this;
    	this.mainPlayer.skipClick = true;
    	me.event.publish("entityclick", [ event ]);
    	console.log("onmouse down treenetity")
    	
    	
    	game.InfoWindow.show(this.settings);
    	

    	me.event.subscribe("after/main/player/click", function (event) {
    		self.mainPlayer.skipClick = false;
    		console.log("after main player click");
    	});
    },
    
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
    	
        // do something when collected
 
        // make sure it cannot be collected "again"
        //this.collidable = false;
        // remove it
        //me.game.remove(this);
    },
    
    draw: function(context) {
    	if (typeof this.settings.manual == "undefined" || this.settings.manual != true)
    		return false;
    	this.parent(context);
    }
	
});




