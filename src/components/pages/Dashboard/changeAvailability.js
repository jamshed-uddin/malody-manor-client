const changeAvailability = (classId) => {
  fetch(`http://localhost:3000/updateSeatAndAvailableClass/${classId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => console.log(result));
};

export default changeAvailability;
