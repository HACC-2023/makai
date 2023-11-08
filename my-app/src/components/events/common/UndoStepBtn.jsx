const UndoStepBtn = ({ eventId, prevStatus }) => {
  async function editStatus() {
    try {
      const res = await fetch(`/api/mongo/event/get-event-by-id/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: prevStatus,
        }),
      });
      if (res.ok) {
        console.log("Moved to previous stage");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button className="btn btn-outline" onClick={editStatus}>
      Undo Step
    </button>
  );
};

export default UndoStepBtn;
