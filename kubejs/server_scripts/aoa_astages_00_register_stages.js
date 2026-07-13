// AoA KubeJS: aoa_astages_00_register_stages.js
// Registers each AoA stage with AStages via customizeStage() plus a no-op marker
// restriction on minecraft:barrier.
// Barrier is unobtainable in survival, so the restriction is invisible to players.
// This silences the astages-common.toml missing-stage warning ("Enable Warning"
// pre-2.3.x, "Enable Missing Stage Warning" under [Notifications] on 2.3.x) for
// any stage with no real item lock - notably the ren_* milestone flags, which
// are pure progression markers.
// If a future admin task involves real barrier-block restrictions, switch the
// marker item to a different unobtainable id (e.g. minecraft:structure_void).

;(function () {
  if (typeof AStages === 'undefined') return

  // Visible age-transition banners. Proof stages are silent native
  // astages:player rewards and do not need banner text.
  const STAGE_BANNERS = {
    dark_ages: { title: 'Dark Ages', sub: 'Age Unlocked' },
    medieval_times: { title: 'Medieval Times', sub: 'Age Unlocked' },
    the_renaissance: { title: 'The Renaissance', sub: 'Age Unlocked' },
    industrial_revolution: { title: 'Industrial Revolution', sub: 'Age Unlocked' },
    gilded_age: { title: 'Gilded Age', sub: 'Age Unlocked' },
    atomic: { title: 'Atomic', sub: 'Age Unlocked' },
    otherworldly: { title: 'Otherworldly', sub: 'Age Unlocked' },
    ascension: { title: 'Ascension', sub: 'Age Unlocked' },
    aoa_complete: { title: 'Ascension of Ages', sub: 'The climb is complete' }
  }
  const STAGE_ICONS = {
    dark_ages: 'minecraft:campfire',
    medieval_times: 'overgeared:copper_smithing_hammer',
    the_renaissance: 'spectrum:guidebook',
    industrial_revolution: 'modern_industrialization:steel_dust',
    gilded_age: 'bosses_of_mass_destruction:obsidian_heart',
    atomic: 'mekanism:atomic_disassembler',
    otherworldly: 'stellaris:rocket',
    ascension: 'minecraft:nether_star',
    aoa_complete: 'avaritia:infinity_ingot'
  }

  // AStages keeps its stage registry across KubeJS /reload. The startup script
  // initializes these globals once per client launch; this server script only
  // reads them because KubeJS rejects global assignment in server scripts.
  const customized = global.aoaAStagesCustomized
  const markersRegistered = global.aoaAStagesMarkersRegistered
  if (!customized || !markersRegistered) {
    console.error('[AoA AStages] reload guards were not initialized by startup_scripts/aoa_astages_reload_guard.js')
    return
  }

  function registerStage(stage) {
    if (!customized[stage]) {
      try {
        if (typeof AStages.customizeStage === 'function') {
          // Rhino rejects const/let inside functions invoked per-stage
          // ("redeclaration of var") -- use var here.
          var stageObject = AStages.customizeStage(stage)
          customized[stage] = true

          var banner = STAGE_BANNERS[stage]
          if (banner && stageObject && typeof stageObject.titleOnAdd === 'function') {
            var titleComponent = Text.gold(banner.title)
            stageObject.titleOnAdd(function () { return titleComponent })
            if (typeof stageObject.subTitleOnAdd === 'function') {
              var subComponent = Text.gray(banner.sub)
              stageObject.subTitleOnAdd(function () { return subComponent })
            }
          }

          var icon = STAGE_ICONS[stage]
          if (icon && stageObject && typeof stageObject.icon === 'function') {
            stageObject.icon(Item.of(icon))
          }
        }
      } catch (e) {
        console.warn('[AoA AStages] customizeStage failed for ' + stage + ': ' + e)
      }
    }

    if (!markersRegistered[stage]) {
      var id = 'aoa/marker/' + stage
      try {
        AStages.addRestrictionForItem(id, stage, 'minecraft:barrier')
        markersRegistered[stage] = true
      } catch (e) {
        console.warn('[AoA AStages] marker restriction failed for ' + stage + ': ' + e)
      }
    }
  }

  const stages = [
    // Public ages -- already referenced by aoa_astages_01..09; listed here for
    // completeness and to make the registry self-documenting.
    'dark_ages', 'medieval_times', 'the_renaissance',
    'industrial_revolution', 'gilded_age', 'atomic',
    'otherworldly', 'ascension',

    // ---- Renaissance proofs (per AOA_REQUIRED_CHAPTER_MATRIX_2026-05-13.md
    //      and 2026-05-16 11-chapter split addendum) ----
    // Faculty/prologue progression (pre-existing, kept for backward compatibility)
    'ren_matriculated',
    'ren_traditions_partial', 'ren_traditions_complete',
    'ren_worlds_partial', 'ren_worlds_complete',
    'ren_void_studies_unlocked',
    'ren_instruments_partial', 'ren_instruments_complete',
    // Legacy aggregate proof (backward compat; not awarded by the new split chapters)
    'ren_magic_literacy_complete',
    // Required chapter completion proofs (new 11-chapter split, 2026-05-16)
    'ren_magic_foundations_complete',
    'ren_nether_threshold_complete',
    'ren_end_threshold_complete',
    'ren_aether_literacy_complete',
    'ren_starlight_observation_complete',
    'ren_undergarden_descent_complete',
    'ren_deeper_darker_otherside_complete',
    'ren_archive_recordkeeping_complete',
    'ren_observation_experimentation_complete',
    'ren_maledictus_vigil_complete',
    // Renaissance milestone + boss proofs
    'ren_seal_obtained',
    // Retired aggregate dragon proof retained for old player data compatibility.
    'ren_dragon_proof_obtained',
    'ren_maledictus_defeated',

    // ---- Industrial Revolution proofs ----
    'ir_factory_discipline_complete',
    'ir_power_motion_complete',
    'ir_pressure_chemistry_entry_complete',
    'ir_digital_logistics_complete',
    'ir_magic_feedstock_complete',
    'ir_capstone_complete',
    'obsidilith_defeated',
    // Qliphoth Chesed = IR co-required exam proof (boss-ladder BL1, 2026-07-02);
    // fanned into the IR capstone aggregator 4954631000000000 alongside obsidilith.
    'chesed_defeated',

    // ---- Gilded Age proofs ----
    'g_advanced_applied_industry_complete',
    'g_scaled_logistics_computation_complete',
    'g_nautec_oceanic_industry_complete',
    'g_temporal_authorization_complete',
    'void_titan_defeated',
    // Qliphoth Malkuth = Gilded co-required exam proof (boss-ladder BL1, 2026-07-02);
    // fanned into the Gilded capstone aggregator 5057011000000004 alongside void_titan.
    'malkuth_defeated',
    'g_biotech_hazard_readiness_complete',
    'g_atomic_license_complete',
    // Magic Authorization Callbacks (Gilded required domain, 2026-06-02 main authoring).
    // Extends the 6-chapter matrix Gilded model to 7 per the authoring task + CANON Spectrum intent.
    'g_magic_authorization_complete',

    // ---- Atomic proofs ----
    'at_radiological_materials_complete',
    'at_nuclear_engineering_complete',
    'at_reactor_control_complete',
    'at_create_nuclear_mainline_complete',
    'macabre_valamon_defeated',
    'macabre_gomoria_defeated',
    'macabre_gargamaw_defeated',
    'macabre_baal_defeated',
    'macabre_morphegor_defeated',
    'tremorzilla_defeated',
    'at_mff_containment_complete',
    'at_neural_industry_complete',
    'at_ballistix_policy_complete',
    'geburah_defeated',
    'at_capstone_complete',

    // ---- Otherworldly proofs ----
    'ow_launch_offworld_logistics_complete',
    'ow_strange_dimension_operations_complete',
    'ow_beyond_the_veil_theme_complete',
    'ow_interdimensional_infrastructure_complete',
    'ow_draconic_technology_complete',
    'ow_dyson_project_complete',
    'ow_capstone_complete',
    // Optional Otherworldly depth marker retained for compatibility; Leviathan is the required OW -> Ascension boss proof.
    'ender_guardian_defeated',
    // Leviathan is the required Otherworldly -> Ascension boss proof; OW owns the proof, not Ascension's final spine.
    'leviathan_defeated',
    // Macabre 0.9.2 finale (Dead God DLC), promoted above the Atomic prophet spine. Dead God is summoned
    // by the perturbation (5 prophet hearts); Meshuggeneh is the terminal boss reached through Limbo
    // (dead_god_egg -> cracked egg -> Limbo -> Shadows -> tabula_rasa). Both required OW; Meshuggeneh feeds the OW capstone.
    'macabre_dead_god_defeated',
    'macabre_meshuggeneh_defeated',

    // ---- Ascension proofs ----
    'asc_final_crafting_surface_complete',
    'asc_draconic_apex_complete',
    // Chaos Guardian / Draconic Guardian final exam proof, awarded by live FTBQ MQT kill context.
    'draconic_guardian_defeated',
    'asc_avaritia_singularity_pressure_complete',
    'asc_oritech_apex_complete',
    'asc_archive_of_ages_complete',
    'asc_final_boss_convergence_complete',
    'asc_capstone_complete',
    'aoa_complete'
  ]
  stages.forEach(registerStage)
})()
