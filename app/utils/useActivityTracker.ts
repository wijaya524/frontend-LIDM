import { useEffect, useRef, useState } from "react";
import { useLearning } from "../context/LearningContext";
import { saveGameLog } from "./api";

export function useActivityTracker(activityKey: string) {
  const { userId } = useLearning();
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [hints, setHints] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  // Store task initiation times (in seconds)
  const initiationTimes = useRef<number[]>([]);
  
  // Track mount/page-load time
  const pageMountTime = useRef<number>(0);
  
  // Track current task start time
  const currentTaskStartTime = useRef<number>(0);
  const hasSubmitted = useRef<boolean>(false);

  const isStartedRef = useRef<boolean>(false);
  const wrongAnswersRef = useRef(0);
  const hintsRef = useRef(0);

  wrongAnswersRef.current = wrongAnswers;
  hintsRef.current = hints;

  const incrementWrongAnswers = () => setWrongAnswers((prev) => prev + 1);
  const incrementHints = () => setHints((prev) => prev + 1);

  useEffect(() => {
    pageMountTime.current = Date.now();
    currentTaskStartTime.current = 0;
    initiationTimes.current = [];
    hasSubmitted.current = false;
    setIsStarted(false);
    isStartedRef.current = false;

    console.log(`[useActivityTracker] Started task initiation tracking for: ${activityKey}`);

    // Auto submit after 5 minutes (300 seconds)
    const fiveMinutesTimeout = setTimeout(() => {
      console.log(`[useActivityTracker] 5 minutes threshold reached for ${activityKey}. Auto-submitting...`);
      submitSessionLog();
    }, 300000);

    const submitSessionLog = async () => {
      // Only submit if the activity was actually started
      if (!isStartedRef.current) {
        console.log(`[useActivityTracker] Activity not started. Skipping database log for: ${activityKey}`);
        return;
      }
      if (hasSubmitted.current) return;
      hasSubmitted.current = true;

      const times = initiationTimes.current;
      
      // Calculate average task initiation time
      let avgInitiationTime = 0;
      if (times.length > 0) {
        const sum = times.reduce((a, b) => a + b, 0);
        avgInitiationTime = sum / times.length;
      } else {
        // Fallback: if somehow started but no times recorded, use time from mount to now
        const elapsedMs = Date.now() - pageMountTime.current;
        avgInitiationTime = elapsedMs / 1000;
      }

      // Cap average initiation time between 1 and 300 seconds
      if (avgInitiationTime > 300) avgInitiationTime = 300;
      if (avgInitiationTime < 1) avgInitiationTime = 1;

      if (userId) {
        try {
          console.log(`[useActivityTracker] Saving log to DB (Task Initiation Time): ${activityKey}`, {
            userId,
            avgInitiationTime,
            wrongAnswers: wrongAnswersRef.current,
            hints: hintsRef.current,
            allInitiationTimes: times,
          });

          await saveGameLog(
            userId,
            avgInitiationTime,
            wrongAnswersRef.current,
            hintsRef.current
          );
        } catch (err) {
          console.error(`[useActivityTracker] Failed to save log to database:`, err);
        }
      } else {
        console.warn(`[useActivityTracker] Skipped backend logging. User not registered.`);
      }
    };

    // Cleanup and save log on page exit (unmount)
    return () => {
      clearTimeout(fiveMinutesTimeout);
      submitSessionLog();
    };
  }, [activityKey, userId]);

  // Call this when the child clicks "Mulai Bermain" to start the game
  const startActivity = () => {
    if (isStartedRef.current) return;
    const now = Date.now();
    const elapsedSeconds = (now - pageMountTime.current) / 1000;
    
    initiationTimes.current.push(elapsedSeconds);
    setIsStarted(true);
    isStartedRef.current = true;
    
    // Start tracking the first in-game task (e.g., Question 1)
    currentTaskStartTime.current = now;

    console.log(`[useActivityTracker] Activity started. Start initiation time: ${elapsedSeconds.toFixed(2)}s`);
  };

  // Call this when a new task (e.g., Question 2, Question 3) is presented
  const startNewTask = () => {
    if (!isStartedRef.current) return;
    currentTaskStartTime.current = Date.now();
    console.log(`[useActivityTracker] New task started at: ${currentTaskStartTime.current}`);
  };

  // Call this when the user takes their first action on the current task (e.g., clicks an answer option)
  const trackTaskAction = () => {
    if (!isStartedRef.current || currentTaskStartTime.current === 0) return;
    
    const now = Date.now();
    const elapsedSeconds = (now - currentTaskStartTime.current) / 1000;
    
    initiationTimes.current.push(elapsedSeconds);
    // Reset current task start time to prevent double-tracking for the same task/question
    currentTaskStartTime.current = 0;

    console.log(`[useActivityTracker] Task action tracked. Initiation time: ${elapsedSeconds.toFixed(2)}s`);
  };

  return {
    isStarted,
    startActivity,
    startNewTask,
    trackTaskAction,
    incrementWrongAnswers,
    incrementHints,
    wrongAnswers,
    hints,
  };
}
