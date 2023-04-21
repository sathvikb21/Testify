const LearningTarget = () => {
  return (
    <form action="">
      <label htmlFor="title">
        Learning Target:
        <input type="text" name="title" id="title" />
      </label>
      <label htmlFor="desc">
        Instructions:
        <input type="textarea" name="desc" id="desc" />
      </label>
      <label htmlFor="type">Type:</label>
    </form>
  );
};

export default LearningTarget;
