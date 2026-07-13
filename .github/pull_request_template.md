## Summary

<!-- What does this PR change, and why? One or two sentences. -->

## Scope

<!-- Check all that apply -->

- [ ] FTB Quests (`config/ftbquests/`)
- [ ] KubeJS (`kubejs/`)
- [ ] Pack config (`config/`, `configureddefaults/`, `modpack_defaults/`)
- [ ] Documentation (`docs/`, `progression/`, `CONTRIBUTING.md`)
- [ ] Other (describe):

## Age-tier check (required for quest / item / stage changes)

<!-- Skip this section only if the PR touches docs or unrelated config. -->

- [ ] Every item, block, mechanic, or mod referenced exists (verified on disk or in jar — no guessed IDs)
- [ ] Every quest task uses content legal at or before its chapter's age
- [ ] Stage gates checked against `kubejs/server_scripts/aoa_astages_00_register_stages.js` and `aoa_astages_*.js`
- [ ] No later-age tech placed in an earlier-age chapter line

**Chapters / ages touched:**

<!-- e.g. g6_circuits_and_current (gilded_age), at3_chain_reaction (atomic) -->

## Quest layout (if editing `.snbt` chapters)

- [ ] Dependency lines do not cross
- [ ] `SkillsLevel` blocks left intact
- [ ] Only verified More Quest Types task IDs used

## Testing

<!-- How did you verify this? In-game, quest editor, `node --check` on KubeJS, etc. -->

- [ ] Tested in-game or in the quest editor
- [ ] KubeJS scripts pass `node --check` (if edited)
- [ ] No mod jars, saves, logs, or runtime cache files included

**Steps taken:**

<!-- Brief test notes -->

## Screenshots / notes

<!-- Optional: quest graph snippet, EMI recipe, error before/after -->
