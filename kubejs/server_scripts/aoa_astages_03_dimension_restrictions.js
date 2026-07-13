;(function () {
  if (typeof AStages === 'undefined') return

  const dimensionLocks = [
    ["the_renaissance", "minecraft:the_nether"],
    ["the_renaissance", "minecraft:the_end"],
    ["the_renaissance", "deeperdarker:otherside"],
    ["the_renaissance", "eternal_starlight:starlight"],
    ["the_renaissance", "aether:the_aether"],
    ["the_renaissance", "undergarden:undergarden"],
    ["gilded_age", "astral_dimension:astral_dimension"],
    ["gilded_age", "astral_dimension:setback"],
    ["atomic", "spectrum:deeper_down"],
    ["otherworldly", "stellaris:earth_orbit"],
    ["otherworldly", "stellaris:moon"],
    ["otherworldly", "stellaris:mars"],
    ["otherworldly", "stellaris:mars_orbit"],
    ["otherworldly", "stellaris:venus"],
    ["otherworldly", "stellaris:venus_orbit"],
    ["otherworldly", "stellaris:mercury"],
    ["otherworldly", "stellaris:mercury_orbit"],
    ["otherworldly", "stellaris:jupiter"],
    ["otherworldly", "the_afterdark:afterdark"],
    ["atomic", "macabre:the_pit"],
    // Macabre 0.9.2 Limbo: reachable only after the Otherworldly Dead God (via the dead_god_egg),
    // so it is Otherworldly-tier, not Atomic. One-way like the_pit.
    ["otherworldly", "macabre:limbo"],
    ["industrial_revolution", "neovitae:dungeon"],
  ]

  dimensionLocks.forEach(function (entry) {
    const id = 'aoa/dimension/' + entry[0] + '/' + entry[1].replace(/[^a-zA-Z0-9_]/g, '_')
    AStages.addRestrictionForDimension(id, entry[0], entry[1]).setBidirectional(false)
  })
})()
