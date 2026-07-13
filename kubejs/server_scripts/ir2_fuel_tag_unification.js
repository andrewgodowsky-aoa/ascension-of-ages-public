// ============================================================================
//  IR2 Fuel Tag Unification
// ============================================================================
//
//  Purpose: Unify cross-mod fuel fluids and bucket items under common tags
//  so FTBQuests filter-tasks can match any variant with one `#c:...` reference.
//
//  Scope: LEVEL 1 — Quest logic compat only.
//    Adds missing fluids to existing `c:fluids/*` tags (mostly IP fluids
//    that mods register under `neoforge:*` namespace but not `c:*`).
//    Creates `c:buckets/*` item tags from scratch for bucket-submit quests.
//
//  OUT OF SCOPE: LEVEL 2 — Runtime engine compat.
//    This script does NOT force engines to accept cross-mod fuels. If in-game
//    testing shows a CDG Diesel Engine rejects PNC diesel (or similar), the
//    fix goes in a separate script as a recipe override or mod-specific
//    compatibility patch.
//
//  Audit source: docs/rosters/IR2_Fuel_ID_Mapping.md (2026-04-24)
//  Mods covered: Create Diesel Generators, PneumaticCraft, Immersive
//                Petroleum, Immersive Engineering
//
//  IMPORTANT spelling notes (these are NOT typos — mods use different forms):
//    PneumaticCraft crude oil:    pneumaticcraft:oil         (not crude_oil)
//    Immersive Petroleum crude:   immersivepetroleum:crudeoil (no underscore)
//    PneumaticCraft plant oil:    pneumaticcraft:vegetable_oil
//    Immersive Engineering:       immersiveengineering:plantoil (no underscore)
//
//  VERIFY-IN-GAME notes inline below.
// ============================================================================

ServerEvents.tags('fluid', event => {

  // --- Diesel family -------------------------------------------------------
  // c:fluids/diesel already contains CDG + PNC + IP (via IP's own tag file).
  // Add IP's diesel_sulfur explicitly so quests matching "any diesel" also
  // match the sulfurous intermediate the player pulls from IP's distillation.
  event.add('c:fluids/diesel', 'immersivepetroleum:diesel')
  event.add('c:fluids/diesel', 'immersivepetroleum:diesel_sulfur')

  // --- Gasoline family -----------------------------------------------------
  // Extend c:fluids/gasoline with IP's gasoline.
  event.add('c:fluids/gasoline', 'immersivepetroleum:gasoline')

  // --- Crude oil family ----------------------------------------------------
  // Three mods, three spellings. Unify under c:fluids/crude_oil.
  event.add('c:fluids/crude_oil', 'immersivepetroleum:crudeoil')
  // CDG:crude_oil and PNC:oil are already in c:fluids/crude_oil per audit.

  // --- LPG / Petroleum Gas -------------------------------------------------
  // IP calls it petroleum_gas (only in neoforge:petroleum_gas tag).
  // Functionally equivalent to LPG. Add to c:fluids/lpg.
  event.add('c:fluids/lpg', 'immersivepetroleum:petroleum_gas')

  // --- Kerosene family -----------------------------------------------------
  event.add('c:fluids/kerosene', 'immersivepetroleum:kerosene')

  // --- Lubricant family ----------------------------------------------------
  event.add('c:fluids/lubricant', 'immersivepetroleum:lubricant')

  // --- Naphtha (new common tag — IP only) ----------------------------------
  event.add('c:fluids/naphtha', 'immersivepetroleum:naphtha')

  // --- Benzol (new common tag — IP only) -----------------------------------
  event.add('c:fluids/benzol', 'immersivepetroleum:benzol')

  // --- Oritech fluids (oil chain + biofuel + sulfuric_acid) ----------------
  // Oritech uses NON-STANDARD tag convention: `c:<name>` without the
  // `fluids/` prefix (e.g., `#c:oil`, `#c:biofuel` in its recipe JSONs).
  // Populate BOTH the standard `c:fluids/X` tag AND Oritech's `c:X` alias
  // so Oritech recipes read cross-mod fluids AND other mods read Oritech
  // fluids via the standard common tag.
  event.add('c:fluids/crude_oil', 'oritech:still_oil')
  event.add('c:fluids/diesel',    'oritech:still_diesel')
  event.add('c:fluids/naphtha',   'oritech:still_naphtha')
  event.add('c:fluids/biodiesel', 'oritech:still_biofuel')           // Oritech biofuel ≈ biodiesel
  event.add('c:fluids/sulfuric_acid', 'oritech:still_sulfuric_acid') // chemistry tag for later G4

  // Oritech-style non-fluids-prefix tags (what Oritech recipes actually read)
  // c:oil — all crude oils go here so Oritech refinery accepts any mod's crude
  event.add('c:oil', 'createdieselgenerators:crude_oil')
  event.add('c:oil', 'pneumaticcraft:oil')
  event.add('c:oil', 'immersivepetroleum:crudeoil')
  event.add('c:oil', 'oritech:still_oil')
  // c:biofuel — Oritech refinery biodiesel recipe reads this
  event.add('c:biofuel', 'createdieselgenerators:biodiesel')
  event.add('c:biofuel', 'pneumaticcraft:biodiesel')
  event.add('c:biofuel', 'immersiveengineering:biodiesel')
  event.add('c:biofuel', 'oritech:still_biofuel')
  // NOTE: Heavy Oil (oritech:still_heavy_oil) is an Oritech-internal
  // intermediate between crude and diesel. Not cross-mod, no tag needed.
  // Turbofuel (oritech:still_fuel) is late-tier — deferred to Gilded. No tag.

  // --- Tags already fully populated by mod authors (no action needed) ------
  //   c:fluids/ethanol        — CDG + PNC + IE
  //   c:fluids/biodiesel      — CDG + PNC + IE (Oritech added above)
  //   c:fluids/plantoil       — CDG + PNC + IE
  //   c:fluids/creosote       — IE (this chapter's scope; MI's creosote is IR1)
  //   c:fluids/high_power_biodiesel — IE
  //   c:fluids/fuel           — CDG already defines this comprehensively
})

ServerEvents.tags('item', event => {
  // ========================================================================
  //  c:buckets/<fuel> — bucket item tags for FTBQuests filter-tasks
  //  These do NOT exist in any mod. Creating from scratch.
  //  A quest with `item: { id: "#c:buckets/diesel" }` will match ANY
  //  cross-mod diesel bucket.
  // ========================================================================

  // --- Diesel buckets ------------------------------------------------------
  event.add('c:buckets/diesel', 'createdieselgenerators:diesel_bucket')
  event.add('c:buckets/diesel', 'pneumaticcraft:diesel_bucket')
  event.add('c:buckets/diesel', 'immersivepetroleum:diesel_bucket')
  event.add('c:buckets/diesel', 'immersivepetroleum:diesel_sulfur_bucket')
  event.add('c:buckets/diesel', 'oritech:still_diesel_bucket')

  // --- Gasoline buckets ----------------------------------------------------
  event.add('c:buckets/gasoline', 'createdieselgenerators:gasoline_bucket')
  event.add('c:buckets/gasoline', 'pneumaticcraft:gasoline_bucket')
  // VERIFY-IN-GAME: IP's gasoline may be a bottle, not a bucket. If
  // `immersivepetroleum:gasoline_bucket` does not exist, this line is a
  // harmless no-op. If IP uses `immersivepetroleum:gasoline_bottle` or
  // similar, add it here and flag the substitution.
  event.add('c:buckets/gasoline', 'immersivepetroleum:gasoline_bucket')

  // --- Crude oil buckets ---------------------------------------------------
  event.add('c:buckets/crude_oil', 'createdieselgenerators:crude_oil_bucket')
  event.add('c:buckets/crude_oil', 'pneumaticcraft:oil_bucket')
  event.add('c:buckets/crude_oil', 'immersivepetroleum:crudeoil_bucket')
  event.add('c:buckets/crude_oil', 'oritech:still_oil_bucket')

  // --- Ethanol buckets -----------------------------------------------------
  event.add('c:buckets/ethanol', 'createdieselgenerators:ethanol_bucket')
  event.add('c:buckets/ethanol', 'pneumaticcraft:ethanol_bucket')
  event.add('c:buckets/ethanol', 'immersiveengineering:ethanol_bucket')

  // --- Biodiesel buckets (Oritech calls its variant 'biofuel' — same tag) --
  event.add('c:buckets/biodiesel', 'createdieselgenerators:biodiesel_bucket')
  event.add('c:buckets/biodiesel', 'pneumaticcraft:biodiesel_bucket')
  event.add('c:buckets/biodiesel', 'immersiveengineering:biodiesel_bucket')
  event.add('c:buckets/biodiesel', 'oritech:still_biofuel_bucket')

  // --- Plant oil buckets (three different internal names) ------------------
  event.add('c:buckets/plantoil', 'createdieselgenerators:plant_oil_bucket')
  event.add('c:buckets/plantoil', 'pneumaticcraft:vegetable_oil_bucket')
  event.add('c:buckets/plantoil', 'immersiveengineering:plantoil_bucket')

  // --- LPG buckets (includes IP's petroleum_gas) ---------------------------
  event.add('c:buckets/lpg', 'pneumaticcraft:lpg_bucket')
  event.add('c:buckets/lpg', 'immersivepetroleum:petroleum_gas_bucket')

  // --- Kerosene buckets ----------------------------------------------------
  event.add('c:buckets/kerosene', 'pneumaticcraft:kerosene_bucket')
  event.add('c:buckets/kerosene', 'immersivepetroleum:kerosene_bucket')

  // --- Lubricant buckets ---------------------------------------------------
  event.add('c:buckets/lubricant', 'pneumaticcraft:lubricant_bucket')
  event.add('c:buckets/lubricant', 'immersivepetroleum:lubricant_bucket')

  // --- Creosote bucket (IE only in IR2 scope — MI's creosote is IR1) ------
  event.add('c:buckets/creosote', 'immersiveengineering:creosote_bucket')

  // --- High power biodiesel bucket (IE only) -------------------------------
  event.add('c:buckets/high_power_biodiesel', 'immersiveengineering:high_power_biodiesel_bucket')

  // --- Naphtha bucket (IP + Oritech) ---------------------------------------
  event.add('c:buckets/naphtha', 'immersivepetroleum:naphtha_bucket')
  event.add('c:buckets/naphtha', 'oritech:still_naphtha_bucket')

  // --- Benzol bucket (IP only) ---------------------------------------------
  event.add('c:buckets/benzol', 'immersivepetroleum:benzol_bucket')

  // --- Sulfuric acid bucket (Oritech IR byproduct; shared with Gilded G4) --
  event.add('c:buckets/sulfuric_acid', 'oritech:still_sulfuric_acid_bucket')
})
