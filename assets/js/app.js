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
    } else if (moment().hour() === currentHour) {
      textarea.classList.remove("future");
      textarea.classList.remove("past");
      textarea.classList.add("present");
    }
  });
}

// Loops over all textareas. At each iteration it looks into local storage to see if there is any text to print in
// the timeslot
function loadTextFromLocalStorage() {
  // This takes any value stored as the string "undefined" and stores an empty string there instead
  Object.entries(localStorage).forEach((subArray) => {
    if (subArray[1] === "undefined") {
      subArray[1] = "";
    }
  });
  console.log("Local Storage: ", localStorage);
  // get the data-hour's value as key and the text of textarea as value
  document.querySelectorAll("textarea").forEach((textarea) => {
    const hourSlot = textarea.getAttribute("data-hour"); // type: string

    if (
      localStorage.getItem(`${hourSlot}`) &&
      localStorage.getItem(`${hourSlot}`) !== "undefined"
    ) {
      textarea.textContent = localStorage.getItem(`${hourSlot}`);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // refresh time, date and background colors of time slots every second
  setInterval(() => {
    placeCurrentDateUnderTitle();
    setCorrectBackgroundColor();
  }, 1000);

  // loop over each text area and insert text from local storage
  loadTextFromLocalStorage();

  // add event listener to button
  // - this takes text of it's textarea and stores in local storage
  $(".row").on("click", (event) => {
    const hourSlot = $(event.target)
      .closest("div")
      .find("textarea")
      .attr("data-hour"); // type: string
    const $task = $(event.target).prev().val();

    localStorage.setItem(`${hourSlot}`, `${$task}`);
  });
});
