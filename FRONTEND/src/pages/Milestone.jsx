import { useState } from "react";

const Milestone = ({ campaignId, addMilestone }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amountSpent, setAmountSpent] = useState("");
  const [status, setStatus] = useState("In Progress");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const milestoneData = { campaignId, title, description, amountSpent, status, imageUrl };
    addMilestone(milestoneData); // call a function to save this milestone to the backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Milestone Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Milestone Description"
        required
      />
      <input
        type="number"
        value={amountSpent}
        onChange={(e) => setAmountSpent(e.target.value)}
        placeholder="Amount Spent"
        required
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL (optional)"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Add Milestone</button>
    </form>
  );
};
export default Milestone;