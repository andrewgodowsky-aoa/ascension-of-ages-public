// AoA KubeJS: aoa_recipes_capstone_convergence.js
// "Convergence capstones": a chapter's signature required machine is re-authored so
// its recipe pulls one DISTINCTIVE part from each major mod in that chapter -- the
// chapter's mods literally converge into one object, so every mod feels load-bearing.
// (Generalizes the 2-mod weaves + ir_native_capstone_recipes.js to the whole chapter.)
//
// Only applied where the red-team confirmed it fits WITHOUT grind/softlock:
//   * output has exactly ONE native crafting_shaped route (clean remove),
//   * 4-6 DISTINCTIVE parts (no bare staples), every part age <= the chapter's age,
//   * no cycle (no part's craft chain needs the output),
//   * the output is a real required quest item that stays craftable.
// Chapters that are single-mod-dominant, boss/dimension capstones, or whose parts
// are atomic+/machine-only were intentionally SKIPPED (see docs).
//
// Verified 2026-06-05 vs jar lang (existence), .aoa_recipe_audit/locks.json +
// craft_age.json (ages), and native-recipe dumps (single route).

ServerEvents.recipes(event => {

  // --- C1  ir_power_motion_and_grid -> Power-Grid Convergence  [IR] ----------
  // powergrid:circuit_design_table is the power chapter's design gateway. Re-author
  // it as the convergence of every IR power mod: Create C&A tesla coil, Dynamic
  // Electricity alternator, Electrodynamics combustion chamber, Oritech generator,
  // IE LV capacitor -- around the native Create electron tube + schematic identity.
  // (All parts age <= 3.)
  event.remove({ output: 'powergrid:circuit_design_table' })
  event.shaped('powergrid:circuit_design_table', [
    'TES',
    'AOB',
    'GPP'
  ], {
    T: 'createaddition:tesla_coil',
    E: 'create:electron_tube',
    S: 'create:empty_schematic',
    A: 'dynamicelectricity:alternator',
    O: 'oritech:basic_generator_block',
    B: 'electrodynamics:combustionchamber',
    G: 'immersiveengineering:capacitor_lv',
    P: '#minecraft:planks'
  }).id('aoa:capstone_convergence/power_grid')

  // --- C2  ir_create_industrial_addons -> Diesel-Refinery Convergence  [IR] --
  // createdieselgenerators:distillation_controller is the Create-oil chapter's
  // refinery brain (native yields 4 -- preserved). Convergence of the Create-family
  // addons: New Age magnet, Ore Excavation vein finder, Crafts & Additions large
  // connector, PneumaticCraft refinery, Immersive Petroleum bitumen -- around the
  // native Create precision mechanism + andesite identity. (All parts age <= 3.)
  event.remove({ output: 'createdieselgenerators:distillation_controller' })
  event.shaped(Item.of('createdieselgenerators:distillation_controller', 4), [
    'MVL',
    'RPB',
    'AIA'
  ], {
    M: 'create_new_age:layered_magnet',
    V: 'createoreexcavation:vein_finder',
    L: 'createaddition:large_connector',
    R: 'pneumaticcraft:refinery',
    P: 'create:precision_mechanism',
    B: 'immersivepetroleum:bitumen',
    A: 'create:andesite_alloy',
    I: '#c:plates/iron'
  }).id('aoa:capstone_convergence/diesel_refinery')

  // --- C4  g5_empire_of_iron -> Heavy-Industry Convergence  [GILDED] ---------
  // modern_industrialization:centrifuge is the Empire of Iron chapter's signature
  // machine. Convergence of Gilded heavy industry: Actually Additions advanced coil,
  // BlastCraft blast compressor, Industrialization Overdrive pyrolyse oven, Immersive
  // Engineering heavy engineering, Immersive Petroleum asphalt -- around the native
  // MI machine hull + motor identity. (All parts age <= 4; no atomic+ ingredient.)
  event.remove({ output: 'modern_industrialization:centrifuge' })
  event.shaped('modern_industrialization:centrifuge', [
    'ABP',
    'EHS',
    'LHL'
  ], {
    A: 'actuallyadditions:advanced_coil',
    B: 'blastcraft:blastcompressor',
    P: 'industrialization_overdrive:pyrolyse_oven',
    E: 'immersiveengineering:heavy_engineering',
    H: 'modern_industrialization:basic_machine_hull',
    S: 'immersivepetroleum:asphalt',
    L: 'modern_industrialization:large_motor'
  }).id('aoa:capstone_convergence/heavy_industry')

})
