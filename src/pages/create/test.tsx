import { useState } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

const Test = () => {
  const [courseId, setCourseId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [learningTargets, setLearningTargets] = useState<string[]>([]);

  const courses = api.courses.getAllCourses.useQuery();
  const learningTargetsQuery =
    api.learningTarget.getAllLearningTargets.useQuery(
      { courseId },
      { enabled: !!courseId }
    );

  const userType = api.user?.getUserType.useQuery();

  const { mutate } = api.test.createNewTest.useMutation();

  if (userType.data === "student") {
    return <div>something is student</div>;
  }

  const onCourseChange = (event: SelectChangeEvent) => {
    setCourseId(event.target.value);
  };

  const onLearningTargetChange = (
    event: SelectChangeEvent<typeof learningTargets>
  ) => {
    const {
      target: { value },
    } = event;
    setLearningTargets(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      <Navbar />

      <div className="flex h-[90vh] flex-col items-center">
        <h1 className="text-center text-3xl font-bold">Create New Test</h1>

        <form
          action=""
          className="flex h-full w-screen flex-col items-center justify-center space-y-3"
        >
          <div className="flex w-1/4 flex-col">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              variant="outlined"
            />
          </div>

          <div className="flex w-1/4 flex-col">
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              variant="outlined"
            />
          </div>

          <div className="flex w-1/4 flex-col">
            <FormControl>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={courseId}
                label="Age"
                onChange={onCourseChange}
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
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={learningTargets}
                label="Age"
                onChange={onLearningTargetChange}
                multiple
              >
                {learningTargetsQuery.data?.map((learningTarget, index) => {
                  return (
                    <MenuItem key={index} value={learningTarget.id}>
                      {learningTarget.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <button
            type="submit"
            onClick={() => mutate({ name, description, courseId, learningTargets })}
            className="rounded-lg bg-[#EB584F] px-10 py-2 text-white hover:bg-[#C04841]"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Test;
