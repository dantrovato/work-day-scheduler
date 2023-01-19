function getCurrentDay() {
  return String(moment().toDate()).split(" ").slice(0, 4).join(" ");
}

function placeCurrentDateUnderTitle() {
  const $titleDate = $("#currentDay");
  $titleDate.text(getCurrentDay());
}

document.addEventListener("DOMContentLoaded", () => {
  const $container = $("div.container");

  placeCurrentDateUnderTitle();
});
