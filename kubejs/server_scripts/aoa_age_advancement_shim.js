// AoA KubeJS: aoa_age_advancement_shim.js
//
// Mirrors AStages age-stage flips into hidden Minecraft advancements so
// guide/reference surfaces can key off `aoa:age/*` advancement state.
// AStages remains the stage authority — this shim NEVER grants, revokes, or
// reads stages as authority. It only awards advancements when the player
// already holds the corresponding stage, which AStages put there.
//
// Bridging strategy: login-only reconciliation. No ServerEvents.tick polling.
// FTBQ capstone quests may also co-grant the advancement via a command
// reward (see AOA_FTBQ_CAPSTONE_REWARD_CONTRACT). The login pass is the
// safety net for offline teammates and legacy saves.
//
// AStages API verified 2026-05-15 against astages-2.0.3-1.21.1.jar
// (com.alessandro.astages.infrastructure.integration.kubejs.util.KubeJSServerUtils):
//   AStages.playerHasStage(String stage, Player player) -> boolean
//   Parameter order is (stage, player), not (player, stage).

;(function () {
  if (typeof AStages === 'undefined') return

  const AGE_STAGES = [
    'dark_ages',
    'medieval_times',
    'the_renaissance',
    'industrial_revolution',
    'gilded_age',
    'atomic',
    'otherworldly',
    'ascension'
  ]

  function reconcileForPlayer(player) {
    if (!player) return
    AGE_STAGES.forEach(function (stage) {
      if (AStages.playerHasStage(stage, player)) {
        // awardAdvancement is idempotent — Minecraft only fires the toast
        // when progress actually changes, so re-awarding on each login
        // does not re-show "Age Unlocked: ..." to the player.
        if (player.server) player.server.runCommandSilent('advancement grant ' + player.username + ' only aoa:age/' + stage)
      }
    })
  }

  PlayerEvents.loggedIn(function (event) {
    reconcileForPlayer(event.player)
  })
})()
