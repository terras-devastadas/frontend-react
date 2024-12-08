import React, { ChangeEvent, useState } from "react";
import "./CustomProfile.css"; // Importa o arquivo CSS específico do componente

type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
  onUpdateAvatar?: (file: File) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

const Profile: React.FC<UserProfile> = ({
  name,
  email,
  bio,
  avatarUrl,
  onUpdateProfile,
  onUpdateAvatar,
}) => {
  const [editableProfile, setEditableProfile] = useState({
    name,
    bio,
    avatarUrl,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditableProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] & onUpdateAvatar) {
      onUpdateAvatar(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onUpdateProfile(editableProfile);
  };

  return (
    <div className="profile-container">
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="profile-avatar"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        className="profile-avatar-upload"
      />
      <input
        type="text"
        name="name"
        value={editableProfile.name}
        onChange={handleChange}
        className="profile-input"
      />
      <textarea
        name="bio"
        value={editableProfile.bio}
        onChange={handleChange}
        className="profile-input"
      />
      <Button label="Salvar" onClick={handleSubmit} className="btn-save" />
      <h1 className="profile-name">{name}</h1>
      <p className="profile-email">{email}</p>
      <p className="profile-bio">{bio}</p>
    </div>
  );
};

export { Button, Profile };
