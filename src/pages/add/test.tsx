import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

const Test = () => {
  const [courseId, setCourseId] = useState("");
  const [sectionId, setSectionId] = useState<string>("");
  const [testId, setTestId] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [students, setStudents] = useState<string[]>([]);

  const courses = api.courses.getAllCourses.useQuery();

  const sections = api.section.getAllSections.useQuery(
    { courseId },
    { enabled: !!courseId }
  );

  const tests = api.test.getAllTest.useQuery(
    { courseId },
    { enabled: !!courseId }
  );


  const studentsInSection = api.section.getStudentsInSection.useQuery(
    { sectionId },
    { enabled: !!sectionId }
  );

  const onSectionChange = (event: SelectChangeEvent) => {
    setSectionId(event.target.value);

    studentsInSection.data?.map((student) => {
      setStudents((students) => [...students, student.id]);
    });
  };

  const { mutate } = api.sectionTest.createNewSectionTest.useMutation();

  return (
    <>
      <Navbar />
      <form>
        <div className="flex w-1/4 flex-col">
          <FormControl>
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={courseId}
              label="Courses"
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
            <InputLabel id="demo-simple-select-label">Sections</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sectionId}
              label="Sections"
              onChange={(e) => onSectionChange(e)}
            >
              {sections.data?.map((section, index) => {
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
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={testId}
              label="Courses"
              onChange={(e) => setTestId(e.target.value)}
            >
              {tests.data?.map((test, index) => {
                return (
                  <MenuItem key={index} value={test.id}>
                    {test.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <input
          className="border"
          type="text"
          placeholder="Time Limit"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
        />

        <button
          type="submit"
          onClick={() => mutate({ testId, sectionId, timeLimit, students })}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Test;
