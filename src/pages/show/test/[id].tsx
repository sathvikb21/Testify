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

  const questions = test.data?.test.quesions;

  const numberOfQuestions = questions?.length;

  const [answeredQuestions, setAnsweredQuestions] = useState<
    {
      questionId: number;
      answer: string;
    }[]
  >([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const answer = event.target.value;
    setAnsweredQuestions((prevAnsweredQuestions) => {
      const updatedAnsweredQuestions = [...prevAnsweredQuestions];
      updatedAnsweredQuestions[currentQuestion] = {
        questionId: currentQuestion,
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
    console.log(numberOfQuestions);
    setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
  };

  const { mutate } = api.testResults.submitTest.useMutation();

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
              mutate({ testId, answers: answeredQuestions });
            }}
          >
            Next
          </button>
        ) : (
          <>
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
