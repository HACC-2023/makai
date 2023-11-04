import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const orgMemberTableDummyData = [
  {
    _id: "1",
    member: "James Grade",
    email: "james@hotmail",
    role: "User",
  },
  {
    _id: "2",
    member: "Giorgio Tran",
    email: "tran@hotmail",
    role: "User",
  },
  {
    _id: "3",
    member: "Ana Araujo",
    email: "ana@hotmail",
    role: "Admin",
  },
];

const OrgMemberTable = () => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // modal to delete a member
  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // add later
    setDeleteModalOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div className="overflow-x-auto bg-white">
      <table className="table bg-white text-gray-600">
        <thead>
          <tr className="text-gray-600">
            <td></td>
            <th>
              <h6 className="text-lg font-semibold text-gray-600">Member</h6>
            </th>
            <td>
              <h6 className="text-lg font-semibold text-gray-600">Email</h6>
            </td>
            <td>
              <h6 className="text-lg font-semibold text-gray-600">Role</h6>
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {orgMemberTableDummyData.map((data) => (
            <tr key={data._id}>
              <td>
                {" "}
                <img
                  class="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </td>
              <th>{data.member}</th>
              <td>{data.email}</td>
              <td>
                <span className="inline-block pr-1">{data.role}</span>
                <PencilIcon className="w-4 h-4 text-blue-600 inline-block" />
              </td>
              <td>
                <TrashIcon
                  className="w-5 h-5 text-red-500 cursor-pointer"
                  onClick={handleDeleteClick}
                />
                {isDeleteModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                      className="fixed inset-0 bg-gray-500 bg-opacity-50"
                      onClick={handleCancelDelete}
                    ></div>
                    <div className="relative p-8 bg-white w-full max-w-lg rounded-lg shadow-lg">
                      <p>Are you sure you want to delete?</p>
                      <div className="mt-4 flex justify-end">
                        <button
                          className="text-white bg-red-600 hover:bg-red-500 rounded-md px-3 py-2 text-sm font-semibold shadow-sm"
                          onClick={handleConfirmDelete}
                        >
                          Yes
                        </button>
                        <button
                          className="ml-3 text-gray-900 bg-white hover:bg-blue-100 rounded-md px-3 py-2 text-sm font-semibold shadow-sm"
                          onClick={handleCancelDelete}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrgMemberTable;
