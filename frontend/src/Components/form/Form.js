import styles from "./Form.module.css";

function Form({ formType, updateData, data, submitForm }) {
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
          <label>
            <input type="checkbox" name="Technology" onChange={updateData} />
            Technology
          </label>

          <label>
            <input type="checkbox" name="Business" onChange={updateData} />
            Business
          </label>
        </div>
      ) : (
        <></>
      )}

      <input type="submit" value={formType} onClick={submitForm} />
    </form>
  );
}

export default Form;
