import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Tests = () => {
  const router = useRouter();
  const testId = router.query.id as string;

  const test = api.sectionTest.getTestbyId.useQuery({ testId });

  return (
    <div>
      <h1>Tests</h1>

      {/* {console.log(test.data)} */}

      {/* {test.data?.learningTargets.map((learningTarget) => (
        <div key={learningTarget.id}>
          <h2>{learningTarget.name}</h2>
          <ul>
            {learningTarget?.questions.map((question) => (
              <li key={question.id}>
                <h3>{question.question}</h3>
              </li>
            ))}
          </ul>
        </div>
      ))} */}

      {test.data?.test.learningTargets.map((learningTarget) => (
        <div key={learningTarget.id}>
          <h3>{learningTarget.name}</h3>
          <ul>
            {learningTarget.questions?.map((question) => (
              <li key={question.id}>
                <h4>{question.question}</h4>
                <h1>{question.answer}</h1>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Tests;
