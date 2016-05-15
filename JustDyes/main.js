/* Just Dyes: This mod adds origin-neutral, single-purpose dyes to the game.  This is because: 
 * bonemeal can also grow plants, lapis lazuli is explicitly a mineral, cactus green doubles as
 * sealant in several mods, ink sacs are specific to squids, and cocoa beans are also a food
 * ingredient.  All the other dyes are explicit dyes, any reference to their source can be a
 * reference to the color instead of the source. 
 * 
 * NOTE: It is recommended you include a mod that includes dye-based flowers, such as
 *       "Pam's Weee! Flowers".
 */

// Before we begin, let's set up the creative tab.
addCreativeTab("JustDyes.general","Just Dyes","JustDyes:itemDyeWhite");


// First, to label the colors.
// Name, color index, vanilla dye meta, source to keep (for alternate uses), number to make of vanilla dye
var colors = [
    ["White",0,15,"minecraft:bone",3],          // Bonemeal
    ["Blue",11,4,"minecraft:lapis_block",9],    // Lapis Lazuli
    ["Brown",12,3,null,null],                   // Cocoa Beans
    ["Green",13,2,null,null],                    // Cactus Green
    ["Black",15,0,null,null]];                   // Ink Sac

for (var m in colors){
    // First, add the dye item.
    addItem("itemDye"+colors[m][0], "CoreDye", 64, "JustDyes.general").colorindex(colors[m][1]);
    // Then, assign it to the Ore Dictionary.
    addOreDict("JustDyes:itemDye"+colors[m][0],  "dye"+colors[m][0]);
    addOreDict("JustDyes:itemDye"+colors[m][0],  "dye");
    // Onto the recipes.
    removeRecipes( "minecraft:dye:"+colors[m][2]);
    addShapelessRecipe("JustDyes:itemDye"+colors[m][0], ["flower"+colors[m][0]]);  // Results in one dye
    addShapelessRecipe("JustDyes:itemDye"+colors[m][0]+"@8", ["flower"+colors[m][0],"minecraft:glass_bottle","dustRedstone"]); //Results in 8 dyes
    if (colors[m][3] != null)  // Keep the vanilla recipe for this material, since it is important.
        addShapelessRecipe("minecraft:dye:"+colors[m][2]+"@"+colors[m][4], [colors[m][3]]); 
}
