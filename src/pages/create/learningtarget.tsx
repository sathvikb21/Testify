import { useState } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

const LearningTarget = () => {
  const [courseId, setCourseId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate } = api.learningTarget.createLearningTarget.useMutation();

  const userType = api.user?.getUserType.useQuery();

  if (userType.data === "student") {
    return <div>something is student</div>;
  }

  const courses = api.courses.getAllCourses.useQuery();

  const handleChange = (event: SelectChangeEvent) => {
    setCourseId(event.target.value);
  };

  return (
    <>
      <Navbar />

      <div className="flex h-[90vh] flex-col items-center">
        <h1 className="text-center text-3xl font-bold">
          Create Learning Target
        </h1>

        <form
          action=""
          className="flex h-full w-screen flex-col items-center justify-center space-y-3"
        >
          <div className="flex w-1/4 flex-col">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
          </div>

          <div className="flex w-1/4 flex-col">
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="outlined-basic"
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
                onChange={handleChange}
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
          <button
            type="submit"
            onClick={() => mutate({ name, description, courseId })}
            className="rounded-lg bg-[#EB584F] px-10 py-2 text-white hover:bg-[#C04841]"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default LearningTarget;
