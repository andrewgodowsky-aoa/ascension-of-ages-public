# Contributing to Ascension of Ages

Thank you for helping improve the pack. This repo holds **authored source only**
(quests, KubeJS, config, and release notes). It does not ship mod jars, saves, or worlds.

**Repository:** https://github.com/andrewgodowsky-aoa/ascension-of-ages-public

**Default branch:** `main` — open pull requests against `main`.

## Quick start

1. Fork the repo on GitHub (no invite needed; the repo is public).
2. Create a branch for your change.
3. Edit only what your change needs (see scope below).
4. Open a **Pull Request** into `main`.
5. Describe what you changed and how you tested it in-game (or in the quest editor).

## Good first targets

- FTB Quest prose, layout, or dependency fixes (`config/ftbquests/`)
- KubeJS recipes and stage gates (`kubejs/`)
- Pack config that is clearly intentional (`config/`, `configureddefaults/`)
- Release notes (`CHANGELOG.md`, `playerchangelog.md`)

## Do not submit

- Files under `mods/`, `saves/`, `logs/`, or launcher cache paths
- Guessed item IDs — verify every ID against the pack or mod jar
- Later-age items or mechanics in earlier-age quest lines (see age rules below)
- Bulk generated mod config dumps unless you know why each file changed

## Age-tier rule (important)

The pack has 8 ordered ages: `dark_ages`, `medieval_times`, `the_renaissance`,
`industrial_revolution`, `gilded_age`, `atomic`, `otherworldly`, `ascension`.

A quest may only require content legal at or before its chapter's age. Check
`kubejs/server_scripts/aoa_astages_00_register_stages.js` and the
`aoa_astages_*.js` restriction scripts before adding item tasks.

## Quest authoring notes

- Quest files: `config/ftbquests/quests/chapters/*.snbt`
- Preserve SNBT structure; do not strip `SkillsLevel` blocks
- Dependency lines must not cross on the chapter graph
- Use real More Quest Types task IDs only (verify in the mod jar)

## Review process

Maintainers review PRs before merge. Small, focused PRs (one chapter, one recipe
chain, one config fix) merge faster than kitchen-sink changes.

Questions or design ideas: open a **GitHub Issue** or use **Discussions** on the
repo before writing a large PR.

Pull requests use the template in `.github/pull_request_template.md` (age-tier
checklist, testing notes). `main` requires at least one approving review before
merge.

## Local clone (optional)

```powershell
git clone https://github.com/andrewgodowsky-aoa/ascension-of-ages-public.git
cd ascension-of-ages-public
```

Copy authored folders into your local Minecraft instance as needed; do not
commit runtime files from a live instance back to Git.
