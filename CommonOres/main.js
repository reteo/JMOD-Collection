/* Common Ores is a mod that provides common materials used by many mods.
 * This mod includes weapons, tools, and armor.
 * 
 * It is recommended to install Vanilla Ingot Works in order to make the alloys.
 */

// Before we begin, it helps to have a creative mode tab.
addCreativeTab("CommonOres.general","Common Ores: Ores and Metals","CommonOres:oreCopper");
addCreativeTab("CommonOres.tools","Common Ores: Tools and Weapons","CommonOres:toolPipeLead");
addCreativeTab("CommonOres.armor","Common Ores: Armor","CommonOres:armorSilverChestplate");

// First, let's assign colors.

defineColor("RED", 255, 0, 0);
defineColor("GREEN", 0, 255, 0);
defineColor("BLUE", 0, 0,255);

defineColor("ALUMINUM", 192, 192, 192);
defineColor("COPPER", 192, 104, 64);
defineColor("TIN", 128, 128, 128);
defineColor("BRONZE", 192, 88, 0);
defineColor("NICKEL", 221, 210, 168);
defineColor("LEAD", 179, 182, 220);
defineColor("SILVER", 227, 247, 255);
defineColor("PLATINUM", 102, 160, 255);
defineColor("ELECTRUM", 255, 255, 192);

// Now for some generic stuff to build from.
// NOTE: These are REQUIRED for addMetalBlock() and addMetalIngot() to work!
addBlock("MetalBlock").set({
	name : "blockMetalGeneric",
	hardness : 10.0,
	blastresistance : 10.0,
	tool : "pickaxe",
	harvestlevel : 1,
	material : "iron",
	tab : "CommonOres.general"
});

addItem("IngotGeneric").set({
	name : "ingotGeneric",
	stacksize : 64,
	tab : "CommonOres.general"
});

// Next, we add the blocks and ingots.
(function () {
    var metals = ["aluminum","copper","tin","bronze","nickel","lead","silver","platinum","electrum"];

    for(var m in metals){
        var metal = metals[m];
        addMetalBlock(metal);
        addOreDict("CommonOres:" + "block" + metal, "block" + metal);
        addMetalIngot(metal);
        addOreDict("CommonOres:" + "ingot" + metal, "ingot" + metal);
    }
})();

// Then, we add the ores.
(function () {
    var ores = ["Aluminum","Copper","Tin","Nickel","Lead","Silver","Platinum"];
    
    for(var m in ores){
        var ore = ores[m];
        addBlock("CoreBlock").set({
            name            : "ore" + ore,
            hardness        : 3.0,
            blastresistance : 5.0,
            tool            : "pickaxe",
            harvestlevel    : 1,
            material        : "rock",
            tab             : "CommonOres.general"
        });
        addOreDict("CommonOres:" + "ore" + ore, "ore" + ore);
        addSmeltingRecipe("CommonOres:" + "ingot" + ore,"CommonOres:" + "ore" + ore);
    }
})();

// Now, we move onto materials.
// First, for tools.
addToolMaterial( "FLINT",       1, 175,  5.0, 1.0, 10, "itemFlint" );
addToolMaterial( "ALUMINUM",    2, 175,  4.5, 2.0,  4, "ingotAluminum" );
addToolMaterial( "COPPER",      2, 180,  5.0, 1.0,  5, "ingotCopper" );
addToolMaterial( "BRONZE",      2, 250,  6.0, 1.0, 14, "ingotBronze" );
addToolMaterial( "NICKEL",      2, 200,  7.0, 2.5, 17, "ingotNickel" );
addToolMaterial( "LEAD",        0, 131,  7.0, 4.0,  0, "ingotLead" );
addToolMaterial( "SILVER",      2, 25,  16.0, 1.0, 20, "ingotSilver" );
addToolMaterial( "PLATINUM",    2, 400,  7.0, 1.0, 30, "ingotPlatinum" );
addToolMaterial( "ELECTRUM",    1, 100, 20.0, 0.0, 30, "ingotElectrum" );

// Then, for armor.
addArmorMaterial( "ALUMINUM",    6, 2, 4, 3, 1, 20, "ingotAluminum" );
addArmorMaterial( "COPPER",      8, 2, 5, 4, 1,  9, "ingotCopper" );
addArmorMaterial( "TIN",         8, 2, 4, 3, 1, 15, "ingotTin" );
addArmorMaterial( "BRONZE",     18, 2, 6, 5, 2,  9, "ingotBronze" );
addArmorMaterial( "NICKEL",     14, 2, 6, 5, 2, 15, "ingotNickel" );
addArmorMaterial( "SILVER",      7, 2, 5, 3, 1, 20, "ingotSilver" );
addArmorMaterial( "PLATINUM",   28, 3, 8, 6, 3, 20, "ingotPlatinum" );
addArmorMaterial( "ELECTRUM",    8, 2, 5, 4, 1, 28, "ingotElectrum" ); 

// Now, to actually make the tools and armor.
// First, the tools.
(function () {
    var toolTypes = ["Sword","Hoe","Pickaxe","Axe","Shovel"];
    var toolMats = ["Flint","Aluminum","Copper","Bronze","Nickel","Silver","Platinum","Electrum"];
    
    for(var m in toolMats) for(var n in toolTypes){
        var material = toolMats[m];
        var type = toolTypes[n];
		addItem("Tool" + type).set({
			name		:	"tool" + type + material,
			stacksize 	:	1,
			tab			:	"CommonOres.tools",
			tooldata	:	ToolData(material.toUpperCase())
		});
    	addShapedStandardRecipe("CommonOres:tool" + type + material, type.toLowerCase(), (material != "Flint" ? "ingot" : "item")+material);
    }
})();
// What's the point of lead if we can't have a lead pipe?  A very nasty weapon, but doesn't last long.
addItem("ToolSword").set({
    name        :   "toolPipeLead",
    stacksize   :   1,
    tab         :   "CommonOres.tools",
    tooldata    :   ToolData("LEAD")
});

// Lead Pipe doesn't have a default recipe.  Let's make one.
addShapedRecipe("CommonOres:toolPipeLead", [
  [null, null, "ingotLead"],
  [null, "ingotLead", null],
  ["ingotLead", null, null]]);

// Next, the Armor
(function () {
    var armorTypes = ["Helmet","Chestplate","Leggings","Boots"];
    var armorMats = ["Aluminum","Copper","Bronze","Nickel","Silver","Platinum","Electrum"];
    
    for(var m in armorMats) for(var n in armorTypes) {
        var material = armorMats[m];
        var type = armorTypes[n];
        addItem("CoreArmor").set({
            name : "armor" + material + type,
            stacksize : 1,
            tab : "CommonOres.armor",
            armordata : ArmorData(material.toUpperCase(), type.toLowerCase())
        });
    	addShapedStandardRecipe("CommonOres:armor" + material + type, type.toLowerCase(), "ingot" + material);
    }
})();

// If the chisel mod is included, let's add a few additional chisels to the game.
if(isModLoaded("chisel")){

    // Order of options: Material name, durability, has modes?
    var materials = [
        ["Flint",     64, false],
        ["Copper",   128, true],
        ["Aluminum", 256, true],
        ["Nickel",   320, true],
        ["Bronze",   512, true],
        ["Platinum", 640, true]
    ];
    
    for (var m in materials) {
        var material = materials[m];
        var mat = (material[0] != "Flint" ? "ingot" : "item")+material[0];
        
        addItem(".chisel.ToolChisel").set({
            name : "toolChisel"+material[0],
            stacksize : 1,
            tab : "CommonOres.tools",
            tooldata : ToolData(material[0].toUpperCase()).durability(material[1]).hasModes(material[2])
        });
        addShapedRecipe("CommonOres:toolChisel"+material[0], [
            [null,          mat,    null ],
            ["stickWood",   null,   null ],
            [null,          null,   null ]]);
    }
}

else log("Chisel mod is not installed; skipping chisel generation.");

// Finally, the ore needs to be spawned in the world.
// The order is "name", vein size, chances per chunk, lower Y level, higher Y level.
(function () {
    veins = [
        ["Alumninum", 7, 24, 5, 64],
        ["Copper", 7, 22, 5, 64],
        ["Tin", 7, 20, 5, 64],
        ["Nickel", 8, 12, 16, 48],
        ["Lead", 8, 8, 8, 32],
        ["Silver", 8, 4, 8, 32],
        ["Platinum", 4, 2, 5, 16]];
    
    for (var m in veins){
        var vein = veins[m];
        addOreGeneration().blockToGenerate("CommonOres:ore"+vein[0]).veinSize(vein[1]).chancesPerChunk(vein[2]).startY(vein[3]).endY(vein[4]);
    }
})();
