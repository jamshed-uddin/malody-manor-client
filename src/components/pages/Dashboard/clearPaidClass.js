const clearPaidClass = (classId) => {
  fetch(`http://localhost:3000/removeSelectedClass/${classId}`, {
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
