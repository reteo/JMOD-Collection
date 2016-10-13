// Ore creation
(function () {
    var ores = ["Aluminum", "Copper", "Tin", "Nickel", "Lead", "Silver", "Platinum"];

    for(var m in ores){
        var ore = ores[m];
        addBlock("ore" + ore, "CoreBlock", 3.0, 5.0, "pickaxe", 1, "rock", "MohsMining.general");
        addOreDict("MohsMining:" + "ore" + ore, "ore" + ore);
        addSmeltingRecipe("MohsMining:" + "ingot" + ore, "MohsMining:" + "ore" + ore);
    }
})();

// ----------------------------------------------------------------------------- //


// Ore Stats
// Legend: blockID, [[Harvest level, hardness/blast resistance for meta 0], [hr, bl/hd for meta 1], ... [hr, bl/hd for meta n]]
//      a harvest level of -1 means the meta is not altered.
(function(){
    var blocks = [
        ["minecraft:coal_ore",          [[1, 4.2]], null], 
        ["MohsMining:oreTin",           [[1, 7.0]], null], 
        ["MohsMining:oreLead",          [[1, 9.1]], null], 
        ["minecraft:gold_ore",          [[1, 20.4]], null], 
        ["MohsMining:oreSilver",        [[1, 12.5]], null], 
        ["MohsMining:oreAluminum",      [[1, 5.8]], null], 
        ["MohsMining:oreCopper",        [[2, 12.7]], null], 
        ["minecraft:redstone_ore",      [[2, 12.7]], null], 
        ["minecraft:lit_redstone_ore",  [[2, 12.7]], null], 
        ["MohsMining:orePlatinum",      [[2, 30.0]], null], 
        ["MohsMining:oreNickel",        [[3, 15.8]], null], 
        ["minecraft:iron_ore",          [[3, 14.4]], null], 
        ["minecraft:lapis_ore",         [[6, 9.3]], null], 
        ["minecraft:obsidian",          [[5, 7.7]], null], 
        ["minecraft:emerald_ore",       [[7, 16.1]], null], 
        ["minecraft:quartz_ore",        [[6, 9.7]], null], 
        ["minecraft:diamond_ore",       [[7, 12.7]], null], 
        ["appliedenergistics2:tile.OreQuartz", 
                                        [[6, 9.7]], "appliedenergistics2"], 
        ["appliedenergistics2:tile.OreQuartzCharged", 
                                        [[6, 9.7]], "appliedenergistics2"], 
        ["appliedenergistics2:tile.BlockSkyStone", 
                                        [[7, 20.0]], "appliedenergistics2"], 
        // Forestry:  Apatite, Copper, Tin
        ["Forestry:resources",          [[4, 8.8], [2, 12.7], [1, 7.0]], "Forestry"], 
        ["minechem:tile.oreUranium",    [[6, 26.6]], "minechem"], 
        // ElectriCraft: Copper, Tin, Silver, Nickel, Aluminum, Platinum
        ["ElectriCraft:electricraft_block_ore", 
                                        [[2, 12.7], [1, 7.0], [1, 12.5], [3, 15.8], [1, 5.8], [2, 30.0]], "ElectriCraft"], 
        // Project Red: Ruby, Sapphire, Peridot, Copper, Tin, Silver, Electrotine
        ["ProjRed|Exploration:projectred.exploration.ore", 
                                        [[6, 11.1], [7, 16.1], [6, 11.5], [2, 12.7], [1, 7.0], [1, 12.5], [2, 12.7]], "ProjRed|Exploration"], 
        // Railcraft: Sulfur, Saltpeter, Abyssal (Diamond, Emerald, Lapis), Firestone, (null), Poor (Iron, Gold, Copper, Tin, Lead)
        ["Railcraft:ore",               [[1, 5.0], [1, 4.0], [7, 12.7], [7, 16.1], [6, 9.3], [6, 9.5], [-1, -1], [3, 14.4], [1, 20.4], [2, 12.7], [1, 7.0], [1, 9.1]], "Railcraft"], 
        ["ReactorCraft:reactorcraft_block_fluoriteore", 
                                        [[4, 7.6], [4, 7.6], [4, 7.6], [4, 7.6], [4, 7.6], [4, 7.6], [4, 7.6], [4, 7.6]], "ReactorCraft"], 
        // ReactorCraft: (null) Pitchblende, Cadmium, Indium, Silver, End Pitchblende, Ammonium Chloride, Calcite, Magnetite, Thorite
        ["ReactorCraft:reactorcraft_block_ore", 
                                        [[-1, -1], [6, 26.6], [1, 9.2], [1, 6.0], [1, 12.5], [6, 26.6], [1, 3.0], [2, 5.9], [7, 15.2], [5, 12.6]], "ReactorCraft"]
    ];
    
    for (var m in blocks){
        var block = blocks[m];
        if ((block[2] == null) || isModLoaded(block[2])){
            for (var n in block[1]) {
                var valueGroup = block[1][n];
                var meta = n;
                var harvestLevel = valueGroup[0];
                var sturdiness = valueGroup[1];
                
                var currentBlock = setBlockProperties(block[0]);  // Used with Harvest Level
                var currentMeta = setBlockProperties(block[0] + ":" + n); // Used with Blast Resistance and Hardness
                
                if (harvestLevel >= 0)
                    currentBlock.harvestlevel(n, harvestLevel);
                    
                if (sturdiness >= 0) {
                    currentMeta.hardness(sturdiness);
                    currentMeta.blastresistance(sturdiness);
                }
            }
        }
    }

})();


// ----------------------------------------------------------------------------- //



// Ore Spawning

// The order is "name", vein size, chances per chunk, lower Y level, higher Y level.
(function() {
    if (!isModLoaded("CustomOreGen")){
        ores = [
            ["Aluminum", 7, 24, 5, 64], 
            ["Copper", 7, 22, 5, 64], 
            ["Tin", 7, 20, 5, 64], 
            ["Nickel", 8, 12, 16, 48], 
            ["Lead", 8, 8, 8, 32], 
            ["Silver", 8, 4, 8, 32], 
            ["Platinum", 4, 2, 5, 16]];
        
        for (var m in ores){
            var ore = ores[m];
            
            var oreName = ore[0];
            var size = ore[1];
            var chances = ore[2];
            var bottom = ore[3];
            var top = ore[4];
            
            addOreGeneration().blockToGenerate("MohsMining:ore"+oreName).veinSize(size).chancesPerChunk(chances).startY(bottom).endY(top);
        }
    }
})();
