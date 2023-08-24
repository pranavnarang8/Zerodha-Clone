import React from "react";
import "./ScripForm.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../features/dialogSlice";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { selectUser } from "../features/userSlice";

const ScripForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectUser);

  const onSubmit = (formData) => {
    console.log(formData);
    db.collection("scrips").add({
      stock: formData.stock,
      price: formData.price,
      percent: formData.percent,
      priceUp: formData.priceUp,
      green: formData.green,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.id,
    });
    dispatch(closeDialog());
  };
  return (
    <div className="scripForm">
      <h2>Add a Scrip</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="stock"
          placeholder="Stock"
          {...register("stock", { required: "Required" })}
        />
        {errors.stock && <p className="scripForm__error">Stock is Required</p>}
        <input
          type="text"
          name="price"
          placeholder="Price"
          {...register("price", { required: "Required" })}
        />
        {errors.price && <p className="scripForm__error">Price is Required</p>}
        <input
          type="text"
          name="percent"
          placeholder="Percent Up/down"
          {...register("percent", { required: "Required" })}
        />
        {errors.percent && (
          <p className="scripForm__error">Percent Up/Down is Required</p>
        )}
        <input
          type="text"
          name="priceUp"
          placeholder="Price Up/Down"
          {...register("priceUp", { required: "Required" })}
        />
        {errors.priceUp && (
          <p className="scripForm__error">Price Up/Down is Required</p>
        )}
        <input
          type="text"
          placeholder="green"
          name="green"
          {...register("green", { required: "Required" })}
        />
        {errors.green && (
          <p className="scripForm__error">Price Up/Down is Required</p>
        )}
        <div className="scripForm__buttons">
          <button type="submit">Add Scrip</button>
          <button type="submit" onClick={() => dispatch(closeDialog())}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScripForm;
