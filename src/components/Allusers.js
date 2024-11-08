"use client";

import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

const Allusers = () => {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/users");
      setusers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }, []);
  const updateUserStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/statususers/${id}`, {
        status,
      });
      fetchData();
    } catch (error) {
      console.error("Error updating user status", error);
    }
  };

  const Deleteusers = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error updating user status", error);
    }
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [fetchData]);

  if (loading) return <h1>loading........</h1>;

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-2xl font-semibold py-8 capitalize">All user list</h1>
      <div class="relative overflow-x-auto w-1/2">
        <table class="w-full text-sm text-left rtl:text-right text-gray-900 ">
          <thead class="text-xs text-gray-900 uppercase bg-gray-50   ">
            <tr>
              <th scope="col" class="px-6 py-3">
                Full Name
              </th>
              <th scope="col" class="px-6 py-3">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item) => (
              <tr class="bg-white border-b" key={item._id}>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap  "
                >
                  {item.firstName} {item.lastName}
                </th>
                <td class="px-6 py-4 flex gap-2">
                  <Link href={`/user/${item._id}`}>
                    <button className="text-xs bg-green-600 text-white rounded-md px-2 py-2">
                      Details
                    </button>
                  </Link>
                  {item.status === "active" ? (
                    <button
                      onClick={() => updateUserStatus(item._id, "blocked")}
                      className="text-xs bg-orange-400 text-white rounded-md px-2 py-2"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => updateUserStatus(item._id, "active")}
                      className="text-xs bg-green-600 text-white rounded-md px-2 py-2"
                    >
                      Unblock
                    </button>
                  )}
                  <button
                    onClick={() => Deleteusers(item._id)}
                    className="text-xs bg-red-600 text-white rounded-md px-2 py-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allusers;
