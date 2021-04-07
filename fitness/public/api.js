// All the apis for the connection with the database.
const API = {
  // This api will fetch the last workout from the database.
  async fetchLastWorkout() {
    let result = await fetch("/api/workouts");
    // convert the result to json object
    const lastRecord = await result.json();
    // pick the last record from the converted object.
    return lastRecord[lastRecord.length - 1];
  },

  /**
   * @param {addExercise API} userInputObjectWorkout 
   * push the new exercise to the newly created/existing workout
   * @returns the newly created exercise for the workout.
   */
  async addExercise(userInputObjectWorkout) {
    const currentIndex = location.search.split("=")[1];
    const result = await fetch("/api/workouts/" + currentIndex, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInputObjectWorkout)
    });
    // return the output to the user.
    const output = await result.json();
    return output;
  },

  /**
   * @param {createWorkout API} userInputObjectWorkout 
   * Create a new workout so that the user can push 
   * new exercise to the create workout object
   * @returns 
   */
  async createWorkout(userInputObjectWorkout = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(userInputObjectWorkout),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const output = await res.json();
    return output;
  },

  /**
   * @returns api to fetch all the workouts from the database.
   */
  async fetchAllWorkouts() {
    const result = await fetch(`/api/workouts/range`);
    const output = await result.json();
    return output;
  },
};