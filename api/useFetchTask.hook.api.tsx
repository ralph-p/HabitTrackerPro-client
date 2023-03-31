import { useEffect, useState } from "react";

const useFetchTask = (taskId) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/task?task_id=${taskId}`)
      .then((res) => res.json())
      .then((data) => {
        seterror(data.error)
        setdata(data.joke)
        setloading(false)
      })
  }, [taskId]);

  return { data, loading, error };
};

export default useFetchTask;