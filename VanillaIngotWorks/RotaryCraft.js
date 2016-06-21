// This will add alloy recipes for the RotaryCraft Blast Furnace.
// Legend: Result [Ingredient 1, Ingredient 2].
var recipes = [
    ["Bronze",      ["Copper","Tin"]],
    ["Electrum",    ["Silver","Gold"]],
];

for (var m in recipes)
    RotaryCraft.addBlastFurnaceRecipe("ingot" + recipes[m][0], 600, 1, 0, [["ingot" + recipes[m][1][0], "ingot" + recipes[m][1][1], null], [null, null, null], [null,null,null]]);

// Steel is a different story.  A loop won't cut it here.
// RotaryCraft already has HSLA steel recipes, this is for the lower-grade steel.
RotaryCraft.addBlastFurnaceAlloying	("SurvivalIndustry:ingotSteel","ingotIron",550).setXP(1).input(1,"itemCoal",100,2); // coal
RotaryCraft.addBlastFurnaceAlloying	("SurvivalIndustry:ingotSteel","ingotIron",550).setXP(1).input(1,"itemCharcoal",100,4); // charcoal

// Next is iron with one coal coke in the side slot.
RotaryCraft.addBlastFurnaceAlloying	("SurvivalIndustry:ingotSteel","ingotIron",550).setXP(1).input(1,"coalCoke",100,1);

// By adding gunpowder in addition to coal coke, and bringing up the heat, we can get bonus metal.
RotaryCraft.addBlastFurnaceAlloying	("SurvivalIndustry:ingotSteel","ingotIron",1200).setXP(1).input(1,"coalCoke",100,1).input(2,"dustGunpowder",3,1);

// Now, EnderIO stuff is included here.
if (isModLoaded("EnderIO"){
    
// EnderIO Definitions
    var eioSilicon              =	"EnderIO:itemMaterial:1";
    // EnderAlloy
    var electricalSteel         =	"EnderIO:itemAlloy:0";
    var energeticAlloy          =	"EnderIO:itemAlloy:1";
    var vibrantAlloy            =	"EnderIO:itemAlloy:2";
    var redstoneAlloy           =	"EnderIO:itemAlloy:3";
    var conductiveIron          =	"EnderIO:itemAlloy:4";
    var pulsatingIron           =	"EnderIO:itemAlloy:5";
    var darkSteel               =	"EnderIO:itemAlloy:6";
    var soularium               =	"EnderIO:itemAlloy:7";
    //FusedQuartz   
    var fusedQuartz             =	"EnderIO:blockFusedQuartz:0";
    var quiteClearGlass         =	"EnderIO:blockFusedQuartz:1";
    var enlightenedFusedQuartz	=	"EnderIO:blockFusedQuartz:2";
    var enlightenedClearGlass   =	"EnderIO:blockFusedQuartz:3";
    var darkFusedQuartz         =	"EnderIO:blockFusedQuartz:4";
    var darkClearGlass          =	"EnderIO:blockFusedQuartz:5";
       
    var recipe = [
        [electricalSteel,    600,1,0,[["ingotSteel","itemSilicon",null],[null,null,null],[null,null,null]]],
        [electricalSteel,	 600,1,0,[["ingotHSLA","itemSilicon",null],[null,null,null],[null,null,null]]],
        [energeticAlloy,	1000,1,0,[["dustRedstone","ingotGold","dustGlowstone"],[null,null,null],[null,null,null]]],
        [vibrantAlloy,		1450,1,0,[["ingotEnergeticAlloy","pearlEnder",null],[null,null,null],[null,null,null]]],
        [conductiveIron,	 600,1,0,[["dustRedstone","ingotIron",null],[null,null,null],[null,null,null]]],
        [redstoneAlloy,		 600,1,0,[["dustRedstone","itemSilicon",null],[null,null,null],[null,null,null]]],
        [pulsatingIron,		1000,1,0,[["pearlEnder","ingotIron",null],[null,null,null],[null,null,null]]],
        [darkSteel,			1200,1,0,[["ingotSteel","blockObsidian",null],[null,null,null],[null,null,null]]],
        [darkSteel,			1200,1,0,[["ingotHSLA","blockObsidian",null],[null,null,null],[null,null,null]]],
        [soularium,			1450,1,0,[["soulsand","ingotGold",null],[null,null,null],[null,null,null]]]
    ];

    for (var m in recipe)
        RotaryCraft.addBlastFurnaceRecipe(recipe[m][0],recipe[m][1],recipe[m][2],recipe[m][3],recipe[m][4]);

    RotaryCraft.addBlastFurnaceAlloying	(fusedQuartz, "gemQuartz",600).required(4).setXP(1);
    RotaryCraft.addBlastFurnaceAlloying	(quiteClearGlass, "sand",600).required(1).setXP(1);
    RotaryCraft.addBlastFurnaceAlloying	(enlightenedFusedQuartz, "gemQuartz",600).required(4).setXP(1).input(1,"dustGlowstone",100,4);
    RotaryCraft.addBlastFurnaceAlloying	(enlightenedClearGlass, "sand",600).required(1).setXP(1).input(1,"dustGlowstone",100,4);
    RotaryCraft.addBlastFurnaceAlloying	(darkFusedQuartz, "gemQuartz",600).required(4).setXP(1).input(1,"dyeBlack",100,4);
    RotaryCraft.addBlastFurnaceAlloying	(darkClearGlass, "sand",600).required(1).setXP(1).input(1,"dyeBlack",100,4);
    RotaryCraft.addBlastFurnaceAlloying (eioSilicon,"sand",800).input(1,aluminumFlakes,25,1).input(1,"itemCoal",25,1);
    RotaryCraft.addBlastFurnaceAlloying (eioSilicon,"sand",800).input(1,aluminumFlakes,25,1).input(1,"itemCoal",25,1);
    RotaryCraft.addBlastFurnaceAlloying (eioSilicon,"sand",800).input(1,aluminumFlakes,25,1).input(1,"coalCoke",25,1).addBonus();
}