import React, { Fragment, useState } from "react";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import "../App.scss";

type TData = {
  type: string;
  state: string;
  passportNo: string;
  surname: string;
  givenNames: string;
  nameInLao: string;
  nationality: string;
  dateOfBirth: string;
  authority: string;
  dateOfIssue: string;
  dateOfExpired: string;
  mrzCode: string;
};

const PassportPage: React.FC = () => {
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
          setValue("type", response.data.data.type.replace(/\f/g, ""));
          setValue("state", response.data.data.state.replace(/\f/g, ""));
          setValue("passportNo", response.data.data.passportNo.replace(/\f/g, ""));
          setValue("surname", response.data.data.surname.replace(/\f/g, ""));
          setValue("givenNames", response.data.data.givenNames.replace(/\f/g, ""));
          setValue("nameInLao", response.data.data.nameInLao.replace(/\f/g, ""));
          setValue("nationality", response.data.data.nationality.replace(/\f/g, ""));
          setValue("dateOfBirth", response.data.data.dateOfBirth.replace(/\f/g, ""));
          setValue("authority", response.data.data.authority.replace(/\f/g, ""));
          setValue("dateOfIssue", response.data.data.dateOfIssue.replace(/\f/g, ""));
          setValue("dateOfExpired", response.data.data.dateOfExpired.replace(/\f/g, ""));
          setValue("mrzCode", response.data.data.mrzCode.replace(/\f/g, ""));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setLoading(false);
      }
    }
  };

  return (
    <Fragment>
      <header className="flex items-center justify-center w-full h-16 bg-white lg:h-20">
        <nav className="flex items-center justify-center gap-5 text-center">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
            New ID card
          </NavLink>
          <NavLink to="/passport" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Passport
          </NavLink>
          <NavLink to="/old" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Old ID card
          </NavLink>
        </nav>
      </header>
      <main className="flex justify-center w-full lg:items-center content">
        <div className="container px-4 py-6 lg:px-0 lg:py-0">
          <h1 className="mb-5 text-xl font-bold">Extract your passport information</h1>
          <div className="flex flex-col justify-between w-full gap-5 rounded-lg lg:flex-row">
            <div className="content-left">
              <div className="w-full card passport lg:w-[400px]">
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

            <div className="relative flex-1 content-right">
              <div
                className={`${
                  !loading && "hidden"
                } fixed inset-0 flex items-center bg-opacity-25 justify-center bg-black overlay z-30`}
              >
                <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <form className="grid grid-cols-1 gap-5 p-4 pb-10 bg-white rounded-lg shadow-md field-group md:grid-cols-2 xl:grid-cols-3">
                <div className="field">
                  <label htmlFor="type">Type</label>
                  <input type="text" id="type" placeholder="" disabled {...register("type")} />
                </div>
                <div className="field">
                  <label htmlFor="state">Code of Issuing State</label>
                  <input type="text" id="state" placeholder="" disabled {...register("state")} />
                </div>
                <div className="field">
                  <label htmlFor="passportNo">Passport No</label>
                  <input type="text" id="passportNo" placeholder="" disabled {...register("passportNo")} />
                </div>
                <div className="field">
                  <label htmlFor="surname">Surname</label>
                  <input type="text" id="surname" placeholder="" disabled {...register("surname")} />
                </div>
                <div className="field">
                  <label htmlFor="givenNames">Given names</label>
                  <input type="text" id="givenNames" placeholder="" disabled {...register("givenNames")} />
                </div>
                <div className="field">
                  <label htmlFor="nameInLao">Name in Lao</label>
                  <input type="text" id="nameInLao" placeholder="" disabled {...register("nameInLao")} />
                </div>
                <div className="field">
                  <label htmlFor="nationality">Nationality</label>
                  <input type="text" id="nationality" placeholder="" disabled {...register("nationality")} />
                </div>
                <div className="field">
                  <label htmlFor="dateOfBirth">Date of birth</label>
                  <input type="text" id="dateOfBirth" placeholder="" disabled {...register("dateOfBirth")} />
                </div>
                <div className="field">
                  <label htmlFor="authority">Authority</label>
                  <input type="text" id="dateOfBirth" placeholder="" disabled {...register("authority")} />
                </div>
                <div className="field">
                  <label htmlFor="dateOfIssue">Date of issue</label>
                  <input type="text" id="dateOfIssue" placeholder="" disabled {...register("dateOfIssue")} />
                </div>
                <div className="field">
                  <label htmlFor="dateOfExpired">Date of expiry</label>
                  <input type="text" id="dateOfExpired" placeholder="" disabled {...register("dateOfExpired")} />
                </div>
                <div className="field">
                  <label htmlFor="mrzCode">MRZ code</label>
                  <input type="text" id="mrzCode" placeholder="" disabled {...register("mrzCode")} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default PassportPage;
