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

const SessionTest = () => {
  const [courseId, setCourseId] = useState("");
  const [sectionIds, setSectionIds] = useState<string[]>([]);
  const [learningTargetIds, setLearningTargetIds] = useState<string[]>([]);

  const courses = api.courses.getAllCourses.useQuery();

  const sections = api.section.getAllSections.useQuery(
    { courseId },
    { enabled: !!courseId }
  );

  const learningTargets = api.learningTarget.getAllLearningTargets.useQuery(
    { courseId },
    { enabled: !!courseId }
  );

  const onSectionChange = (event: SelectChangeEvent<typeof sectionIds>) => {
    const {
      target: { value },
    } = event;
    setSectionIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const onLearningTargetChange = (
    event: SelectChangeEvent<typeof learningTargetIds>
  ) => {
    const {
      target: { value },
    } = event;
    setLearningTargetIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <Navbar />

      <div>
        <h1>Test for Sessions</h1>

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
              value={sectionIds}
              label="Sections"
              onChange={onSectionChange}
              multiple
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
            <InputLabel id="demo-simple-select-label">
              Learning Targets
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={learningTargetIds}
              label="Sections"
              onChange={onLearningTargetChange}
              multiple
            >
              {learningTargets.data?.map((learningTarget, index) => {
                return (
                  <MenuItem key={index} value={learningTarget.id}>
                    {learningTarget.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        
      </div>
    </>
  );
};

export default SessionTest;
