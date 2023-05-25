import { useState } from "react";
import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

const LearningTarget = () => {
  const [courseId, setCourseId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate } = api.section.createSection.useMutation();

  const userType = api.user?.getUserType.useQuery();

  if (userType.data === "student") {
    return <div>Something is student</div>;
  }

  const courses = api.courses.getAllCourses.useQuery();

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

        <label htmlFor="courses" className="">
          select course
          <select
            name="courses"
            id="courses"
            className="w-auto"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="" disabled selected>
              Select your option
            </option>
            {courses.data?.map((course, index) => {
              return (
                <option key={index} value={course.id}>
                  {course.name}
                </option>
              );
            })}
          </select>
        </label>
        <button
          type="submit"
          onClick={() => mutate({ name, description, courseId })}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default LearningTarget;
