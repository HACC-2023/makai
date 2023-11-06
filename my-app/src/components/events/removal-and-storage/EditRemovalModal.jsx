import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { convertDateToLocalFormat, convertLocalDateToUTC } from "@/utils/dateConverter";

const EditRemovalModal = ({ id, event }) => {
  // console.log(event.removalStartDate);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      debrisSize: event.debrisSize,
      debrisMass: event.debrisMass,
      tempStorage: event.tempStorage,
      removalStartDate: convertDateToLocalFormat(event.removalStartDate),
      removalEndDate: convertDateToLocalFormat(event.removalEndDate),
      assessedEnvDamage: event.assessedEnvDamage,
    },
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (status && (status.msg === "success" || status.msg === "error")) {
      setTimeout(() => {
        setStatus(null);
        console.log("status reset");
      }, 3000);
    }
  }, [status]);

  // TODO: need to update this function once the APIs are ready
  async function editEvent(org) {
    try {
      setStatus({ msg: "loading", body: "Adding organization..." });
      const res = await fetch("/api/mongo/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: org.name,
          location: org.location,
        }),
      });

      if (res.status === 200) {
        setStatus({
          msg: "success",
          body: "Successfully edited event ✅",
        });
        reset();
        console.log("Successfully edited event");
      } else {
        throw new Error("Failed to edit event.");
      }
    } catch (err) {
      setStatus({
        msg: "error",
        body: " Failed to edit event ❌",
      });
    } finally {
      setTimeout(() => {
        setStatus(null);
        console.log("status reset");
      }, 3000);
    }
  }

  function onSubmit(data) {
    console.log(data);
    console.log("event removal start date", event.removalStartDate);
    console.log("event removal start date converted", convertLocalDateToUTC(data.removalStartDate));
    // editEvent(data);
  }

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="pb-5 font-bold">EDIT EVENT</h3>
        {event ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Debris Size</span>
              </label>
              <input
                {...register("debrisSize")}
                type="number"
                placeholder="Enter debris size"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Debris Mass</span>
              </label>
              <input
                {...register("debrisMass")}
                type="number"
                placeholder="Enter debris mass"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Environmental Damage</span>
              </label>
              <textarea
                {...register("assessedEnvDamage")}
                placeholder="Enter environmental damage"
                className="textarea textarea-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Removal Start Date</span>
              </label>
              <input
                {...register("removalStartDate", { valueAsDate: true })}
                type="date"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Removal End Date</span>
              </label>
              <input
                {...register("removalEndDate", { valueAsDate: true })}
                min={convertDateToLocalFormat(event.removalStartDate)}
                type="date"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Temporary Storage Location</span>
              </label>
              <select
                {...register("location")}
                className="select select-bordered"
              >
                <option disabled>Choose your location</option>
                <option>CMDR Hub</option>
                <option>Maui Node</option>
                <option>Big Island Node</option>
                <option>Kauai Node</option>
              </select>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => document.getElementById(id).close()}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div>Loading...</div>
        )}
        {status && status.msg === "success" && <div>{status.body}</div>}
        {status && status.msg === "error" && <div>{status.body}</div>}
        {status && status.msg === "loading" && (
          <div className="flex items-center gap-2">
            <span className="loading loading-spinner" />
            {status.body}
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default EditRemovalModal;

EditRemovalModal.propTypes = {
  id: PropTypes.string.isRequired,
};