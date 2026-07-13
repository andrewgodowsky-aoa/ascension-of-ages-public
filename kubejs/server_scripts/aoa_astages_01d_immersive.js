// AoA KubeJS: aoa_astages_01d_immersive.js
// Machine Staging Contract pass (2026-05-28) -- Immersive Engineering + Immersive Petroleum.
//
// Every IE multiblock is hammer-formed and every IE/IP machine is built from IE
// components (heavy/light/rs engineering, coils) that resolve to steel/electrum/
// iron/copper/redstone -> recipe ceiling = IR. So these ungated machines are pure
// BYPASS gaps (IR-craftable, just unenforced); IR placement is softlock-free.
// radio_tower (wireless infra) + auto_lubricator (petrochem-tier kinetic, per the
// oil-spine doc) sit at Gilded.
//
// Held for user placement decision (NOT locked here): IE circuit_table,
// windmill_advanced, lightning_rod, tesla_coil, turret_gun, turret_chem; IP flarestack.
// Also flagged to user (existing locks, NOT moved here): IE refinery/fermenter/
// squeezer/diesel_generator (Gilded vs oil-doc IR). IP hydrotreater/coker_unit -> IR (2026-06-15).

;(function () {
  if (typeof AStages === 'undefined') return
  function applySoftItemPolicy(r) {
    return r.setCanBeStoredInInventory(true).setCanBeStoredInContainers(true).setCanPickedUp(true)
      .setCanBeEquipped(false).setCanBePlaced(false).setCanItemBeLeftClicked(false)
      .setCanItemBeRightClicked(false).setCanInteractWithBlock(false)
      .setHideTooltip(true).setRenderItemName(false).setHideInJEI(true)
  }
  function softItemLock(stage, item, kind) {
    if (typeof Item !== 'undefined' && typeof Item.exists === 'function' && !Item.exists(item)) {
      console.warn('[AoA AStages immersive] Skipped missing item ' + item + ' (stage=' + stage + ')'); return
    }
    var id = 'aoa/item/' + kind + '/' + stage + '/' + item.replace(/[^a-zA-Z0-9_]/g, '_')
    try { applySoftItemPolicy(AStages.addRestrictionForItem(id, stage, item)) }
    catch (e) { console.warn('[AoA AStages immersive] Skipped ' + item + ': ' + e) }
  }
  var itemLocks = [
    // --- Immersive Engineering IR (standalone machines / generators / processing / utility) ---
    ["industrial_revolution", "immersiveengineering:alloy_smelter", "block_item"],
    ["industrial_revolution", "immersiveengineering:bottling_machine", "block_item"],
    ["industrial_revolution", "immersiveengineering:generator", "block_item"],
    ["industrial_revolution", "immersiveengineering:dynamo", "block_item"],
    ["industrial_revolution", "immersiveengineering:thermoelectric_generator", "block_item"],
    ["industrial_revolution", "immersiveengineering:watermill", "block_item"],
    ["industrial_revolution", "immersiveengineering:windmill", "block_item"],
    ["industrial_revolution", "immersiveengineering:charging_station", "block_item"],
    ["industrial_revolution", "immersiveengineering:cloche", "block_item"],
    ["industrial_revolution", "immersiveengineering:item_batcher", "block_item"],
    ["industrial_revolution", "immersiveengineering:sorter", "block_item"],
    ["industrial_revolution", "immersiveengineering:fluid_sorter", "block_item"],
    ["industrial_revolution", "immersiveengineering:fluid_placer", "block_item"],
    ["industrial_revolution", "immersiveengineering:sample_drill", "block_item"],
    ["industrial_revolution", "immersiveengineering:electromagnet", "block_item"],
    ["industrial_revolution", "immersiveengineering:furnace_heater", "block_item"],
    ["industrial_revolution", "immersiveengineering:blastfurnace_preheater", "block_item"],
    ["industrial_revolution", "immersiveengineering:radiator", "block_item"],
    // circuit_table: IE circuit boards are IR-tier analog electronics (all-IR ingredients).
    ["industrial_revolution", "immersiveengineering:circuit_table", "block_item"],
    // --- Immersive Engineering Gilded (wireless infra + advanced HV power + automated defense) ---
    ["gilded_age", "immersiveengineering:radio_tower", "block_item"],
    ["gilded_age", "immersiveengineering:lightning_rod", "block_item"],
    ["gilded_age", "immersiveengineering:tesla_coil", "block_item"],
    ["gilded_age", "immersiveengineering:turret_gun", "block_item"],
    ["gilded_age", "immersiveengineering:turret_chem", "block_item"],
    // --- Immersive Petroleum ---
    ["industrial_revolution", "immersivepetroleum:seismic_survey", "block_item"],
    // flarestack: extraction-site gas burn-off utility; pairs with IR pumpjack/derrick.
    ["industrial_revolution", "immersivepetroleum:flarestack", "block_item"],
    ["gilded_age", "immersivepetroleum:auto_lubricator", "block_item"],
  ]
  itemLocks.forEach(function (e) { softItemLock(e[0], e[1], e[2]) })
})()

