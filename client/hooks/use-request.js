import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [error, setErrors] = useState(null);

  const doRequest = async () => {
    console.table(body);
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul>
            {err.response.data.errors.map((e) => (
              <li key={e.message}>{e.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return [error, doRequest];
};
