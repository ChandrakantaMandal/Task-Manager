import React from "react";

const AvatarGroup = ({ users = [], avatars = [], maxVisible = 3 }) => {
  // Support both new users prop and legacy avatars prop
  const userData = users.length > 0 ? users : avatars.map((avatar, index) => ({
    profileImageUrl: avatar,
    name: `User ${index + 1}`
  }));

  const getInitials = (user, index) => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return String.fromCharCode(65 + (index % 26)); // Fallback to A, B, C
  };
  
  return (
    <div className="flex items-center">
      {userData.slice(0, maxVisible).map((user, index) => {
        const hasValidImage = user?.profileImageUrl && user.profileImageUrl.trim() !== '';
        
        return (
          <div key={user?._id || index} className="relative">
            {hasValidImage ? (
              <img
                src={user.profileImageUrl}
                alt={user?.name || `Avatar ${index}`}
                className="w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="w-9 h-9 flex items-center justify-center bg-slate-400 text-white text-sm rounded-full font-medium border-2 border-white -ml-3 first:ml-0" 
              style={{ display: hasValidImage ? 'none' : 'flex' }}
              title={user?.name || `User ${index + 1}`}
            >
              {getInitials(user, index)}
            </div>
          </div>
        );
      })}
      {userData.length > maxVisible && (
        <div className="w-9 h-9 flex items-center justify-center bg-blue-50 text-blue-600 text-sm rounded-full font-medium border-2 border-white -ml-3">
          +{userData.length - maxVisible}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
