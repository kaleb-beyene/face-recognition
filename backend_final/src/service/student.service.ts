import Student from "../models/student.model";

export const getStudentByName = async (name: string) => {
  const student = await Student.findOne({ name: name });

  if (!student) {
    return new Error(`Student not Found`);
  }
  return student;
};