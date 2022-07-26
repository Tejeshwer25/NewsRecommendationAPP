import styles from "./Form.module.css";

function Form({ formType, updateData, data, submitForm, topic }) {
  return (
    <form action={submitForm} className={styles.form}>
      {formType === "Register" ? (
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={data.name}
          onChange={updateData}
        />
      ) : (
        <></>
      )}

      <input
        type="email"
        placeholder="Enter email"
        name="email"
        value={data.email}
        onChange={updateData}
      />

      <input
        type="password"
        placeholder="Enter password"
        name="password"
        value={data.password}
        onChange={updateData}
      />

      {formType === "Register" ? (
        <div>
          <p>Choose Topics: </p>
          {topic.map((topic) => (
            <label>
              <input type="checkbox" name={topic} onChange={updateData} />
              {topic}
            </label>
          ))}
        </div>
      ) : (
        <></>
      )}

      <input type="submit" value={formType} onClick={submitForm} />
    </form>
  );
}

export default Form;
