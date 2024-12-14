import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./App.scss";

type TData = {
  card_id: string;
  name: string;
  dob: string;
  address: string;
  home: string;
};

const App: React.FC = () => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>();

  const { register, setValue, reset } = useForm<TData>();

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Preview ảnh
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Tạo FormData và gọi API
      try {
        setLoading(true);
        reset();
        const formData = new FormData();
        formData.append("image", file, file.name);

        const response = await axios.post("http://116.104.73.112:10004/ocr/v1.0/gttt_extractor", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Response:", response.data);
        if (response.data.data) {
          setValue("name", response.data.data.name.replace(/\f/g, ""));
          setValue("card_id", response.data.data.card_id.replace(/\f/g, ""));
          setValue("dob", response.data.data.dob.replace(/\f/g, ""));
          setValue("address", response.data.data.address.replace(/\f/g, ""));
          setValue("home", response.data.data.home.replace(/\f/g, ""));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setLoading(false);
      }
    }
  };

  return (
    <main className="flex justify-center w-full min-h-screen lg:items-center">
      <div className="container px-4 py-6 lg:px-0 lg:py-0">
        <h1 className="mb-5 text-xl font-bold">Extract your citizen/passport information</h1>
        <div className="flex flex-col justify-between w-full gap-5 rounded-lg content lg:flex-row">
          <div className="content-left">
            <div className="w-full card front-card lg:w-[400px]">
              <img src={frontImage || ""} alt="Front" className={`${frontImage && "block"}`} />
              <input
                type="file"
                id="frontImageUpload"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, setFrontImage)}
              />
              <label htmlFor="frontImageUpload" className="upload-btn">
                <FiUpload size={24} />
              </label>
            </div>
          </div>

          <div className="relative flex-1 p-4 pb-10 rounded-lg shadow-md content-right">
            <div
              className={`${
                !loading && "hidden"
              } fixed inset-0 flex items-center bg-opacity-25 justify-center bg-black overlay z-30`}
            >
              <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <form className="grid grid-cols-1 gap-5 field-group md:grid-cols-2 xl:grid-cols-3">
              <div className="field">
                <label htmlFor="fullName">Fullname</label>
                <input type="text" id="fullName" placeholder="" disabled {...register("name")} />
              </div>
              <div className="field">
                <label htmlFor="idCard">Citizen number</label>
                <input type="text" id="idCard" placeholder="" disabled {...register("card_id")} />
              </div>
              <div className="field">
                <label htmlFor="dateOfBirth">Date of birth</label>
                <input type="text" id="dateOfBirth" placeholder="" disabled {...register("dob")} />
              </div>
              <div className="field">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="" disabled {...register("address")} />
              </div>
              <div className="field">
                <label htmlFor="home">Home</label>
                <input type="text" id="home" placeholder="" disabled {...register("home")} />
              </div>
              {/* <div className="field">
                <label htmlFor="origin">Place of origin</label>
                <input type="text" id="origin" placeholder="" disabled />
              </div>
              <div className="field">
                <label htmlFor="residence">Place of residence</label>
                <input type="text" id="residence" placeholder="" disabled />
              </div>
              <div className="field">
                <label htmlFor="issuance">Issuance</label>
                <input type="text" id="issuance " placeholder="" disabled />
              </div>
              <div className="field">
                <label htmlFor="expired">Expired</label>
                <input type="text" id="expired" placeholder="" disabled />
              </div>
              <div className="field">
                <label htmlFor="provider">Provider</label>
                <input type="text" id="provider" placeholder="" disabled />
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
