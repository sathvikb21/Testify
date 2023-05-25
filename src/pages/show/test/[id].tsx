import { useRouter } from "next/router";
import { type ChangeEvent, useState } from "react";
import { api } from "~/utils/api";

const Tests = () => {
  const router = useRouter();
  const testId = router.query.id as string;

  const test = api.sectionTest.getTestbyId.useQuery(
    { testId },
    { enabled: !!testId }
  );

  const numberOfQuestions = api.test.getNumberOfQuestions.useQuery(
    { testId },
    { enabled: !!testId }
  ).data;

  const questions = test.data?.test.quesions;

  const [answeredQuestions, setAnsweredQuestions] = useState<
    {
      qNum: number;
      answer: string;
    }[]
  >([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const answer = event.target.value;
    setAnsweredQuestions((prevAnsweredQuestions) => {
      const updatedAnsweredQuestions = [...prevAnsweredQuestions];
      updatedAnsweredQuestions[currentQuestion] = {
        qNum: currentQuestion,
        answer: answer,
      };
      return updatedAnsweredQuestions;
    });
  };

  const nextQuestion = () => {
    if (currentQuestion === numberOfQuestions) {
      console.log("done");
      return currentQuestion - 1;
    }
    setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
  };

  return (
    <div>
      <h1>Tests</h1>

      <form action="">
        {questions?.map((question, index) => (
          <>
            {index === currentQuestion && (
              <div key={question.id}>
                <h1>
                  {currentQuestion + 1}. {question.question}
                </h1>
                {question.answerChoices.map((answer) => (
                  <label htmlFor="" key={answer.id} className="ml-3">
                    <input
                      type="radio"
                      value={answer.answer}
                      checked={
                        answeredQuestions[currentQuestion]?.answer ===
                        answer.answer
                      }
                      onChange={handleAnswerSelect}
                    />
                    {answer.answer}
                  </label>
                ))}
              </div>
            )}
          </>
        ))}

        {currentQuestion === numberOfQuestions ? (
          <button
            onClick={() => {
              nextQuestion();
            }}
          >
            Next
          </button>
        ) : (
          <>
            {numberOfQuestions}
            <a
              onClick={() => {
                nextQuestion();
              }}
            >
              Next
            </a>
          </>
        )}
      </form>
    </div>
  );
};

export default Tests;
