// AoA KubeJS: aoa_recipes_gilded_weaves.js
// Cross-mod recipe weaves for the GILDED AGE (advanced-industry / oceanic-biotech /
// refinery age). Binds already-required Gilded mods through distinctive controllers.
//
// Verified 2026-06-04 against jar lang + live native recipe JSON + AStages
// (.aoa_recipe_audit/locks.json + craft_age.json): every added feedstock resolves to
// age <= gilded_age (NO atomic+ ingredient -- the documented Gilded failure mode);
// one native crafting_shaped route per output => one event.remove({output}) per weave;
// no cycle (each feedstock chain is independent of its output); every output stays
// craftable at Gilded (all are live FTBQ item tasks).
//
// Most native grids are full 3x3, so one duplicated native ingredient is reduced by 1 to
// seat the feedstock; every native key still appears >= 1x (identity preserved).

ServerEvents.recipes(event => {
  // --- G1 Biotic Reactor Vessel (enderio -> nautec) -----------------------
  // EnderIO pulsating crystals seed the prismarine bio-reactor's living core, keeping its
  // metabolism "alive" (replacing two of the four polished-prismarine filler blocks).
  event.remove({ output: 'nautec:bio_reactor' })
  event.shaped('nautec:bio_reactor', [
    'CCC',
    'PAP',
    'XLX'
  ], {
    C: 'minecraft:prismarine_crystals',
    P: 'nautec:polished_prismarine',
    A: 'nautec:aquatic_chip',
    L: 'nautec:laser_channeling_coil',
    X: 'enderio:pulsating_crystal'
  }).id('aoa:gilded_weaves/biotic_reactor_vessel')

  // --- G3 Petrochemical Laser Lens (immersivepetroleum -> industrialforegoing) ---
  // Immersive Petroleum bitumen tars/seals the ore-laser optics housing (replacing one iron
  // ore and one diamond gear) -- the refinery age fuels the mining laser.
  event.remove({ output: 'industrialforegoing:ore_laser_base' })
  event.shaped('industrialforegoing:ore_laser_base', [
    'pfp',
    'Zmb',
    'grZ'
  ], {
    p: '#c:plastics',
    f: 'minecraft:diamond_pickaxe',
    b: '#c:ores/iron',
    m: '#industrialforegoing:machine_frame/advanced',
    g: '#c:gears/diamond',
    r: '#c:dusts/redstone',
    Z: 'immersivepetroleum:bitumen'
  }).id('aoa:gilded_weaves/petrochemical_laser_lens')

  // --- G4 Predictive Simulation Core (nautec -> hostilenetworks) ----------
  // A NauTec aquatic chip drives the hostile-network prediction core, making the oceanic
  // logic substrate load-bearing across chapters. Native grid had two free cells (no loss).
  event.remove({ output: 'hostilenetworks:sim_chamber' })
  event.shaped('hostilenetworks:sim_chamber', [
    'AP ',
    'EOE',
    'LCL'
  ], {
    P: '#c:glass_panes',
    E: 'minecraft:ender_pearl',
    O: '#c:obsidians',
    L: '#c:gems/lapis',
    C: 'minecraft:comparator',
    A: 'nautec:aquatic_chip'
  }).id('aoa:gilded_weaves/predictive_simulation_core')

  // --- G5 Soul-Charged Slaughter Laser (enderio -> industrialforegoingsouls) ---
  // EnderIO grains of infinity ground the soul-slaughter laser's focus (replacing one
  // plastic and one diamond gear) so the dark beam channels without dissipating.
  event.remove({ output: 'industrialforegoingsouls:soul_laser_base' })
  event.shaped('industrialforegoingsouls:soul_laser_base', [
    'ZBA',
    'CDC',
    'GSZ'
  ], {
    A: '#c:plastics',
    B: 'minecraft:sculk_shrieker',
    C: 'minecraft:iron_bars',
    D: '#industrialforegoing:machine_frame/advanced',
    G: '#c:gears/diamond',
    S: 'minecraft:sculk_catalyst',
    Z: 'enderio:grains_of_infinity'
  }).id('aoa:gilded_weaves/soul_charged_slaughter_laser')

  // --- G7 Strain Mutator Manifold (pneumaticcraft -> nautec) --------------
  // A PneumaticCraft vortex tube regulates the strain-mutator's thermal manifold (replacing
  // one dark-prismarine pillar) -- hot/cold cycling stresses the bacterial strains.
  event.remove({ output: 'nautec:mutator' })
  event.shaped('nautec:mutator', [
    'DCD',
    'PBP',
    'VCD'
  ], {
    D: 'nautec:dark_prismarine_pillar',
    C: 'nautec:bacterial_containment_shield',
    P: 'nautec:petri_dish',
    B: 'nautec:eas_bucket',
    V: 'pneumaticcraft:vortex_tube'
  }).id('aoa:gilded_weaves/strain_mutator_manifold')

  // --- G8 Catalytic Reformer Stack (immersivepetroleum -> chemicalscience) ---
  // Immersive Petroleum asphalt lines the catalytic reformer's coking stack (replacing one
  // steel plate), unifying the Gilded petrochem mods (IP + Electrodynamics + ChemSci) into
  // one refinery.
  event.remove({ output: 'chemicalscience:catalytic_reformer' })
  event.shaped('chemicalscience:catalytic_reformer', [
    'ZTP',
    'GMG',
    'PCP'
  ], {
    P: '#c:plates/steel',
    T: 'electrodynamics:titaniumheatcoil',
    G: 'electrodynamics:tanksteel',
    M: 'electrodynamics:pressuregauge',
    C: '#c:circuits/advanced',
    Z: 'immersivepetroleum:asphalt'
  }).id('aoa:gilded_weaves/catalytic_reformer_stack')
  // --- G9 Advanced Workbench Logic Bed (oritech -> extendedcrafting) [2026-06-09] ---
  // The Golden Workshop's advanced table seats an Oritech processing unit where the stock
  // recipe used a black iron slate, so the Gilded crafting cap is wired to the Gilded
  // silicon/electronics lane (gilded_oritech_electronics). Single native route verified
  // (data/extendedcrafting/recipe/advanced_table.json); all other ingredients unchanged
  // and <= gilded_age. Quest 4757011000000002 (g1) teaches the seam.
  event.remove({ output: 'extendedcrafting:advanced_table' })
  event.shaped('extendedcrafting:advanced_table', [
    'BAB',
    'CIC',
    'BPB'
  ], {
    B: 'extendedcrafting:advanced_component',
    A: 'extendedcrafting:advanced_catalyst',
    C: 'extendedcrafting:basic_table',
    I: '#c:storage_blocks/gold',
    P: 'oritech:processing_unit'
  }).id('aoa:gilded_weaves/advanced_workbench_logic_bed')
})
