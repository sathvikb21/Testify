import Navbar from "~/components/Navbar";
import { api } from "~/utils/api";

const Profile = () => {
  const UserInfo = api.user.getUser.useQuery();
  const user = UserInfo.data;

  return (
    <>
      <Navbar />

      <div>
        <h1>Profile</h1>
        <h1>Name: {user?.name}</h1>
        <h1>Email: {user?.email}</h1>
        <h1>Role: {user?.UserType}</h1>

        {user?.UserType === "Student" ? (
          <h1>
            Classes Taking:{" "}
            {user?.courses.map((course) => (
              <>
                {" "}
                <div>
                  <h1>{course.name}</h1>
                  <h1>Course Teacher: {course.teacher.name}</h1>
                </div>
              </>
            ))}
          </h1>
        ) : (
          <h1>
            Class Teaching:{" "}
            {user?.courses.map((course) => (
              <>
                <ul>
                  <li>{course.name}</li>
                </ul>
              </>
            ))}
          </h1>
        )}
      </div>
    </>
  );
};

export default Profile;
