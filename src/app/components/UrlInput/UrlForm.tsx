"use client";

import createNewUrl from "@/lib/actions/createNewUrl";
import styles from "./UrlForm.module.scss";
import { useActionState } from "react";

const UrlForm = () => {
  const [state, formAction, pending] = useActionState(createNewUrl, null);

  console.log(state);

  return (
    <form action={formAction} className={styles.input_container}>
      <input className={styles.input} name="url" placeholder="http://" />
      <button className={styles.button} type="submit" disabled={pending}>
        Shorten!
      </button>
      <p>{state?.message}</p>
      <p>{state?.errors}</p>
    </form>
  );
};

export default UrlForm;
