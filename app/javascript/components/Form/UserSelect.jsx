import React, { useEffect } from "react";
import usersApi from "../../apis/user";
import { useQuery } from "@tanstack/react-query";

const UserSelect = props => {
  const { selectedUser, setSelectedUser } = props;
  const { isPending, error, data } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => usersApi.fetch().then(res => res.data),
  });

  useEffect(() => {
    if (!selectedUser && data?.users?.length > 0) {
      setSelectedUser(data?.users?.[0]?.id);
    }
  }, [selectedUser, data, setSelectedUser]);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <select
      value={selectedUser ?? data?.users?.[0]?.id}
      onChange={e => setSelectedUser(e.target.value)}
    >
      <option value="" disabled>
        Select a user
      </option>
      {data.users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};

export default UserSelect;
