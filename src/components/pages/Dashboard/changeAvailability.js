const changeAvailability = (classId) => {
  fetch(
    `${import.meta.env.VITE_SERVER_URL}/updateSeatAndAvailableClass/${classId}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((result) => console.log(result));
};

export default changeAvailability;
