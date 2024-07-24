import Session from "../models/session.model";

export const getAllSessions = async (): Promise<any> => {
  try {
    const sessions = await Session.find()
      .populate("venueId", "location")
      .populate("lectureId", "name")
      .populate("courseId", "name")
      .populate("facultyId", "name")
      .populate("student", "name email");

    return sessions;
  } catch (error) {
    return new Error("Internal error: " + error);
  }
};
