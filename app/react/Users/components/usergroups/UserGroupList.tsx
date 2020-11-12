import React, { useState } from 'react';
import { UserGroupSchema } from 'shared/types/userGroupType';
import { Icon } from 'UI';

export interface UserGroupListProps {
  userGroups: UserGroupSchema[];
  handleSelect: (userGroup: UserGroupSchema) => void;
  handleAddGroup: () => void;
}

const UserGroupListComponent = ({
  userGroups,
  handleSelect,
  handleAddGroup,
}: UserGroupListProps) => {
  const [selectedId, setSelectedId] = useState();
  function selectRow(userGroup: UserGroupSchema) {
    setSelectedId(userGroup._id);
    handleSelect(userGroup);
  }
  return (
    <>
      <table className="group-list">
        <thead>
          <tr>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>
          {userGroups.map((userGroup: UserGroupSchema) => (
            <tr
              className={selectedId === userGroup._id ? 'selected' : ''}
              key={userGroup._id as string}
              onClick={() => selectRow(userGroup)}
            >
              <td>{userGroup.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="settings-footer">
        <button type="button" className="btn btn-success" onClick={() => handleAddGroup()}>
          <Icon icon="plus" />
          <span className="btn-label">Add group</span>
        </button>
      </div>
    </>
  );
};

export const UserGroupList = UserGroupListComponent;
