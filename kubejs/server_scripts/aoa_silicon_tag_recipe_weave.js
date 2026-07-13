// AoA KubeJS: aoa_silicon_tag_recipe_weave.js
// Documents the empty c:silicon policy and its recipe consumers.
//
// Pack policy: ato_material_conflict_cleanup.js strips every mod silicon from
// c:silicon so AE2, RS, Ender IO, and Oritech lanes stay non-interchangeable.
// Recipe overrides live under kubejs/data/*/recipe/ and repoint each consumer
// to its mod-native silicon item instead of the shared tag.
//
// Covered consumers (verified from live jars, 2026-07-07):
//   ae2:inscriber/silicon_print -> ae2:silicon
//   mekmm:compat/ae2/stamper/printed_silicon -> ae2:silicon
//   modern_industrialization:compat/ae2/printed_silicon -> ae2:silicon
//   extendedae:silicon_block -> ae2:silicon
//   refinedstorage raw processors, storage parts, controller -> refinedstorage:silicon
//   refinedstorage_mekanism_integration:64b_chemical_storage_part -> refinedstorage:silicon
//   enderio crafter, PV composite, sag milling, slicing -> enderio:silicon
//   industrialforegoing:crusher/sand -> ae2:silicon
//   oritech and oritechthings silicon consumers -> oritech:silicon

ServerEvents.recipes(function (event) {
  // Datapack overrides in kubejs/data handle the actual recipe JSON.
  // This hook exists so future c:silicon consumers can be audited in one place.
  if (typeof console !== 'undefined' && console.info) {
    console.info('[AoA silicon weave] c:silicon recipe overrides loaded from kubejs/data')
  }
})
