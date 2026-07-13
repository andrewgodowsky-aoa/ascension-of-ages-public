# Suppress Lush Stacks — Optional Datapack

This pack is staged but NOT active. Install only if, after the applied Tectonic + BWG weight + RU biome-disable changes, Lush Stacks still feels overrepresented.

## Two routes — pick ONE

### Route A — Simplest (config toggle, recommended first)

Edit `config/biomeswevegone/world_generation.json5`:

```json5
"biomeswevegone:lush_stacks": false,
```

This falls Lush Stacks back to its vanilla counterpart biome in the BWG region. No datapack needed. Works for all new-gen chunks immediately.

### Route B — This datapack (surgical, preserves biome registration)

Use this only if Route A causes unwanted side effects (e.g., breaks a structure targeting that biome).

**Install:**
1. Copy the entire `suppress_lush_stacks/` folder (the one containing this README) into your world's datapack folder: `saves/<world_name>/datapacks/`
2. In-game, run `/reload` or `/datapack enable "file/suppress_lush_stacks"`
3. Only newly-generated chunks will be affected; see the note below.

**What this does:**
- `strip_lush_stacks_features.json` removes the biome's `vegetal_decoration` and `top_layer_modification` feature steps via NeoForge biome_modifier. The biome still places, but without the distinctive vegetation/top-layer blocks it becomes a plain variant that visually blends with surrounding ocean biomes.

**What this does NOT do:**
- NeoForge 1.21.1 biome_modifier does NOT support removing a biome from a multi-noise biome source. True removal requires overriding BWG's biome source parameter list file. Use Route A for that.

### Route C — Full biome-source override (advanced)

If you want Lush Stacks fully removed from generation via datapack (keeping other BWG biomes intact):

1. Extract `biomeswevegone-*.jar` (located in `mods/`).
2. Find `data/biomeswevegone/worldgen/multi_noise_biome_source_parameter_list/overworld.json` (path may differ slightly by BWG version).
3. Copy it to `suppress_lush_stacks/data/biomeswevegone/worldgen/multi_noise_biome_source_parameter_list/overworld.json`.
4. Delete every `biomes` array entry referencing `biomeswevegone:lush_stacks`.
5. Install the datapack (step B.1–B.3).

Route C is brittle across BWG updates — if BWG changes the parameter file structure, the override will desync. Route A is strongly preferred.

## Uninstall
Delete the `suppress_lush_stacks/` folder from `saves/<world>/datapacks/` and `/reload`.

## Scope warning
Only newly-generated chunks are affected. Already-explored areas keep their existing Lush Stacks patches regardless of which route is chosen.
