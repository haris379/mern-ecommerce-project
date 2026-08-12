import React from "react";
import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-sm text-ink-soft hover:text-navy mb-4"
    >
      ← Back
    </button>
  );
};

export default BackButton;
