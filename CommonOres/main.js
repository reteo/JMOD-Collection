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
defineColor("BRONZE", 192, 88, 0);
defineColor("COPPER", 192, 104, 64);
defineColor("PLATINUM", 102, 160, 255);
defineColor("ELECTRUM", 255, 255, 192);
defineColor("TIN", 128, 128, 128);
defineColor("ALUMINUM", 192, 192, 192);
defineColor("SILVER", 227, 247, 255);
defineColor("LEAD", 179, 182, 220);
defineColor("NICKEL", 221, 210, 168);

// Now for some generic stuff to build from.
// NOTE: These are REQUIRED for addMetalBlock() and addMetalIngot() to work!
addBlock("blockMetalGeneric", "MetalBlock", 10.0, 10.0, "pickaxe", 1, "iron", "CommonOres.general");
addItem("ingotGeneric", "IngotGeneric", 64, "CommonOres.general");

// Next, we add the blocks and ingots.
var metals = ["bronze","electrum","silver","copper","tin", "platinum","aluminum","lead","nickel"];

for(var m in metals){
    addMetalBlock(metals[m]);
    addOreDict("CommonOres:" + "block" + metals[m], "block" + metals[m]);
    addMetalIngot(metals[m]);
    addOreDict("CommonOres:" + "ingot" + metals[m], "ingot" + metals[m]);
}

// Then, we add the ores.
var ores = ["Silver","Copper","Tin", "Platinum","Aluminum","Lead","Nickel"];

for(var m in ores){
    addBlock("ore" + ores[m], "CoreBlock", 3.0, 5.0, "pickaxe", 1, "rock", "CommonOres.general");
    addOreDict("CommonOres:" + "ore" + ores[m], "ore" + ores[m]);
    addSmeltingRecipe("CommonOres:" + "ingot" + ores[m],"CommonOres:" + "ore" + ores[m]);
}

// Now, we move onto materials.
// First, for tools.
addToolMaterial( "FLINT", 1, 175, 5.0,1.0,10, "itemFlint" );
addToolMaterial( "COPPER", 2, 180, 5.0,1.0, 5, "ingotCopper" );
addToolMaterial( "ELECTRUM", 1, 100,20.0,0.0,30, "ingotElectrum" );
addToolMaterial( "SILVER", 2, 25,16.0,1.0,20, "ingotSilver" );
addToolMaterial( "ALUMINUM", 2, 175, 4.5,2.0, 4, "ingotAluminum" );
addToolMaterial( "BRONZE", 2, 250, 6.0,1.0,14, "ingotBronze" );
addToolMaterial( "PLATINUM", 2,400, 7.0,1.0,30, "ingotPlatinum" );
addToolMaterial( "NICKEL", 2, 200, 7.0,2.5,17, "ingotNickel" );
addToolMaterial( "LEAD", 0, 131, 7.0,4.0,0, "ingotLead" );

// Then, for armor.
addArmorMaterial( "COPPER", 8,2,5,4,1, 9,"ingotCopper" );
addArmorMaterial( "TIN", 8,2,4,3,1,15,"ingotTin" );
addArmorMaterial( "ALUMINUM", 6,2,4,3,1,20,"ingotAluminum" );
addArmorMaterial( "BRONZE", 18,2,6,5,2, 9,"ingotBronze" );
addArmorMaterial( "SILVER", 7,2,5,3,1,20,"ingotSilver" );
addArmorMaterial( "ELECTRUM", 8,2,5,4,1,28,"ingotElectrum" ); 
addArmorMaterial( "PLATINUM", 28,3,8,6,3,20,"ingotPlatinum" );
addArmorMaterial( "NICKEL", 14,2,6,5,2, 15,"ingotNickel" );

// Now, to actually make the tools and armor.
// First, the tools.
var toolTypes = ["Sword","Hoe","Pickaxe","Axe","Shovel"];
var toolMats = ["Flint","Bronze","Electrum","Silver","Copper","Platinum","Aluminum","Nickel"];

for(var m in toolMats) for(var n in toolTypes){
	addItem("tool" + toolTypes[n] + toolMats[m],"Tool" + toolTypes[n],1,"CommonOres.tools").tooldata(ToolData(toolMats[m].toUpperCase()));
	addShapedStandardRecipe("CommonOres:tool" + toolTypes[n] + toolMats[m], toolTypes[n].toLowerCase(), (toolMats[m] != "Flint" ? "ingot" : "item")+toolMats[m]);
}

// What's the point of lead if we can't have a lead pipe?  A very nasty weapon, but doesn't last long.
addItem("toolPipeLead","ToolSword",1,"CommonOres.tools").tooldata(ToolData("LEAD"));;

// Lead Pipe doesn't have a default recipe.  Let's make one.
addShapedRecipe("CommonOres:toolPipeLead", [
  [null, null, "ingotLead"],
  [null, "ingotLead", null],
  ["ingotLead", null, null]]);

// Next, the Armor
var armorTypes = ["Helmet","Chestplate","Leggings","Boots"];
var armorMats = ["Bronze","Electrum","Silver","Copper","Platinum","Aluminum","Nickel"];

for(var m in armorMats) for(var n in armorTypes) {
	addItem("armor" + armorMats[m] + armorTypes[n],"CoreArmor",1,"CommonOres.armor").armordata(ArmorData(armorMats[m].toUpperCase(),armorTypes[n].toLowerCase()));
	addShapedStandardRecipe("CommonOres:armor" + armorMats[m] + armorTypes[n],armorTypes[n].toLowerCase(),"ingot"+armorMats[m]);
}

// Finally, the ore needs to be spawned in the world.
// The order is "name", vein size, chances per chunk, lower Y level, higher Y level.
ores = [
    ["Silver", 8, 4, 8, 40],
    ["Copper", 7, 24, 5, 75],
    ["Tin", 7, 22, 6, 60],
    ["Alumninum", 7, 18, 5, 45],
    ["Platinum", 4, 2, 6, 16],
    ["Lead", 8, 8, 11, 35],
    ["Nickel", 8, 6, 16, 48]];

for (var m in ores){
    addOreGeneration().blockToGenerate("CommonOres:ore"+ores[m][0]).veinSize(ores[m][1]).chancesPerChunk(ores[m][2]).startY(ores[m][3]).endY(ores[m][4]);
}