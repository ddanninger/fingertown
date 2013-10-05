game.LoginButton = me.GUI_Object.extend({
	init : function(x, y) {
		console.log("loginbutton");
		settings = {}
		settings.image = "loginBtn";
		settings.spritewidth = 160;
		settings.spriteheight = 50;
		settings.x = x;
		settings.y = y;

		// parent constructor
		this.parent(x, y, settings);
	},
	onClick : function() {
		console.log("click button");
	}
});

game.SignupButton = me.GUI_Object.extend({
	init : function(x, y) {
		settings = {}
		settings.image = "signupBtn";
		settings.spritewidth = 150;
		settings.spriteheight = 50;
		settings.x = x;
		settings.y = y;

		// parent constructor
		this.parent(x, y, settings);
	},
	onClick : function() {
		game.characterWindow.show();
	}
});