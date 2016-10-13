// Generic templates
// NOTE: These are REQUIRED for addMetalBlock() and addMetalIngot() to work!
addBlock("blockMetalGeneric", "MetalBlock", 10.0, 10.0, "pickaxe", 1, "iron", "MohsMining.general");
addItem("ingotGeneric", "IngotGeneric", 64, "MohsMining.general");

// ----------------------------------------------------------------------------- //


// Metal and block and ingot creation.
// This loop does not create ores, since it also includes alloy metals.
var metals = ["Steel",
              "Aluminum",
              "Copper",
              "Tin",
              "Bronze",
              "Nickel",
              "Lead",
              "Silver",
              "Platinum",
              "Electrum"];

for(var m in metals){
    var metal = metals[m];
    addMetalIngot(metal);
    addOreDict("MohsMining:ingot" + metal, "ingot" + metal);
    addMetalBlock(metal);
    addOreDict("MohsMining:block" + metal, "block" + metal);
}

// While we're on it, let's make blocks for ReactorCraft metals.
// Legend: name, hardness, blast resistance, harvest level
if(isModLoaded("ReactorCraft")){
    var metals = ["Pitchblende", 
                  "Cd-In-Ag Alloy"];
    
    for (var m in metals){
        var metal = metal;
        addMetalBlock(metal);
        addOreDict("MohsMining:block" + metal, "block" + metal);
        addShapedStandardRecipe("MohsMining:block" + metal, "block", "ingot" + metal);
    }
    
    // Pitchblende is actually Uranium, so we need to add that oredict as well.
    addOreDict("MohsMining:blockPitchblende", "blockUranium");
}


// ----------------------------------------------------------------------------- //


// Tool creation

for (var m in toolmat)
    addToolMaterial(toolmat[m][0],toolmat[m][1],toolmat[m][2],toolmat[m][3],toolmat[m][4],toolmat[m][5],toolmat[m][6]);    

var toolTypes = ["Sword",
                 "Hoe",
                 "Pickaxe",
                 "Axe",
                 "Shovel"];
                 
var toolMats = [["Tin",     "TIN",      "ingotTin"],
                ["Electrum","ELECTRUM", "ingotElectrum"],
                ["Flint",   "FLINT",    "itemFlint"],
                ["Aluminum","ALUMINUM", "ingotAluminum"],
                ["Silver",  "SILVER",   "ingotSilver"],
                ["Copper",  "COPPER",   "ingotCopper"],
                ["Platinum","PLATINUM", "ingotPlatinum"],
                ["Bronze",  "BRONZE",   "ingotBronze"],
                ["Nickel",  "NICKEL",   "ingotNickel"],
                ["Steel",   "STEEL",    "ingotSteel"],
                ["Obsidian","OBSIDIAN", "blockObsidian"],
                ["Emerald", "TEMERALD", "gemEmerald"],
                ["Quartz",  "QUARTZ",   "crystalNetherQuartz"]];

for(var m in toolMats) for(var n in toolTypes){
    var material = toolMats[m];
    var type = toolTypes[n];
	addItem("tool" + type + material[0], "Tool" + type, 1, "MohsMining.tools").tooldata(ToolData(material[1]));
	addShapedStandardRecipe("MohsMining:tool" + type + material[0], type.toLowerCase(), material[2]);
}

// What's the point of lead if we can't have a lead pipe?  A very nasty weapon, but doesn't last long.
addItem("toolPipeLead","ToolSword",1,"MohsMining.tools").tooldata(ToolData("LEAD"));;

// Lead Pipe doesn't have a default recipe.  Let's make one.
addShapedRecipe("MohsMining:toolPipeLead", [
    [null, null, "ingotLead"],
    [null, "ingotLead", null],
    ["ingotLead", null, null]]);


// If the chisel mod is included, let's add a more chisels to the game.

if(isModLoaded("chisel")){

    // Order of options: Material name, durability, has modes?
    var materials = [
        ["Flint",       64,     false,  "itemFlint"],
        ["Aluminum",   128,     false,  "ingotAluminum"],
        ["Copper",     256,     false,  "ingotCopper"],
        ["Platinum",   320,     false,  "ingotPlatinum"],
        ["Nickel",     400,     true,   "ingotNickel"],
        ["Bronze",     512,     true,   "ingotBronze"],
        ["Steel",      920,     true,   "ingotSteel"],
        ["Quartz",     1200,    true,   "crystalNetherQuartz"],
        ["Emerald",    1500,    true,   "gemEmerald"]
    ];

    for (var m in materials) {
        var material = materials[m];
        var mat = material[3];
        var chiselItem = addItem("toolChisel" + material[0], "ToolChisel", 1, "MohsMining.tools");
        
        chiselItem.tooldata(ToolData(material[0].toUpperCase())
            .durability(material[1])
            .hasModes(material[2]));
        
        addShapedRecipe("MohsMining:toolChisel"+material[0],
           [[null,          mat,    null ],
            ["stickWood",   null,   null ],
            [null,          null,   null ]]);
    }
}

// ----------------------------------------------------------------------------- //


// Armor creation
var armorTypes = ["Helmet",
                  "Chestplate",
                  "Leggings",
                  "Boots"];
                  
var armorMats = [["Tin",        "TIN",      "ingotTin"],
                 ["Lead",       "LEAD",     "ingotLead"],
                 ["Electrum",   "ELECTRUM", "ingotElectrum"],
                 ["Aluminum",   "ALUMINUM", "ingotAluminum"],
                 ["Silver",     "SILVER",   "ingotSilver"],
                 ["Copper",     "COPPER",   "ingotCopper"],
                 ["Platinum",   "PLATINUM", "ingotPlatinum"],
                 ["Nickel",     "NICKEL",   "ingotNickel"],
                 ["Bronze",     "BRONZE",   "ingotBronze"],
                 ["Steel",      "STEEL",    "ingotSteel"],
                 ["Obsidian",   "OBSIDIAN", "blockObsidian"],
                 ["Emerald",    "TEMERALD", "gemEmerald"],
                 ["Quartz",     "QUARTZ",   "crystalNetherQuartz"]
];

for(var m in armorMats) for(var n in armorTypes) {
    var material = armorMats[m];
    var type = armorTypes[n];
	addItem("armor" + material[0] + type,"CoreArmor",1,"MohsMining.armor").armordata(ArmorData(material[1], type.toLowerCase()));
	addShapedStandardRecipe("MohsMining:armor" + material[0] + type,type.toLowerCase(), (material[2]));
}
