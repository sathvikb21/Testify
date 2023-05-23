import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { type SelectChangeEvent } from "@mui/material/Select";

const Section = () => {
  const [courseId, setCourseId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [studentIds, setStudentIds] = useState<string[]>([]);

  const courses = api.courses.getAllCourses.useQuery();

  const section = api.section.getAllSections.useQuery(
    { courseId },
    { enabled: !!courseId }
  );

  const allStudents = api.user.getAllStudents.useQuery();

  const { mutate } = api.section.addStudentsToSection.useMutation();

  const userType = api.user?.getUserType.useQuery();

  if (userType.data === "student") {
    return <div>something is student</div>;
  }

  const onStudentChange = (event: SelectChangeEvent<typeof studentIds>) => {
    const {
      target: { value },
    } = event;
    setStudentIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <Navbar />

      <div>
        <h1>Section</h1>

        <form action="">
          <div className="flex w-1/4 flex-col">
            <FormControl>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={courseId}
                label="Course"
                onChange={(e) => setCourseId(e.target.value)}
              >
                {courses.data?.map((course, index) => {
                  return (
                    <MenuItem key={index} value={course.id}>
                      {course.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div className="flex w-1/4 flex-col">
            <FormControl>
              <InputLabel id="demo-simple-select-label">Section</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sectionId}
                label="Age"
                onChange={(e) => setSectionId(e.target.value)}
              >
                {section.data?.map((section, index) => {
                  return (
                    <MenuItem key={index} value={section.id}>
                      {section.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div className="flex w-1/4 flex-col">
            <FormControl>
              <InputLabel id="demo-simple-select-label">Students</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={studentIds}
                label="Age"
                onChange={onStudentChange}
                multiple
              >
                {allStudents.data?.map((student, index) => {
                  return (
                    <MenuItem key={index} value={student.id}>
                      {student.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <button
            onClick={() => {
              mutate({ courseId, sectionId, studentIds });
            }}
          >
            Add Students
          </button>
        </form>
      </div>
    </>
  );
};

export default Section;
