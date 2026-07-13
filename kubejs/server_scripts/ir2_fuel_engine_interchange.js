// ============================================================================
//  IR2 Fuel ENGINE/REFINERY Interchange  (LEVEL 2 — runtime compat)
// ============================================================================
//
//  Goal (user 2026-06-05): "the oil mods should be used interchangeably with
//  one owner." Build ONE petroleum spine — any mod's crude feeds any mod's
//  refinery; any mod's diesel/fuel burns in any mod's engine. Owner of the
//  crude = Immersive Petroleum (deepest extraction + canonical fractions).
//
//  This is the LEVEL 2 work that ir2_fuel_tag_unification.js explicitly left
//  out of scope. It writes to the LIVE, machine-read tags.
//
//  ── CRITICAL FINDING (verified 2026-06-05) ──────────────────────────────
//  Every petroleum machine in the pack reads the SINGULAR common tags
//  (`c:diesel`, `c:crude_oil`, ...). There are ZERO references anywhere to the
//  PLURAL `c:fluids/diesel` form that ir2_fuel_tag_unification.js lines 38-77
//  populate — so those Level-1 fluid lines are DEAD (read by nothing). The
//  live fix is to add the missing members to the SINGULAR tags, which is what
//  this file does. (ir2's `c:buckets/*` item tags and its `c:oil`/`c:biofuel`
//  adds ARE live and are left untouched.)
//
//  Native singular-tag membership today (verified from jar tag files):
//    c:crude_oil  = chemicalscience, createdieselgenerators, modern_industrialization, pneumaticcraft
//                   -> MISSING immersivepetroleum (it lives only in neoforge:crude_oil)
//    c:diesel     = chemicalscience, createdieselgenerators, modern_industrialization, oritech, pneumaticcraft
//                   -> MISSING immersivepetroleum
//  So today the OWNER's crude is rejected by every other refinery, and IP's own
//  distillation (reads neoforge:crude_oil) rejects everyone else. This file
//  closes both directions. No fluid/fuel-tag is AStages-locked (gating stays on
//  the machines), so widening these tags cannot bypass progression.
//
//  Consumers that light up automatically once the tags are populated (verified
//  additive, tag-fed): IE diesel_generator (generator_fuel reads c:diesel @322),
//  PneumaticCraft fuel_quality (reads c:diesel/gasoline/kerosene/lpg/biodiesel),
//  CDG diesel engines (fuel_type reads #c:diesel/#c:gasoline/#c:biodiesel),
//  PneumaticCraft refinery + CDG distillation + ChemSci fractionating_column
//  (read c:crude_oil), Oritech refinery (reads #c:oil — handled by ir2).
// ============================================================================

ServerEvents.tags('fluid', event => {
  // ---- CRUDE OIL: one barrel, every refinery -------------------------------
  // Bring the OWNER (and Oritech) into the c: spine so CDG / PneumaticCraft /
  // ChemicalScience / (MI-native) refineries accept Immersive Petroleum crude.
  event.add('c:crude_oil', 'immersivepetroleum:crudeoil')
  event.add('c:crude_oil', 'oritech:still_oil')
  // Reverse direction: widen IP's own input tag so the IP Distillation Tower &
  // Hydrotreater (which read neoforge:crude_oil) accept every mod's crude.
  event.add('neoforge:crude_oil', 'createdieselgenerators:crude_oil')
  event.add('neoforge:crude_oil', 'pneumaticcraft:oil')
  event.add('neoforge:crude_oil', 'modern_industrialization:crude_oil')
  event.add('neoforge:crude_oil', 'chemicalscience:crudeoil')
  event.add('neoforge:crude_oil', 'oritech:still_oil')

  // ---- DIESEL: one fuel, every engine --------------------------------------
  // Add IP diesel (+ its sulfurous distillation intermediate) to c:diesel so
  // the IE generator / PNC fuel_quality / CDG engines all burn IP diesel.
  event.add('c:diesel', 'immersivepetroleum:diesel')
  event.add('c:diesel', 'immersivepetroleum:diesel_sulfur')
  // Reverse: widen IP's neoforge:diesel so the IP Gas Generator burns shared diesel.
  event.add('neoforge:diesel', 'createdieselgenerators:diesel')
  event.add('neoforge:diesel', 'pneumaticcraft:diesel')
  event.add('neoforge:diesel', 'modern_industrialization:diesel')
  event.add('neoforge:diesel', 'chemicalscience:diesel')
  event.add('neoforge:diesel', 'oritech:still_diesel')

  // ---- GASOLINE / KEROSENE / LPG / NAPHTHA / LUBRICANT ----------------------
  // Add the OWNER's fractions into the common tags so CDG/PNC consumers accept
  // them. (Kept fuel-type-faithful: we do NOT force gasoline into diesel-only
  // engines — only unify each fuel's cross-mod variants.)
  event.add('c:gasoline', 'immersivepetroleum:gasoline')
  event.add('c:kerosene', 'immersivepetroleum:kerosene')
  event.add('neoforge:kerosene', 'pneumaticcraft:kerosene') // IP gas-gen / kerosene users accept PNC kerosene
  event.add('c:lpg', 'immersivepetroleum:petroleum_gas')    // IP petroleum_gas == LPG-equivalent
  event.add('c:lpg', 'chemicalscience:lpg')
  event.add('c:naphtha', 'immersivepetroleum:naphtha')
  event.add('c:lubricant', 'immersivepetroleum:lubricant')
  event.add('neoforge:lubricant', 'pneumaticcraft:lubricant')        // IP auto-lubricator accepts PNC lubricant
  event.add('neoforge:lubricant', 'modern_industrialization:lubricant')
  event.add('neoforge:lubricant', 'chemicalscience:lubricant')
})
