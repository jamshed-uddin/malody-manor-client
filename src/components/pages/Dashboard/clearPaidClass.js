const clearPaidClass = (classId) => {
  fetch(`${import.meta.env.VITE_SERVER_URL}/removeSelectedClass/${classId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
};

export default clearPaidClass;
