function getCurrentDay() {
  return String(moment().toDate()).split(" ").slice(0, 5).join(" ");
}

function placeCurrentDateUnderTitle() {
  const $titleDate = $("#currentDay");
  $titleDate.text(getCurrentDay());
}

// Checks the time and sets the background color to the text area according to past current or
// future time slots
function setCorrectBackgroundColor() {
  // Loops over all textareas. At each iteration it checks if current time is greater than the number
  // stored in the data-time attribute that every textarea has. This corresponds to the hour it represents.
  // If it is, it removes the future and present background colors and sets it to the past one
  document.querySelectorAll("textarea").forEach((textarea) => {
    const hourSlot = textarea.getAttribute("data-hour");
    const currentHour = Number(moment(hourSlot, "HH")._i); // type: number

    if (moment().hour() > currentHour) {
      textarea.classList.remove("future");
      textarea.classList.remove("present");
      textarea.classList.add("past");
      // debugger;
    } else if (moment().hour() === currentHour) {
      textarea.classList.remove("future");
      textarea.classList.remove("past");
      textarea.classList.add("present");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    placeCurrentDateUnderTitle();
    setCorrectBackgroundColor();
  }, 1000);
});
