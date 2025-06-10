import { useState } from "react";
import { useForm } from "react-hook-form";

interface formData {
  id: number;
  name: string;
  city: string;
}

const Contact = () => {
  const [editId, setEditId] = useState<number | null>(null);
  const [cardArray, setCardArray] = useState<formData[]>([]);

  const {
    register: registerAdd,
    handleSubmit: handleSUbmitAdd,
    reset: resetAdd,
  } = useForm<formData>();
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setEditValue,
  } = useForm<formData>();

  const submitHandler = (data: formData) => {
    const newArray = {
      ...data,
      id: Date.now(),
    };
    setCardArray((prev) => [...prev, newArray]);
    resetAdd();
  };

  const editFunc = (data: formData) => {
    setCardArray((prev) =>
      prev.map((item) => {
        return item.id === editId ? { ...item, ...data } : item;
      })
    );
    setEditId(null);
    resetEdit();
  };

  const handleEdit = (data: formData) => {
    setEditId(data.id);
    setEditValue("name", data.name);
    setEditValue("city", data.city);
  };

  const handleDelete = (data: formData) => {
    setCardArray((prev) => prev.filter((item) => data.id !== item.id));
  };

  const handleCancel = () => {
    setCardArray((prev) => {
      return prev.map((item) => item);
    });
  };

  return (
    <div className="contact-form-container">
      <div className="contact">
        <div className="heading">
          <h1>Contact Book</h1>
          <p>Keep track of where your friend lives</p>
        </div>
        <form
          action=""
          className="contact-form"
          onSubmit={handleSUbmitAdd(submitHandler)}
        >
          <div className="form-input">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" {...registerAdd("name")} required />
          </div>
          <div className="form-input">
            <label htmlFor="city">City</label>
            <input type="text" id="city" {...registerAdd("city")} required />
          </div>
          <button className="submit-btn">Add Contact</button>
        </form>
        <div className="contact-cards">
          {cardArray.map((data) => (
            <div className="contact-card" key={data.id}>
              {editId === data.id ? (
                <form
                  action=""
                  className="edit-form"
                  onSubmit={handleSubmitEdit(editFunc)}
                >
                  <div className="form-input">
                    <label htmlFor="name">Name:</label>
                    <input {...registerEdit("name")} required id="name" />
                  </div>
                  <div className="form-input">
                    <label htmlFor="city">City:</label>
                    <input {...registerEdit("city")} required id="city" />
                  </div>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(data)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn cancel-btn"
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                  <button className="btn save-btn" type="submit">
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <h2>{data.name}</h2>
                  <p>{data.city}</p>
                  <button
                    className="edit-btn"
                    value={data.id}
                    onClick={() => handleEdit(data)}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
