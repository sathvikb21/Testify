import { useState } from "react";
import Navbar from "~/components/Navbar";

import { api } from "~/utils/api";

const Course = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [sections, setSections] = useState<string[]>();

  const { mutate } = api.courses.createNewCourse.useMutation();

  return (
    <>
      <Navbar />

      <form>
        <label htmlFor="name">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="desc">
          Description
          <input
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        {/* <select
          name="sections"
          id=""
          multiple
        >
          <option value="R1">R1</option>
          <option value="R2">R2</option>
          <option value="R3">R3</option>
          <option value="R4">R4</option>
          <option value="W1">W1</option>
          <option value="W2">W2</option>
          <option value="W3">W3</option>
          <option value="W4">W4</option>
        </select> */}

        <button type="submit" onClick={() => mutate({ name, description })}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Course;
