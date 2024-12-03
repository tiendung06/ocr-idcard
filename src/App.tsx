import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import "./App.scss";

const App: React.FC = () => {
  const [frontImage, setFrontImage] = useState<string | null>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
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

          <div className="flex-1 p-4 pb-10 rounded-lg shadow-md content-right">
            <div className="grid grid-cols-1 gap-5 field-group md:grid-cols-2 xl:grid-cols-3">
              <div className="field">
                <label htmlFor="fullName">Fullname</label>
                <input type="text" id="fullName" placeholder="" disabled />
              </div>
              <div className="field">
                <label htmlFor="idCard">Citizen number</label>
                <input type="text" id="idCard" placeholder="" disabled />
              </div>
              <div className="field">
                <label htmlFor="dateOfBirth">Date of birth</label>
                <input type="text" id="dateOfBirth" placeholder="" disabled />
              </div>
              <div className="field">
                <label htmlFor="gender">Gender</label>
                <input type="text" id="gender" placeholder="" disabled />
              </div>
              <div className="field">
                <label htmlFor="nationality">Nationality</label>
                <input type="text" id="nationality" placeholder="" disabled />
              </div>
              <div className="field">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
