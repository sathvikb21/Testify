import Navbar from "~/components/Navbar";
import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { api } from "~/utils/api";

const Questions = () => {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [courseId, setCourseId] = useState("");
  const [learningTarget, setLearningTarget] = useState("");
  const [answerOne, setAnswerOne] = useState("");
  const [answerTwo, setAnswerTwo] = useState("");
  const [answerThree, setAnswerThree] = useState("");
  const [answerFour, setAnswerFour] = useState("");

  const { mutate } = api.question.createNewQuestion.useMutation();

  const courses = api.courses.getAllCourses.useQuery();
  const learningTargets = api.learningTarget.getAllLearningTargets.useQuery(
    { courseId },
    { enabled: !!courseId }
  );

  return (
    <>
      <Navbar />

      <form>
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
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={learningTarget}
              label="Course"
              onChange={(e) => setLearningTarget(e.target.value)}
            >
              {learningTargets.data?.map((lt, index) => {
                return (
                  <MenuItem key={index} value={lt.id}>
                    {lt.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border"
          placeholder="Question"
        />
        <input
          type="text"
          value={answerOne}
          onChange={(e) => setAnswerOne(e.target.value)}
          placeholder="Answer Choice 1"
          className="border"
        />
        <input
          type="text"
          value={answerTwo}
          onChange={(e) => setAnswerTwo(e.target.value)}
          placeholder="Answer Choice 2"
          className="border"
        />
        <input
          type="text"
          value={answerThree}
          onChange={(e) => setAnswerThree(e.target.value)}
          placeholder="Answer Choice 3"
          className="border"
        />
        <input
          type="text"
          value={answerFour}
          onChange={(e) => setAnswerFour(e.target.value)}
          placeholder="Answer Choice 4"
          className="border"
        />

        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="border"
          placeholder="Correct Answer"
        />

        <button
          type="submit"
          onClick={() => {
            mutate({
              question,
              answer: correctAnswer,
              learningTargetId: learningTarget,
              answerOne,
              answerTwo,
              answerThree,
              answerFour,
            });
          }}
        >
          Create Question
        </button>
      </form>
    </>
  );
};

export default Questions;
