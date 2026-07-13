// AoA KubeJS: aoa_oil_single_source.js
// SINGLE OIL SOURCE: crude oil is extracted ONLY by pumpjacks/rigs. The two pumpjack
// mods are fused into one progression (you BEGIN with Create Diesel Generators' kinetic
// pumpjack, then UPGRADE to Immersive Petroleum's reservoir derrick), and every other
// mod's oil "spawning" is removed or converted to consume the shared crude.
//
// Owner / entry: createdieselgenerators (kinetic pumpjack, oil-chunk scanner) -> the
// accessible IR start. Upgrade tier: immersivepetroleum (FE pumpjack/derrick, reservoirs)
// gated behind CDG (see the seismic_survey weave below). Both feed the shared c:crude_oil
// tag (see ir2_fuel_engine_interchange.js), and IP owns the deep refining.
//
// Lockdown (verified 2026-06-05, nothing removed here is a quest task):
//   * ChemicalScience oil-ore worldgen .... cancelled in aoa_remove_passive_oil.json (biome modifier)
//   * ChemicalScience crude-from-ore ....... removed below (2 Electrodynamics recipes)
//   * Oritech oil-spring worldgen .......... cancelled in the biome modifier; still_oil now
//                                            from owner crude (conversion below)
//   * Modern Industrialization rig ......... was a from-NOTHING crude producer; converted to
//                                            a crude PROCESSOR (consumes owner crude) below
//   * PneumaticCraft oil lakes ............. already off (its config blacklists overworld/nether/end)
//   * Stellaris moon oil lakes ............. left as-is (Otherworldly-age dimension, not an IR bypass)

ServerEvents.recipes(event => {

  // --- ChemicalScience: no crude from its oil ore ---------------------------
  // The oil ore no longer generates (biome modifier); also remove the two recipes that
  // wash/mix c:ores/oil into chemicalscience:crudeoil. ChemSci refineries still run off
  // the shared c:crude_oil tag, so the mod stays fully usable on owner crude.
  event.remove({ id: 'chemicalscience:fluiditem2fluid/chemical_mixer/crudeoil' })
  event.remove({ id: 'chemicalscience:fluiditem2fluid/mineral_washer/crudeoil' })

  // --- Modern Industrialization: rig PRODUCER -> distillery INTAKE -----------
  // Native rig made 500 mB crude from an aluminum_drill + EU (oil from nothing). Remove it
  // and route owner crude through MI's fluid-capable distillery to output MI's crude form.
  // The oil_drilling_rig recipe type rejects fluid inputs at datapack parse time, so the
  // distillery is the smallest valid MI-side bridge that keeps the rig from spawning oil.
  event.remove({ id: 'modern_industrialization:oil/crude_oil' })
  event.custom({
    type: 'modern_industrialization:distillery',
    eu: 8,
    duration: 200,
    fluid_inputs: [
      { fluid: 'immersivepetroleum:crudeoil', amount: 500 }
    ],
    fluid_outputs: [
      { fluid: 'modern_industrialization:crude_oil', amount: 500 }
    ]
  }).id('aoa:oil_single_source/mi_distills_owner_crude')

  // --- Oritech: still_oil from owner crude (spring removed) ------------------
  // oritech:still_oil only ever came from the oil_spring (now cancelled) and feeds two
  // recipes (liquid_fuel, turbofuel). Add a conversion so they keep working off owner crude.
  event.custom({
    type: 'oritech:refinery',
    fluidInput: { amount: 100, fluid: 'immersivepetroleum:crudeoil' },
    fluidOutputs: [ { amount: 100, fluid: 'oritech:still_oil' } ],
    ingredients: [ { item: 'oritech:clay_catalyst_beads' } ],
    results: [],
    time: 80
  }).id('aoa:oil_single_source/owner_crude_to_oritech_still_oil')

  // --- THE FUSION: IP Seismic Survey now requires the CDG Oil Scanner --------
  // You can't reach the Immersive Petroleum reservoir tier without first building Create
  // Diesel Generators' Oil Scanner -- IP's survey rig is literally an upgrade of the CDG
  // scanner. One-way link (CDG entry stays accessible). Native recipe verbatim, one
  // steel-scaffolding cell swapped for the scanner.
  event.remove({ output: 'immersivepetroleum:seismic_survey' })
  event.shaped('immersivepetroleum:seismic_survey', [
    'SBH',
    'SBO',
    'MLM'
  ], {
    S: 'immersiveengineering:steel_scaffolding_standard',
    B: 'immersiveengineering:gunpart_barrel',
    H: 'immersiveengineering:gunpart_hammer',
    O: 'createdieselgenerators:oil_scanner',
    M: 'immersiveengineering:component_iron',
    L: 'immersiveengineering:light_engineering'
  }).id('aoa:oil_single_source/seismic_survey_from_cdg_scanner')

})
