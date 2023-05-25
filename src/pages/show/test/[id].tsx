import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { api } from "~/utils/api";

const Tests = () => {
  const router = useRouter();
  const testId = router.query.id as string;

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [value, setValue] = useState('female');

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSelectedAnswers((prevSelectedAnswers) => {
  //     const updatedAnswers = [...prevSelectedAnswers];
  //     updatedAnswers[questionNumber] = answerIndex;
  //     return updatedAnswers;
  //   });
  // };

  const questionNumber = 1;

  const test = api.sectionTest.getTestbyId.useQuery(
    { testId },
    { enabled: !!testId }
  );
  const questions = test.data?.test.learningTargets;

  return (
    <div>
      <h1>Tests</h1>

      <form action="">
        {questions?.map((learningTarget) => (
          <div key={learningTarget.id}>
            <h3>{learningTarget.name}</h3>
            {learningTarget.questions?.map((question) => (
              <div key={question.id}>
                <h4>{question.question}</h4>
                {question.answerChoices.map((choice) => (
                  <div key={choice.id}>
                    <label>
                      <input
                        type="radio"
                        name={`question_${questionNumber}`}
                        value={choice.id}
                        checked={selectedAnswers[question.id] === choice.id}
                        // onChange={() =>
                          // handleAnswerSelect(questionNumber, choice.id)
                        // }
                      />
                      {choice.answer}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </form>
    </div>
  );
};

export default Tests;
