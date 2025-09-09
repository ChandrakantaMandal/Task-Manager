import React from "react";

const UserCard = ({ userInfo, key }) => {
  return (
    <div className="user-card p-2">
      <div className="flex items-center justify-between   ">
        <div className="flex items-center gap-3">
          {userInfo.profileImageUrl && userInfo.profileImageUrl.trim() !== '' ? (
            <img
              src={userInfo.profileImageUrl}
              alt={userInfo.name}
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="w-12 h-12 flex items-center justify-center bg-slate-400 text-white font-medium text-lg rounded-full border-2 border-white"
            style={{ display: userInfo.profileImageUrl && userInfo.profileImageUrl.trim() !== '' ? 'none' : 'flex' }}
          >
            {userInfo.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="text-sm font-medium">{userInfo.name}</p>
            <p className="text-xs text-gray-500">{userInfo.email}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getBadgeColor = () => {
    switch (status) {
      case "Completed":
        return "bg-gray-50 text-cyan-500";

      case "In Progress":
        return "bg-gray-50 text-indigo-500";
      default:
        return "bg-gray-50 text-violet-500";
    }
  };
  return (
    <div className={`flex-1 text-[10px] font-medium px-4 py-0.5 rounded ${getBadgeColor()}`}>
     <span className="text-[12px] font-semibold">{count}</span><br />{label}
    </div>
  );
};
