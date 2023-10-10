import axios from "axios";
const url = "http://localhost:3001/api";

const createToken = async () => {
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return payloadHeader;
};

export const getGlucoseEntries = async () => {
  const header = await createToken();

  try {
    const res = await axios.get(url, header);
    console.log(res);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
