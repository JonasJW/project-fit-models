// import { RoutineStatus, Programm, Routine, Preset, Tutor, CategorieItem, WorkoutExercise, Workout } from "./index";
// import firebase from 'firebase';

// export const fetchProgramm = async (id) => {
//     const doc = await firebase.firestore().collection('Programms').doc(id).get();
//     if (doc.exists) {
//         const programm = doc.data() as Programm;
//         programm.id = doc.id;
//         return programm;
//     } else {
//         return null;
//     }
// };

// export const fetchProgrammSections = async (id) => {
//     const query = await firebase.firestore().collection('Programms').doc(id).collection('Sections').get();
//     const sections = [];
//         query.docs.forEach((doc) => {
//         const section = doc.data();
//         section.id = doc.id;
//         sections.push(section);
//     });
//     return sections;
// };

// export const fetchProgrammComponents = async (id) => {
//     const query = await firebase.firestore().collection('Programms').doc(id).collection('Components').get();
//     const components = [];
//     query.docs.forEach((doc) => {
//         const component = doc.data();
//         component.id = doc.id;
//         components.push(component);
//     });
//     return components;
// };

// export const fetchFreeProgrammComponents = async (id) => {
//     const query = await firebase.firestore().collection('Programms').doc(id).collection('Components').where('isPreview', "==", true).get();
//     const components = [];
//     query.docs.forEach((doc) => {
//         const component = doc.data();
//         component.id = doc.id;
//         components.push(component);
//     });
//     return components;
// };

// export const fetchRoutine = async (id) => {
//     const doc = await firebase.firestore().collection('Workouts').doc(id).get();
//     if (doc.exists) {
//         const routine = doc.data() as Routine;
//         routine.id = doc.id;
//         return routine;
//     } else {
//         return null;
//     }
// };

// export const fetchPresetsForRoutine = async (routine: Routine) => {
//     await Promise.all(
//         routine.exercises.map(async (exercise) => {
//             const presetId = exercise.presetKey;
//             const presetData = await firebase.firestore().collection('Presets').doc(presetId).get();
//             if  (presetData.exists) {
//                 const preset = presetData.data() as Preset;
//                 preset.id = presetData.id;
//                 exercise.preset = preset;
//             }
//         })
//     );
// };

// export const fetchTutor = async (id) => {
//     const doc = await firebase.firestore().collection('Tutors').doc(id).get();
//     const tutor = doc.data() as Tutor;
//     tutor.id = doc.id;
//     return tutor;
// };

// export const fetchAllPresets = async () => {
//     const query = await firebase.firestore().collection('Presets').get();
//     const presets = query.docs.map((doc) => {
//         const preset = doc.data() as Preset;
//         preset.id = doc.id;
//         return preset;
//     });
//     return presets;
// };

// export const fetchCategories = async (): Promise<CategorieItem[]> => {
//     const doc = await firebase.firestore().collection('Config').doc('Categories').get();
//     if (doc.exists) {
//         const categories = [];
//         doc.data().categories.forEach((categorie) => {
//             categories.push(categorie);
//         });
//         return categories;
//     } else {
//         return null;
//     }
// };

// export const fetchNewsItems = async () => {
//     const doc = await firebase.firestore().collection('Config').doc('NewsFeed').get();
//     if (doc.exists) {
//         return doc.data().news;
//     } else {
//         return [];
//     }
// };

// export const fetchRoutineStatus = async (uid, routineId): Promise<RoutineStatus> => {
//     const doc = await firebase.firestore().collection('Users').doc(uid).collection('RoutineStatus').doc(routineId + uid).get();
//     if (doc.exists) {
//         const status = doc.data() as RoutineStatus;
//         status.id = doc.id;
//         return status;
//     }
// };

// export const fetchEntriesToPreset = async (uid: string, presetId: string) => {
//     const query = await firebase.firestore().collection('Users').doc(uid).collection('ExerciseEntries').where('presetKey', "==", presetId).get();
//     const entries: WorkoutExercise[] = query.docs.map((doc) => {
//         const exercise = doc.data() as WorkoutExercise;
//         exercise.id = doc.id;
//         return exercise;
//     });
//     return entries;
// };

// export const fetchWorkout = async (uid, workoutId) => {
//     const doc = await firebase.firestore().collection('Users').doc(uid).collection('WorkoutHistory').doc(workoutId).get();
//     if (doc.exists) {
//         const workout = doc.data() as Workout;
//         workout.id = doc.id;
//         return workout;
//     } else {
//         return null;
//     }
// };

// export const fetchExerciseEntry = async (uid: string, id: string) => {
//     const doc = await firebase.firestore().collection('Users').doc(uid).collection('ExerciseEntries').doc(id).get();
//     const entry = doc.data() as WorkoutExercise;
//     entry.id = doc.id;
//     return entry;
// };

// export const fetchPreset = async (id: string) => {
//     const doc = await firebase.firestore().collection('Presets').doc(id).get();
//     const preset = doc.data() as Preset;
//     preset.id = doc.id;
//     return preset;
// };

// export const listenProgrammStatus = async (uid, programmId, onUpdate) => {
//     const unsubscribe = firebase.firestore().collection('Users').doc(uid).collection('ProgrammStatus').doc(uid + programmId).onSnapshot(function (doc) {
//         if (doc.exists) {
//             const status = doc.data();
//             status.id = doc.id;
//             onUpdate(status);
//         } else {
//             onUpdate(null);
//         }
//     });
//     return unsubscribe;
// };

// export const watchActiveProgrammStatus = async (uid, onUpdate) => {
//     if (uid) {
//         firebase.firestore().collection('Users').doc(uid).collection('ProgrammStatus').where('active', '==', true).onSnapshot((query) => {
//             const statuses = [];
//             query.docs.forEach((doc) => {
//                 const status = doc.data();
//                 status.id = doc.id;
//                 statuses.push(status);
//             });
//             onUpdate(statuses);
//         });
//     }
// };

// export const loadUserData = async (uid) => {
//     const doc = await firebase.firestore().collection('Users').doc(uid).get();
//         if (doc.exists) {
//             const user = doc.data();
//             user.uid = uid;
//             return user;
//         } else {
//             return null;
//         }
// };

// export const stopProgramm = async (uid, programmId) => {
//     if (uid && programmId) {
//         firebase.firestore().collection('Users').doc(uid).collection('ProgrammStatus').doc(uid + programmId).set({active: false}, { merge: true });
//     }
// };

// export const startProgramm = async (uid, programmId) => {
//     if (uid && programmId) {
//         const now = new Date();
//         const status = {
//             startedAt: now.getTime(),
//             active: true,
//             programmId: programmId,
//         };
//         firebase.firestore().collection('Users').doc(uid).collection('ProgrammStatus').doc(uid + programmId).set(status);
//     }
// };

// export const charge = async (token, programmId) => {
//     console.log('Charging');
//     // firebase.functions().useFunctionsEmulator('http://localhost:5000');
//     const createCharge = firebase.functions().httpsCallable('createCharge');
//     return createCharge({ sourceId: token, programmId: programmId})
//         .then((res) => {
//             console.log('Charge Res', res);
//             return {success: res.data && res.data.success ? res.data.success : false};
//         })
//         .catch((err) => {
//             console.log('Message', err.message, 'name', err.name, err.details);
//             console.log('Err Charge', err);
//             return { success: false, message: err.details && err.details.userMessage ? err.details.userMessage : 'Sorry, an Error occoured. Please try again or contact the support.'};
//         });
// };

// export const pushExerciseEntries = async (exercises: WorkoutExercise[], uid: string) => {
//     const entryKeys: string[] = [];

//     await Promise.all(
//         exercises.map(async (exercise) => {
//             function replacer(key, value) {
//                 if (key !== "currentSet" &&
//                     key !== "preset" &&
//                     key !== "maxRepsSet" &&
//                     key !== "recentExercise") {
//                     return value;
//                 }
//             }

//             const jsonString = JSON.stringify(exercise, replacer);

//             const res = await firebase.firestore().collection('Users').doc(uid).collection('ExerciseEntries').add(JSON.parse(jsonString));
//             entryKeys.push(res.id);
//         })
//     );
//     return entryKeys;
// };

// export const pushFinishedWorkout = async (workout: Workout, uid: string) => {
//     function replacer(key, value) {
//         if (key !== "currentExercise" &&
//             key !== "currentCircuitRound" &&
//             key !== "exercises" &&
//             key !== "lastWorkout" &&
//             key !== "status") {
//                 return value;
//         }
//     }

//     const jsonString = JSON.stringify(workout, replacer);

//     const res = await firebase.firestore().collection('Users').doc(uid).collection('WorkoutHistory').add(JSON.parse(jsonString));
//     return res.id;
// };

// export const pushRoutineStatus = async (status: RoutineStatus, workoutId: string, uid: string) => {
//     const jsonString = JSON.stringify(status);

//     const res = await firebase.firestore().collection('Users').doc(uid).collection('RoutineStatus').doc(status.routineId + uid).set(JSON.parse(jsonString));
// };

// export const watchWorkoutHistory = async (uid: string, onChange) => {
//     firebase.firestore().collection('Users').doc(uid).collection('WorkoutHistory').orderBy('finishedAt', 'desc').onSnapshot((query) => {
//         const history: Workout[] = [];
//         query.docs.forEach((doc) => {
//             const workout = doc.data() as Workout;
//             workout.id = doc.id;
//             history.push(workout);
//         });
//         onChange(history);
//     });
// };

// export const watchRoutineStatuses = async (uid: string, onChange) => {
//     firebase.firestore().collection('Users').doc(uid).collection('RoutineStatus').onSnapshot((query) => {
//         const statuses: { routine: Routine, status: RoutineStatus }[] = [];
//         query.docs.forEach(async (doc) => {
//             const status = doc.data() as RoutineStatus;
//             status.id = doc.id;
//             const routine = await this.fetchRoutine(status.routineId) as Routine;
//             statuses.push({ routine, status });
//         });
//         onChange(statuses);
//     });
// };

// // Put for Cms
// export const setCategories = async (jsonString: string): Promise<boolean> => {
//     try {
//         await firebase.firestore().collection('Config').doc('Categories').set({"categories": JSON.parse(jsonString)}, {merge: true});
//         console.log('**');
//         return true;
//     } catch (error) {
//         return false;
//     }
// };