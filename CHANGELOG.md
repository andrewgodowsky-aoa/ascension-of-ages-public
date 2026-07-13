# Ascension of Ages — Update Notes

Running changelog. Newest build on top. Player-facing and progression-facing
changes only; routine library bumps are summarized, not itemized.

---

## July 2026 build (in development)

Delta measured against the last synced play instance. Roughly 90 mods moved
version, 22 were added, and 4 were removed; the entries below are the ones that
touch gameplay, progression, or performance.

### Headline changes — read these

- **Neo Vitae is now the magic spine.** Neo Vitae was added and is the required
  magic progression from the Renaissance through the Gilded Age. Forbidden &
  Arcanus is still installed but demoted to optional flavor, so the magic route
  you level through is different now. Expect Neo Vitae altars and rites where the
  old magic gates used to sit.

- **Macabre 0.9.2 — new endgame finale.** The Macabre update reshaped the late
  game. Morphegor is now the 5th prophet in the Atomic prophet line. Past that, a
  new Otherworldly finale runs Dead God → Limbo → Meshuggeneh, and Meshuggeneh
  feeds the Otherworldly capstone. This is required progression, not a side quest.

- **AStages updated to 2.3.1 (internal rewrite).** The stage system changed its
  command format, and all stage grants across the pack were migrated to the new
  API. If a stage ever fails to grant after this update — for example finishing a
  chapter but not unlocking the next age — the stage system is the first thing to
  check.



### Display and performance

- **Health bars.** Mob health bars now come from the Health Bars mod, so Jade no
  longer shows entity health. Bars stay hidden for passive animals like cows,
  sheep, and fish, show only for the mob under your crosshair, and stop drawing
  past 32 blocks.
- **Jade.** Look at a chest or machine to see its contents right away, with no
  need to hold shift. Jade no longer prints mod names in its overlay; item
  tooltips still show them.
- **Tooltips.** Obscure Tooltips is on with its Vibrant Tooltips style pack, so
  item tooltips get rarity frames. The enchanted book texture pack is enabled by
  default.
- **Config delivery.** Updated settings now reach existing saves. Performance
  options, mob caps, and the tweaks above apply on your next launch instead of
  only on a fresh install.

### Quest Book

- **July 12 questbook authority rebuild.** Quest rewards are chapter-owned again:
  54 equal-weight tables now serve 433 deliberately spaced quest milestones,
  while four roadmap or finale chapters intentionally have no random table.
  The pass also removed later duplicate boss quests, eliminated 100-mob asks,
  cleared redundant raw-plus-ingot tasks, removed excluded Artifact/Relic-style
  direct rewards, repaired stale item targets, and rewrote misleading or goofy
  quest text. Main quests are gold, side quests purple, and boss fights red.

- **Earlier reward pass (superseded by the July 12 rebuild above).** The prior
  in-development build used 30 age-tiered loot tables and placed random rewards
  on most quests. That design is retained here only as development history; it
  is no longer the live questbook behavior.

- **Renaissance unlock softlock fixed (important).** A grove "Great Hunt"
  requirement was set so it could never be satisfied, and that grove capstone is
  the only thing that grants the Renaissance stage. The result was that every
  Renaissance-gated boss and dimension (Nether, End, Aether, Eternal Starlight,
  Otherside, Undergarden) stayed locked. The requirement was corrected and the
  stage grants normally now. If you were already stuck, an admin can run
  `/astages add @a the_renaissance true true false` and relog.
- **Age-placement fixes (Modern Industrialization / Oritech).** Cleared cross-age
  inversions on quantum armor and quantum circuits, moved bronze into the
  Industrial Revolution where it belongs, cleared an Extended Industrialization
  gate snag, and added Oritech exosuit and tool quests.
- **Macabre finale questline** added: the Atomic Morphegor node plus its Pit
  onboarding, and the Otherworldly Dead God → Limbo → Meshuggeneh arc, with
  matching in-game codex (Modonomicon) entries. Review-pass layout and codex-page
  conflicts were cleaned up.
- **Community suggestions adopted:** the full grove questline topology (gated and
  crossing-free), a new smithing-anvil quest, and assorted early-game (m1 / iron
  era) refinements.
- **Softlock fixed:** the grove moon-paw quest used a filter that could block
  completion. The filter logic was corrected.
- **Cataclysm boss fixes:** several boss quests pointed at the wrong summon item
  or the wrong structure (Netherite Monstrosity and Maledictus among them). Summon
  items were corrected and the missing pre-kill summon steps were added, so those
  boss lines are completable as written.
- **Clarity pass:** a large batch of community-reviewed quest text edits landed,
  plus a cleanup sweep of stiff or unclear phrasing.
- **New: nuclear power chain (Atomic).** A 20-quest chain walks the full fuel
  cycle across Create nuclear, Nuclear Science, Mekanism, Oritech, and Modern
  Industrialization (isotope separation and MOX included), converging on fusion.
  The routes cross-feed instead of running in parallel.
- **New: Ascension depth.** 19 new quests flesh out the Extended Crafting and
  Re-Avaritia endgame ladders, so the final age is a real climb instead of a
  handful of tentpole crafts.
- **New coverage lines:** an Otherworldly arc for Gaze, a void-tier Malum line,
  and a batch of Industrial Revolution / Gilded Age additions.
- **Ascension finale fixed (important).** The Ultimate Ingot had no working
  recipe, which made the final boss convergence impossible to finish. It now has
  a real combination recipe, so the finale is completable end to end.
- **Item turn-in fixes:** several quests asked for items you could never obtain.
  A uranium powder task now asks for uranium dust, a boss-key task now asks for
  the actual mine key, an unobtainable gravity normalizer requirement was
  removed, a Nether-only hoglin-hide quest was moved out of the Dark-Age stone
  and water chapter into the Renaissance Nether chapter and made optional, and
  two Industrial Foregoing tasks now point at real, craftable items.

### Progression blockers fixed

A deep full-book audit of all 61 chapters (adversarially verified, then
critiqued and re-verified) found and fixed seven hard progression stops:

- **Iron Age gate** — *Entering the Iron Era*, the only quest that grants
  Medieval, demanded an un-draftable blueprint state, so nobody could progress
  past the Dark Age by the book. It now accepts any Overgeared blueprint.
- **Obsidilith capstone (Industrial → Gilded)** — asked for a boss item that has
  no drop or recipe; it now completes on the Obsidilith kill you already do.
- **Aether (Renaissance)** — the Valkyrie Queen proof lived in a dungeon that was
  locked to a later age, a circular dead end. The dungeon is now Renaissance-legal.
- **The End** — two "eyes" that End Remastered disables were required to finish
  the End chapter, so the stage never completed even for players already in the
  End. Those two are removed; the obtainable eyes remain. (The End itself was
  always reachable by finding eyes in structure loot.)
- **Two broken item turn-ins** — a Diesel Distillation task and a Space suit-module
  task pointed at unobtainable placeholder items; both now ask for real, craftable
  items.
- **Duplicate Otherworldly chapter** — *The Digital Cosmos* was a verbatim copy of
  the Dyson Project's quantum line and granted the same stage twice; it was retired.

### Mods added

Twenty-two mods were added. One line each on why it is here and what you get.

**Content and mobs**

- **Neo Vitae**: blood-based magic mod added as the pack's required magic spine, so Renaissance-to-Gilded progression now levels through its altars and rites instead of Forbidden & Arcanus.
- **Hybrid Aquatic**: adds new sea creatures, blocks, and improved rivers, swamps, and oceans, giving the water ages real underwater content.
- **Create: Aquatic Ambitions**: Create addon with new bulk-processing and ocean recipes, extending Create automation into aquatic gear.
- **Creatures and Beasts**: vanilla-style mob mod that fills overworld and End biomes with new creatures.
- **Critters and Companions**: vanilla-style mod adding overworld animals and tamable companions for ambient life.
- **Arcane Lanterns**: lanterns you imbue with catalysts for different effects, adding functional decorative lighting.
- **Natural Waters**: brings Bedrock-style per-biome water colors to Java for better-looking water without a shader.

**MineColonies**

- **MineColonies Compatibility**: official addon that lets colonists use items and blocks from other installed mods, wiring colonies into the wider pack.
- **MineColonies Tweaks**: addon adding custom citizen tools and extra colony configuration options.

**Interface**

- **FancyMenu**: customizes the title and pause menus for pack branding.
- **Drippy Loading Screen**: FancyMenu addon that customizes the loading screen to match.
- **Health Bars**: shows every mob's health in the HUD and in-world so you can read enemy health at a glance.

**Quest book**

- **AStages FTB Quests addon**: integrates AStages with FTB Quests so quests can read and grant progression stages directly.
- **FTB Quests Optimizer**: performance fix that reduces lag from the large quest book.

**Performance and quality of life**

- **FastBoot**: caches startup data to cut game loading time.
- **Create BetterFPS**: improves frame rate around Create contraptions.
- **Chunky**: pre-generates chunks so exploration and server load are smoother.
- **Sodium Extra**: adds video options Sodium leaves out, like fog, particle, and detail toggles.
- **Recipe Essentials**: speeds up recipe matching and adds recipe-book sorting and caching.
- **Structure Essentials**: speeds up structure search and locate, and lets the pack tune structure spacing.
- **Client Tweaks**: bundle of optional client-side quality-of-life tweaks.
- **Distraction-Free Recipes**: auto-hides the EMI recipe viewer until you search, keeping the screen clear.

### Mods removed

- **Civillis** — removed for performance. Its per-wave presence check scanned the
  entire world border every time it ran, which cost server CPU with no benefit to
  the pack. Nothing else depends on it.
- **CraftTweaker** — removed; the pack's recipe work runs through KubeJS, so
  nothing used it.
- **Item Obliterator** — removed; its item blacklisting is no longer needed.
- **Borderless Window** — removed. If you used it, most of the same behavior is
  available through your GPU/OS fullscreen settings or vanilla fullscreen (F11).

### Performance

Expect a smoother baseline than the last build. On top of the new performance
mods above, Sodium, Lithium, ImmediatelyFast, ServerCore, ModernFix, and Better
FPS Distance all moved forward.

### Other progression-relevant updates

L_Ender's Cataclysm (3.31 → 3.32), FD Bosses (3.1 → 3.2, the Qliphoth boss
family), Modern Industrialization (2.4.3 → 2.5.2), Nuclear Science, Electrodynamics,
Extended Industrialization, Immersive Petroleum, Hostile Neural Networks and its
Industrialization addon, and Sophisticated Storage / Core / Backpacks. Roughly
fifty more library, worldgen, and QoL mods received routine version bumps.

### Maintainer notes — watch-outs

- **AStages 2.3.1:** after updating, smoke-test at least one grant (finishing
  *Entering the Iron Era* should grant `medieval_times`). Setters are deprecated
  until AStages 3.0.0, so pin below 3.0.0.
- **Four client-side mods live only on the play instance**, not in the repo build:
  Distant Horizons, Entity Model Features, Entity Texture Features, and PacketFixer.
  These look like personal client additions. Note that EMF and ETF still have
  config files in the repo, so confirm whether they were deliberately dropped or
  should be re-added before shipping.
- **Boot smoke-tests still owed** for the Macabre 0.9.2 arc, the grove line, the
  Great Hunt gate, and the smithing-anvil quest.
- **Civillis removal is not a full perf fix.** A separate chunk-unload memory leak
  (Sable-side) can persist after Civillis is gone and still needs a heap dump to
  confirm. Don't advertise the removal as solving all server lag.

### Before you update

1. **Back up your world.**
2. On a **team server**, have everyone log in once so stages sync cleanly.
3. Your magic route changed — look for **Neo Vitae** where Forbidden & Arcanus
   used to gate progression.

---

## June 2026 build

What's new since the previous public build.

### Quest Book

We went through the whole book and rewrote quest text so it tells you what to build, why it matters, and what comes next — especially in the Gilded and Atomic ages. The book now has **1,820 quests across 55 chapters**, with the biggest growth in those late ages.

Fixed a few progression hiccups along the way: duplicate turn-ins, confusing gate wording, and optional chapters that were accidentally blocking the main path.

**Journey to Ascension** got rebuilt — a spoiler-free roadmap of each age and its gate, with links out to the chapters that matter.

### Progression & Multiplayer

Playing with friends? Age stage grants now **sync to your whole FTB team** when anyone completes them. If you log in missing a stage your team already cleared, it should fix itself on login — no need to redo the quest.

**Iron Era / AStages fix:** All progression stages now register with `customizeStage()` so `/astages add` and `/astages list` work. Completing **Entering the Iron Era** should grant `medieval_times` and unlock Medieval chapters. (FTB Quests rewards were never removed; the live instance still had stale R5-stripped copies in a non-authoritative path.)

**Config seed layout:** Pack default seeds now live under `config/modpack_defaults/config/` so Config Manager copies into `config/` instead of the instance root. Fresh installs should no longer sprawl hundreds of `.toml` files beside `mods/`.

**Cave spawns:** InControl caps were too aggressive (`perplayer` across all loaded chunks). Underground caps are higher and **per-chunk** now (Y≤20: 24, Y≤64: 40, surface: 40). MonsterPlus cap raised to 10 per chunk; Ancient Hero capped separately at 2 per chunk. **Corrupted Ancient Hero** quest text now clarifies overworld natural spawn (not deepslate-only).

**Fixes:**
- Theurgy IR feedstock quest now asks for the **Sulfur Vessel** (not the Renaissance incubator).
- Industrial Create recap quests are optional again — they won't hold up the age.
- Farmer's Delight cooking pot recipe uses a **stone shovel** (wooden tools aren't craftable under Overgeared).

Several machines and items were moved to the age the quests actually expect — late Immersive Petroleum processing, Integrated Dynamics basins, ProjectRed automation, and some Create redstone parts now unlock in **Industrial Revolution**. Late Atomic and Ascension gear (Oritech duratium, bigger RS Mek storage, Chemical Science machines, advanced Extended Crafting) was pushed to the right tier.

**Boss rewards:** six new prestige boss loot caches (Obsidilith, Maledictus, Void Titan, Geburah, Macabre, Leviathan), plus a broader rebalance of industrial, expedition, ascension, and nuclear reward pools.

### Graphics

Updated **Sodium** and **Iris** to fix launch and world-load crashes. A few old Sodium addons had to go because they don't support the new version yet: Sodium Leaf Culling, Reese's Sodium Options, Sodium Options API, and Mekanism Covers.

### World Generation

Villages should be easier to find and less likely to spawn on cliffs or in the ocean. Changes only affect **new chunks** — your existing world is fine.

### New Guides

- **Gilded Ledger** — in-game guide for the Gilded Age
- **Atomic Dossier** — in-game guide for the Atomic Age

### Mod Changes

**Added:** Tombstone (death recovery), FTB Chunks, ExtraQuests, FTB Filter System, FTB Quests Entity Vis, Beautiful Enchanted Books.

**Removed:** Gravestone (replaced by Tombstone), and the Sodium addons listed above.

**Updated:** Occultism, Oritech, Nuclear Science, Cataclysm, Ballistix/Blastcraft, several Create addons, Sophisticated Storage/Backpacks, FTB Quests, JourneyMap, Supplementaries, and more.

### Before You Update (June build)

1. **Back up your world.**
2. **Gravestone is gone** — Tombstone handles death differently. Old graves won't carry over.
3. On a **team server**, have everyone log in once after updating so stages sync cleanly.
4. Look for the **Gilded Ledger** and **Atomic Dossier** when you reach those ages.
