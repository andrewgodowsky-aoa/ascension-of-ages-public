// AoA M1 - Medieval-legal wrench recipe
// Stock Create wrench uses c:plates/gold. Gold and the Mechanical Press both
// unlock at Medieval per aoa_astages_06 and aoa_astages_01 respectively, but
// the vanilla recipe is brass-plated and brass is Renaissance (zinc gates at
// the_renaissance per aoa_astages_06). Use andesite alloy so the first Create
// control tool follows the visible M1 shaft/cog path with materials any Medieval
// player has on hand.

ServerEvents.recipes(event => {
  event.remove({ id: "create:crafting/kinetics/wrench" });

  event.shaped(
    Item.of("create:wrench"),
    [
      "AA ",
      "AP ",
      "  S"
    ],
    {
      A: "create:andesite_alloy",
      P: "create:cogwheel",
      S: "#c:rods/wooden"
    }
  ).id("aoa:m1/wrench_from_andesite_alloy");
});
