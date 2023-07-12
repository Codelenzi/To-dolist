const inputBox = document.getElementById("input-box");
const listCon = document.getElementById("list-con");
const progressBar = document.getElementById("progress-bar");
const progressLabel = document.getElementById("progress-label");
const resetButton = document.getElementById("reset-button");

// Add a task to the list
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    listCon.appendChild(li);

    li.addEventListener("click", function (e) {
      if (e.target.tagName === "SPAN") {
        li.remove();
      } else {
        li.classList.toggle("checked");
      }
      updateProgressBar();
      saveData();
    });

    updateProgressBar();
    saveData();
  }

  inputBox.value = "";
  inputBox.focus();
}

// Handle keydown event for input box
function handleKeyDown(event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // Prevent form submission
    addTask();
  }
}

// Update the progress bar based on checked tasks
function updateProgressBar() {
  const totalTasks = document.querySelectorAll("#list-con li").length;
  const completedTasks = document.querySelectorAll("#list-con li.checked").length;

  let progressPercentage = 0;
  if (totalTasks > 0) {
    progressPercentage = (completedTasks / totalTasks) * 100;
  }

  progressBar.style.width = "0%";
  progressBar.style.transition = "width 0.5s";

  setTimeout(function () {
    progressBar.style.width = `${progressPercentage}%`;
  }, 0);

  if (completedTasks > 0) {
    progressLabel.style.visibility = "visible";
    progressLabel.textContent = `${Math.round(progressPercentage)}%`;
  } else {
    progressLabel.style.visibility = "hidden";
  }
}

// Save tasks to local storage
function saveData() {
  localStorage.setItem("data", listCon.innerHTML);
}

// Show saved tasks on page load
function showTask() {
  listCon.innerHTML = localStorage.getItem("data");
}

// Reset all tasks and progress bar
function resetTasks() {
  listCon.innerHTML = "";
  updateProgressBar();
  saveData();
  inputBox.value = "";
  inputBox.focus();
}

// Add event listener to the reset button
resetButton.addEventListener("click", resetTasks);

// Call the showTask function initially
showTask();
// Update the progress bar initially
updateProgressBar();
