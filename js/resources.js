//game resources
game.resources = [
    /**
     * Graphics.
     */
    {name: "logo",  type:"image", src: "tilesets/logo.png"},
    {name: "startup",  type:"image", src: "tilesets/startscreen.png"},
    {name: "32x32_font",          type:"image",	src: "font/32x32_font.png"},
    
    {name: "loginBtn",  type:"image", src: "tilesets/loginBtn.png"},
    {name: "signupBtn",  type:"image", src: "tilesets/signupBtn.png"},
    
    
 // our level tileset
    {name: "tileset-shinygold-resized",  type:"image", src: "tilesets/tileset-shinygold-resized.png"},
    {name: "tile-2",  type:"image", src: "tilesets/tile-2.png"},
    {name: "tile-3",  type:"image", src: "tilesets/tile-3.png"},
    {name: "Building",  type:"image", src: "tilesets/Building.png"},
    {name: "BuildingK",  type:"image", src: "tilesets/BuildingK.png"},
    {name: "Building-3",  type:"image", src: "tilesets/Building-3.png"},
    {name: "mainPlayer",  type:"image", src: "tilesets/man_character.png"},
    {name: "female",  type:"image", src: "tilesets/girl_character.png"},
    {name: "male",  type:"image", src: "tilesets/man_character.png"},
    {name: "govermentPlayer",  type:"image", src: "tilesets/goverment_character.png"},
    {name: "metatiles32x32",  type:"image", src: "tilesets/metatiles32x32.png"},
    
    
    {name: "treeentity",  type:"image", src: "tilesets/tree.png"},
    {name: "treeentitypink",  type:"image", src: "tilesets/pink_tree.png"},
    {name: "treetransparent",  type:"image", src: "tilesets/tree_transparent.png"},
    
    {name: "trashentity",  type:"image", src: "tilesets/trash_can.png"},
    {name: "roadlentity",  type:"image", src: "tilesets/road_light32.png"},
    {name: "trafficlentity",  type:"image", src: "tilesets/traffic32.png"},
    
    
    {name: "profile_male",  type:"image", src: "images/profile_left_male.png"},
    {name: "profile_female",  type:"image", src: "images/profile_left_female.png"},
    
    /* AUDIO */
    {name: "livemylife", type: "audio",  src: "audio/", channel: 1},
    {name: "click", type: "audio",  src: "audio/", channel: 2},
    {name: "cartoonwalk", type: "audio",  src: "audio/", channel: 2},
    {name: "walk", type: "audio",  src: "audio/", channel: 2},
    /* 
     * Maps. 
     */
    {name: "FingerTown", type: "tmx", src: "Maps/FingerTown.tmx"}
 
];