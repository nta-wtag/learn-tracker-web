import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CompletedLesson } from "types/course-types";
import { saveCompletedLessons } from "utils/lesson-storage";

export const loadLessonsThunk = createAsyncThunk<CompletedLesson[]>(
  "lesson/loadLessons",
  async () => {
    try {
      const stored = localStorage.getItem("completedLessons");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading completed lessons:", error);
      return [];
    }
  }
);

export const markLessonCompleteThunk = createAsyncThunk<
  CompletedLesson,
  CompletedLesson
>(
  "lessons/markLessonComplete",
  async (lesson, { getState }) => {
    const state = (getState() as { lesson: { completedLessons: CompletedLesson[] } }).lesson;

    const exists = state.completedLessons.find(
      (l) => l.courseName === lesson.courseName && l.moduleTitle === lesson.moduleTitle
    );

    if (!exists) {
      const updatedLessons = [...state.completedLessons, lesson];

      saveCompletedLessons(updatedLessons);

      return lesson;
    }

    return lesson; 
  }
);

export const unmarkLessonThunk = createAsyncThunk<
  CompletedLesson,
  CompletedLesson
>(
  "lessons/unmarkLesson",
  async (lesson, { getState }) => {
    const state = (getState() as { lesson: { completedLessons: CompletedLesson[] } }).lesson;

    const updatedLessons = state.completedLessons.filter(
      (l) =>
        l.courseName !== lesson.courseName ||
        l.moduleTitle !== lesson.moduleTitle
    );

    saveCompletedLessons(updatedLessons);

    return lesson;
  }
);
