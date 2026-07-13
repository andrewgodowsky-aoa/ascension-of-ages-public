// AoA KubeJS: aoa_astages_01m_magic.js
// Machine Staging Contract pass (2026-05-28) -- magic cluster apparatus
// (forbidden_arcanus, theurgy, occultism, spectrum, malum, actuallyadditions, psi).
//
// Magic apparatus lives at the_renaissance (magic literacy age) with the existing
// magic locks (calcination_oven, spirit_altar, spectrum pedestal/nodes, AA iron_casing/
// basic_coil). occultism is tiered by its summoning books: foliot apparatus -> Renaissance,
// djinni automation -> IR, marid -> OW. psi programmer joins cad_assembler at IR.
// F&A Hephaestus Forge is one block (T1 entry = Renaissance); its T2-T5 are reagent-gated
// ritual upgrades (handled by the existing reagent economy, not item locks here).
// mahoutsukai = spell-circle/conduit flavor, no craftable processing apparatus -> nothing to gate.
// All ages >= recipe ceiling -> no softlock. Ritual reagents/curios/decor left ungated.

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
      console.warn('[AoA AStages magic] Skipped missing item ' + item + ' (stage=' + stage + ')'); return
    }
    var id = 'aoa/item/' + kind + '/' + stage + '/' + item.replace(/[^a-zA-Z0-9_]/g, '_')
    try { applySoftItemPolicy(AStages.addRestrictionForItem(id, stage, item)) }
    catch (e) { console.warn('[AoA AStages magic] Skipped ' + item + ': ' + e) }
  }
  var itemLocks = [
    ["the_renaissance", "forbidden_arcanus:hephaestus_forge_tier_1", "block_item"],
    ["industrial_revolution", "forbidden_arcanus:hephaestus_forge_tier_2", "block_item"],
    ["gilded_age", "forbidden_arcanus:hephaestus_forge_tier_3", "block_item"],
    ["the_renaissance", "forbidden_arcanus:hephaestus_forge_tier_4", "block_item"],
    ["the_renaissance", "forbidden_arcanus:hephaestus_forge_tier_5", "block_item"],
    ["the_renaissance", "forbidden_arcanus:clibano_core", "block_item"],
    ["the_renaissance", "theurgy:pyromantic_brazier", "block_item"],
    ["the_renaissance", "theurgy:liquefaction_cauldron", "block_item"],
    ["the_renaissance", "theurgy:distiller", "block_item"],
    ["the_renaissance", "theurgy:fermentation_vat", "block_item"],
    ["the_renaissance", "theurgy:incubator", "block_item"],
    ["the_renaissance", "theurgy:incubator_mercury_vessel", "block_item"],
    ["the_renaissance", "theurgy:incubator_salt_vessel", "block_item"],
    ["industrial_revolution", "theurgy:incubator_sulfur_vessel", "block_item"],
    ["industrial_revolution", "theurgy:caloric_flux_emitter", "block_item"],
    ["industrial_revolution", "theurgy:sulfuric_flux_emitter", "block_item"],
    ["the_renaissance", "theurgy:sal_ammoniac_accumulator", "block_item"],
    ["the_renaissance", "theurgy:sal_ammoniac_tank", "block_item"],
    ["the_renaissance", "theurgy:reformation_source_pedestal", "block_item"],
    ["the_renaissance", "theurgy:reformation_target_pedestal", "block_item"],
    ["industrial_revolution", "theurgy:reformation_result_pedestal", "block_item"],
    ["the_renaissance", "theurgy:logistics_connector_node", "block_item"],
    ["the_renaissance", "theurgy:logistics_item_extractor", "block_item"],
    ["the_renaissance", "theurgy:logistics_item_inserter", "block_item"],
    ["the_renaissance", "theurgy:logistics_fluid_extractor", "block_item"],
    ["the_renaissance", "theurgy:logistics_fluid_inserter", "block_item"],
    ["the_renaissance", "occultism:storage_controller_base", "block_item"],
    ["industrial_revolution", "occultism:stable_wormhole", "block_item"],
    ["industrial_revolution", "occultism:dimensional_mineshaft", "block_item"],
    ["industrial_revolution", "occultism:dimensional_extractor", "block_item"],
    ["industrial_revolution", "occultism:spirit_grindstone", "block_item"],
    ["industrial_revolution", "occultism:storage_controller", "block_item"],
    ["otherworldly", "occultism:iesnium_anvil", "block_item"],
    ["the_renaissance", "spectrum:titration_barrel", "block_item"],
    ["the_renaissance", "spectrum:particle_spawner", "block_item"],
    ["the_renaissance", "spectrum:color_picker", "block_item"],
    ["industrial_revolution", "spectrum:enchanter", "block_item"],
    ["the_renaissance", "spectrum:spirit_instiller", "block_item"],
    ["industrial_revolution", "spectrum:cinderhearth", "block_item"],
    ["industrial_revolution", "spectrum:crystal_apothecary", "block_item"],
    ["industrial_revolution", "spectrum:crystallarieum", "block_item"],
    ["industrial_revolution", "spectrum:fusion_shrine_basalt", "block_item"],
    ["the_renaissance", "spectrum:fusion_shrine_calcite", "block_item"],
    ["industrial_revolution", "malum:spirit_crucible", "block_item"],
    ["industrial_revolution", "malum:spirit_catalyzer", "block_item"],
    ["gilded_age", "actuallyadditions:advanced_coil", "item"],
    ["gilded_age", "actuallyadditions:atomic_reconstructor", "block_item"],
    ["gilded_age", "actuallyadditions:empowerer", "block_item"],
    ["gilded_age", "actuallyadditions:energizer", "block_item"],
    ["gilded_age", "actuallyadditions:enervator", "block_item"],
    ["gilded_age", "actuallyadditions:crusher", "block_item"],
    ["gilded_age", "actuallyadditions:crusher_double", "block_item"],
    ["gilded_age", "actuallyadditions:powered_furnace", "block_item"],
    ["gilded_age", "actuallyadditions:coal_generator", "block_item"],
    ["gilded_age", "actuallyadditions:oil_generator", "block_item"],
    ["gilded_age", "actuallyadditions:bio_reactor", "block_item"],
    ["gilded_age", "actuallyadditions:leaf_generator", "block_item"],
    ["gilded_age", "actuallyadditions:heat_collector", "block_item"],
    ["gilded_age", "actuallyadditions:lava_factory_controller", "block_item"],
    ["gilded_age", "actuallyadditions:canola_press", "block_item"],
    ["gilded_age", "actuallyadditions:fermenting_barrel", "block_item"],
    ["gilded_age", "actuallyadditions:battery_box", "block_item"],
    ["gilded_age", "actuallyadditions:laser_relay", "block_item"],
    ["gilded_age", "actuallyadditions:laser_relay_advanced", "block_item"],
    ["gilded_age", "actuallyadditions:laser_relay_extreme", "block_item"],
    ["gilded_age", "actuallyadditions:breaker", "block_item"],
    ["gilded_age", "actuallyadditions:placer", "block_item"],
    ["gilded_age", "actuallyadditions:farmer", "block_item"],
    ["gilded_age", "actuallyadditions:vertical_digger", "block_item"],
    ["gilded_age", "actuallyadditions:long_range_breaker", "block_item"],
    ["gilded_age", "actuallyadditions:ranged_collector", "block_item"],
    ["gilded_age", "actuallyadditions:fluid_collector", "block_item"],
    ["gilded_age", "actuallyadditions:item_interface", "block_item"],
    ["gilded_age", "actuallyadditions:hopping_item_interface", "block_item"],
    ["gilded_age", "actuallyadditions:phantom_breaker", "block_item"],
    ["gilded_age", "actuallyadditions:phantom_placer", "block_item"],
    ["gilded_age", "actuallyadditions:phantom_itemface", "block_item"],
    ["gilded_age", "actuallyadditions:phantom_liquiface", "block_item"],
    ["gilded_age", "actuallyadditions:phantom_energyface", "block_item"],
    ["industrial_revolution", "psi:programmer", "block_item"],
    // --- Neo Vitae magic spine (2026-06-26) ---
    // Renaissance entry: altar economy
    ["the_renaissance", "neovitae:ara_vitae", "block_item"],
    ["the_renaissance", "neovitae:incense_altar", "block_item"],
    ["the_renaissance", "neovitae:alchemy_array", "block_item"],
    ["the_renaissance", "neovitae:athanor", "block_item"],
    ["the_renaissance", "neovitae:tabula_vitae", "block_item"],
    ["the_renaissance", "neovitae:blood_orb_weak", "item"],
    ["the_renaissance", "neovitae:blood_orb_apprentice", "item"],
    ["the_renaissance", "neovitae:weak_blood_shard", "item"],
    ["the_renaissance", "neovitae:blood_pearl", "item"],
    ["the_renaissance", "neovitae:bloodstone", "block_item"],
    ["the_renaissance", "neovitae:bloodstone_brick", "block_item"],
    ["the_renaissance", "neovitae:blood_stained_glass", "block_item"],
    ["the_renaissance", "neovitae:blood_tank", "block_item"],
    ["the_renaissance", "neovitae:blood_battery", "block_item"],
    // Industrial: forge + spiritus + routing
    ["industrial_revolution", "neovitae:hellfire_forge", "block_item"],
    ["industrial_revolution", "neovitae:vas_maleficum", "block_item"],
    ["industrial_revolution", "neovitae:spira_infernalis", "block_item"],
    ["industrial_revolution", "neovitae:crystallarium_maleficum", "block_item"],
    ["industrial_revolution", "neovitae:spirit_cache", "block_item"],
    ["industrial_revolution", "neovitae:spiritus_gem_petty", "item"],
    ["industrial_revolution", "neovitae:spiritus_gem_lesser", "item"],
    ["industrial_revolution", "neovitae:spiritus_gem_common", "item"],
    ["industrial_revolution", "neovitae:teleposer", "block_item"],
    ["industrial_revolution", "neovitae:tabula_robur", "item"],
    ["industrial_revolution", "neovitae:tabula_animata", "item"],
    ["industrial_revolution", "neovitae:tabula_spiritus", "item"],
    // Gilded: high orbs, Sentient gear
    ["gilded_age", "neovitae:blood_orb_magician", "item"],
    ["gilded_age", "neovitae:blood_orb_master", "item"],
    ["gilded_age", "neovitae:blood_orb_archmage", "item"],
    // Industrial: Hellforged chain (dungeon-sourced at IR, supports Sentient later)
    ["industrial_revolution", "neovitae:ingot_hellforged", "item"],
    ["industrial_revolution", "neovitae:hellforged_dust", "item"],
    ["industrial_revolution", "neovitae:hellforged_parts", "item"],
    ["industrial_revolution", "neovitae:hellforged_resonator", "item"],
    ["industrial_revolution", "neovitae:hellforged_block", "block_item"],
    ["industrial_revolution", "neovitae:demonite_trim_ingot", "item"],
    ["gilded_age", "neovitae:spiritus_gem_greater", "item"],
    ["gilded_age", "neovitae:spiritus_gem_grand", "item"],
    // Sentient armor down-tiered Gilded -> IR (2026-07-02, J_neovitae_curve fix):
    // jar makes sentient armor from a Common gem + iron armor on an Alchemy Array,
    // all reachable once the IR-locked Hellfire Forge is built. These are required
    // IR-chapter nodes (ir_magic_feedstock 49540B100000001B-1E) that the player
    // physically could not complete at IR under the old Gilded lock.
    ["industrial_revolution", "neovitae:sentient_helmet", "item"],
    ["industrial_revolution", "neovitae:sentient_plate", "item"],
    ["industrial_revolution", "neovitae:sentient_leggings", "item"],
    ["industrial_revolution", "neovitae:sentient_boots", "item"],
    // Sentient tools stay Gilded: only OW6 (optional depth) quests them; no IR node does.
    ["gilded_age", "neovitae:sentient_sword", "item"],
    ["gilded_age", "neovitae:sentient_pickaxe", "item"],
    ["gilded_age", "neovitae:sentient_axe", "item"],
    // Atomic: apex orb + explosives + deep reagents
    ["atomic", "neovitae:blood_orb_transcendent", "item"],
    ["atomic", "neovitae:hellforged_explosive_cell", "item"],
    ["atomic", "neovitae:crystal_cluster", "block_item"],
    ["atomic", "neovitae:crystal_cluster_brick", "block_item"],
  ]
  itemLocks.forEach(function (e) { softItemLock(e[0], e[1], e[2]) })
})()

