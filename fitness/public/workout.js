async function initWorkout() {
  const lw = await API.fetchLastWorkout();
  if (lw) {
    document
      .querySelector("a[href='/exercise?']")
      .setAttribute("href", `/exercise?id=${lw._id}`);
    const workoutSummary = {
      date: formatDate(lw.day),
      totalDuration: lw.totalDuration,
      numExercises: lw.exercises.length,
      ...exercisework(lw.exercises)
    };
    renderWorkoutSummary(workoutSummary);
  } else {
    renderNoWorkoutText()
  }
}
/**
 * 
 * @param {exercisework} e 
 * @returns the json array from the list of exercises.
 */
function exercisework(e) {
  const resJSONArray = e.reduce((item, index) => {
    if (index.type === "resistance") {
      item.totalWeight = (item.totalWeight || 0) + index.weight;
      item.totalSets = (item.totalSets || 0) + index.sets;
      item.totalReps = (item.totalReps || 0) + index.reps;
      item.totalDuration = (item.totalDuration || 0) + index.duration;
    } else if (index.type === "cardio") {
      item.totalDistance = (item.totalDistance || 0) + index.distance;
      item.totalDuration = (item.totalDuration || 0) + index.duration;
    }
    return item;
  }, {});
  return resJSONArray;
}

/**
 * 
 * @param {Date} objDa 
 * @returns the formatted date upon the parameters provided.
 */
function formatDate(objDa) {
  const params = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return new Date(objDa).toLocaleDateString(params);
}

/**
 * 
 * @param {ArrayObjects} objectS 
 */
function renderWorkoutSummary(objectS) {
  const mainDiv = document.querySelector(".workout-stats");
  const mapping = {
    date: "Date",
    totalDuration: "Total Workout Duration",
    numExercises: "Exercises Performed",
    totalWeight: "Total Weight Lifted",
    totalSets: "Total Sets Performed",
    totalReps: "Total Reps Performed",
    totalDistance: "Total Distance Covered"
  };

  Object.keys(objectS).forEach(key => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = mapping[key];
    const textNode = document.createTextNode(`: ${objectS[key]}`);
    p.appendChild(strong);
    p.appendChild(textNode);
    mainDiv.appendChild(p);
  });
}

function renderNoWorkoutText() {
  const container = document.querySelector(".workout-stats");
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = "You have not created a workout yet!"

  p.appendChild(strong);
  container.appendChild(p);
}

initWorkout();
