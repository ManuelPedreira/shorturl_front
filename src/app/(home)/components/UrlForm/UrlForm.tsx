"use client";

import createNewUrl from "@/lib/actions/createNewUrl";
import styles from "./UrlForm.module.scss";
import { useActionState, useEffect, useState } from "react";

const UrlForm = () => {
  const [state, formAction, pending] = useActionState(createNewUrl, null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (state?.errors) {
      setIsError(true);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className={styles.input_container}>
        <input
          className={`${styles.input} ${isError ? styles.inputError : ""}`}
          name="url"
          aria-label="short-url-input"
          placeholder="http://"
          onChange={() => setIsError(false)}
        />
        <button className={styles.button} type="submit" aria-label="submit-button" disabled={pending || isError}>
          {pending ? <span className={styles.spinner} /> : null}
          <span className={pending ? styles.buttonHideText : ""}>Shorten!</span>
        </button>
      </div>
      <div className={styles.error_container}>
        {isError && <p className={styles.error}>{state?.errors}</p>}
      </div>
    </form>
  );
};

export default UrlForm;
