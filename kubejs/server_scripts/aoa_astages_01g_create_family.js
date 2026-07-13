// AoA KubeJS: aoa_astages_01g_create_family.js
// Machine Staging Contract pass (2026-05-28) -- Create family.
//
// Base Create processing layer split (user 2026-05-28): pure-andesite kinetic
// machines -> Medieval; brass/precision + factory-logistics + displays -> Renaissance
// (Renaissance already owns steam_engine + trains). Addons:
//   createaddition (SU<->FE electric)    -> IR
//   create_new_age electric tier (incl. reinforced/netherite/advanced-solar) -> IR
//   create_new_age nuclear reactor chain -> Atomic (was FULLY UNGATED)
//   createdieselgenerators oil parts     -> IR
//   createoreexcavation sample_drill     -> IR
//   railways train infrastructure        -> Renaissance
// Decor/cosmetic/bulk-component (cogwheels/shafts/casings/copycats/framed) and
// create_sa power-gear (wearables, different axis) left ungated.

;(function () {
  if (typeof AStages === 'undefined') return
  // Ore blocks are disguised as plain stone in-world; AStages' RightClickBlock
  // hook tests the TARGET block against BLOCK_INTERACTIONS, so locking interaction
  // on a hidden ore broke placing a torch/block against it. Allow interaction for
  // ore-like ids only; machines stay guarded. (Omitted arg => stays locked.)
  function aoaOreLikeId(id) {
    return /_ore$|:ore[a-z_]|deepslateore|rawore/.test(id)
  }
  function applySoftItemPolicy(r, allowBlockInteraction) {
    return r.setCanBeStoredInInventory(true).setCanBeStoredInContainers(true).setCanPickedUp(true)
      .setCanBeEquipped(false).setCanBePlaced(false).setCanItemBeLeftClicked(false)
      .setCanItemBeRightClicked(false).setCanInteractWithBlock(allowBlockInteraction === true)
      .setHideTooltip(true).setRenderItemName(false).setHideInJEI(true)
  }
  function softItemLock(stage, item, kind) {
    if (typeof Item !== 'undefined' && typeof Item.exists === 'function' && !Item.exists(item)) {
      console.warn('[AoA AStages create] Skipped missing item ' + item + ' (stage=' + stage + ')'); return
    }
    var id = 'aoa/item/' + kind + '/' + stage + '/' + item.replace(/[^a-zA-Z0-9_]/g, '_')
    try { applySoftItemPolicy(AStages.addRestrictionForItem(id, stage, item), aoaOreLikeId(item)) }
    catch (e) { console.warn('[AoA AStages create] Skipped ' + item + ': ' + e) }
  }
  var itemLocks = [
    // === base create: pure-andesite kinetic machines -> Medieval (user split) ===
    ["medieval_times", "create:mechanical_mixer", "block_item"],
    ["medieval_times", "create:encased_fan", "block_item"],
    ["medieval_times", "create:mechanical_bearing", "block_item"],
    ["medieval_times", "create:windmill_bearing", "block_item"],
    ["medieval_times", "create:gantry_carriage", "block_item"],
    ["medieval_times", "create:mechanical_piston", "block_item"],
    ["medieval_times", "create:sticky_mechanical_piston", "block_item"],
    ["medieval_times", "create:hose_pulley", "block_item"],
    ["medieval_times", "create:cart_assembler", "block_item"],
    ["medieval_times", "create:chain_conveyor", "block_item"],
    // === base create: brass/precision + factory-logistics + displays -> Renaissance (user split) ===
    ["medieval_times", "create:rotation_speed_controller", "block_item"],
    ["medieval_times", "create:clockwork_bearing", "block_item"],
    ["medieval_times", "create:flywheel", "block_item"],
    ["the_renaissance", "create:elevator_pulley", "block_item"],
    ["the_renaissance", "create:mechanical_roller", "block_item"],
    ["the_renaissance", "create:display_board", "block_item"],
    ["the_renaissance", "create:display_link", "block_item"],
    ["the_renaissance", "create:packager", "block_item"],
    ["the_renaissance", "create:repackager", "block_item"],
    ["the_renaissance", "create:stock_link", "block_item"],
    ["the_renaissance", "create:stock_ticker", "block_item"],
    ["the_renaissance", "create:redstone_requester", "block_item"],
    ["the_renaissance", "create:factory_gauge", "block_item"],
    ["the_renaissance", "create:package_frogport", "block_item"],
    // === create_new_age higher-electric tier -> IR (unified with the ladder, user call) ===
    ["industrial_revolution", "create_new_age:reinforced_motor", "block_item"],
    ["industrial_revolution", "create_new_age:reinforced_energiser", "block_item"],
    ["industrial_revolution", "create_new_age:netherite_magnet", "block_item"],
    ["industrial_revolution", "create_new_age:advanced_solar_heating_plate", "block_item"],
    // === createaddition IR (SU<->FE electric; siblings of IR-locked alternator) ===
    ["industrial_revolution", "createaddition:electric_motor", "block_item"],
    ["industrial_revolution", "createaddition:modular_accumulator", "block_item"],
    ["industrial_revolution", "createaddition:tesla_coil", "block_item"],
    ["industrial_revolution", "createaddition:portable_energy_interface", "block_item"],
    ["industrial_revolution", "createaddition:digital_adapter", "block_item"],
    ["industrial_revolution", "createaddition:redstone_relay", "block_item"],
    ["industrial_revolution", "createaddition:connector", "block_item"],
    ["industrial_revolution", "createaddition:large_connector", "block_item"],
    ["industrial_revolution", "createaddition:small_light_connector", "block_item"],
    // === create_new_age IR electric tier (siblings of IR-locked basic_energiser) ===
    ["industrial_revolution", "create_new_age:basic_motor", "block_item"],
    ["industrial_revolution", "create_new_age:basic_motor_extension", "block_item"],
    ["industrial_revolution", "create_new_age:advanced_motor", "block_item"],
    ["industrial_revolution", "create_new_age:advanced_motor_extension", "block_item"],
    ["industrial_revolution", "create_new_age:advanced_energiser", "block_item"],
    ["industrial_revolution", "create_new_age:generator_coil", "block_item"],
    ["industrial_revolution", "create_new_age:carbon_brushes", "block_item"],
    ["industrial_revolution", "create_new_age:heat_pipe", "block_item"],
    ["industrial_revolution", "create_new_age:heater", "block_item"],
    ["industrial_revolution", "create_new_age:redstone_magnet", "block_item"],
    ["industrial_revolution", "create_new_age:layered_magnet", "block_item"],
    ["industrial_revolution", "create_new_age:basic_solar_heating_plate", "block_item"],
    ["industrial_revolution", "create_new_age:electrical_connector", "block_item"],
    // (HELD pending placement Q: reinforced_motor, reinforced_energiser, netherite_magnet, advanced_solar_heating_plate -- IR vs Gilded)
    // === create_new_age ATOMIC nuclear subsystem (thorium reactor chain was fully ungated) ===
    ["atomic", "create_new_age:reactor_casing", "block_item"],
    ["atomic", "create_new_age:reactor_fuel_acceptor", "block_item"],
    ["atomic", "create_new_age:reactor_rod", "block_item"],
    ["atomic", "create_new_age:reactor_heat_vent", "block_item"],
    ["atomic", "create_new_age:reactor_glass", "block_item"],
    ["atomic", "create_new_age:heat_pump", "block_item"],
    ["atomic", "create_new_age:thorium_ore", "block_item"],
    ["atomic", "create_new_age:thorium", "item"],
    ["atomic", "create_new_age:radioactive_thorium", "item"],
    ["atomic", "create_new_age:nuclear_fuel", "item"],
    // === createdieselgenerators IR (oil/pumpjack multiblock parts; oil tier is IR) ===
    ["industrial_revolution", "createdieselgenerators:pumpjack_bearing", "block_item"],
    ["industrial_revolution", "createdieselgenerators:pumpjack_bearing_b", "block_item"],
    ["industrial_revolution", "createdieselgenerators:pumpjack_head", "block_item"],
    ["industrial_revolution", "createdieselgenerators:pumpjack_hole", "block_item"],
    ["industrial_revolution", "createdieselgenerators:powered_engine_shaft", "block_item"],
    ["industrial_revolution", "createdieselgenerators:burner", "block_item"],
    ["industrial_revolution", "createdieselgenerators:chemical_turret", "block_item"],
    ["industrial_revolution", "createdieselgenerators:oil_barrel", "block_item"],
    ["industrial_revolution", "createdieselgenerators:canister", "block_item"],
    // === createoreexcavation IR (3rd drill-multiblock surface) ===
    ["industrial_revolution", "createoreexcavation:sample_drill", "block_item"],
    // === railways (Steam'n'Rails) Renaissance train infrastructure ===
    ["the_renaissance", "railways:semaphore", "block_item"],
    ["the_renaissance", "railways:handcar", "block_item"],
    ["the_renaissance", "railways:link_and_pin", "block_item"],
    ["the_renaissance", "railways:portable_fuel_interface", "block_item"],
    // === create_aquatic_ambitions -> Gilded (Create ocean-tech addon; matches g6 quest placement) ===
    // Keystone material + rod + Conduit Cage. Channeling outputs (spiky_shell/nautilus_shard)
    // come only from the awakened Cage, so gating these three holds the whole addon to Gilded.
    ["gilded_age", "create_aquatic_ambitions:prismarine_alloy", "item"],
    ["gilded_age", "create_aquatic_ambitions:prismarine_alloy_rod", "item"],
    ["gilded_age", "create_aquatic_ambitions:prismarine_alloy_block", "block_item"],
    ["gilded_age", "create_aquatic_ambitions:mechanical_conduit", "block_item"],
  ]
  itemLocks.forEach(function (e) { softItemLock(e[0], e[1], e[2]) })
})()
