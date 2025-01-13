import React, { Fragment, useState } from "react";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
// import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import "../App.scss";

type TData = {
  dob: string;
  name: string;
  nation: string;
  nationality: string;
  relationship: string;
  religion: string;
};

const PassportPage: React.FC = () => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [bookFamily, setBookFamily] = useState<TData[] | null>(null);
  const [loading, setLoading] = useState<boolean>();

  // const { register, setValue, reset } = useForm<TData>();

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
        // reset();
        setBookFamily([]);
        const formData = new FormData();
        formData.append("image", file, file.name);

        const response = await axios.post("http://116.99.48.48:10004/ocr/v1.0/family-book-extractor", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Response:", response.data.data);
        if (response.data.data) {
          setBookFamily(response.data.data);
        }
        // if (response.data.data) {
        //   setValue("sex", response.data.data.sex.replace(/\f/g, ""));
        //   setValue("placeOfBirth", response.data.data.place_of_birth.replace(/\f/g, ""));
        //   setValue("passportNo", response.data.data.passport_id.replace(/\f/g, ""));
        //   setValue("surname", response.data.data.surname.replace(/\f/g, ""));
        //   setValue("givenNames", response.data.data.given_name.replace(/\f/g, ""));
        //   setValue("nameInLao", response.data.data.name_in_lao.replace(/\f/g, ""));
        //   setValue("nationality", response.data.data.nationality.replace(/\f/g, ""));
        //   setValue("dateOfBirth", response.data.data.dob.replace(/\f/g, ""));
        //   setValue("authority", response.data.data.authority.replace(/\f/g, ""));
        //   setValue("dateOfIssue", response.data.data.date_of_issue.replace(/\f/g, ""));
        //   setValue("dateOfExpired", response.data.data.date_of_expiry.replace(/\f/g, ""));
        //   // setValue("mrzCode", response.data.data.mrzCode.replace(/\f/g, ""));
        // }
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
        <nav className="flex items-center justify-center gap-3 text-center lg:gap-5">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
            New ID card
          </NavLink>
          <NavLink to="/passport" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Passport
          </NavLink>
          <NavLink to="/old-citizen" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Old ID card
          </NavLink>
          <NavLink to="/family-book" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Family book
          </NavLink>
        </nav>
      </header>
      <main className="flex justify-center w-full lg:items-center content">
        <div className="container px-4 py-6 lg:px-0 lg:py-0">
          <h1 className="mb-5 text-xl font-bold">Extract your family book information</h1>
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
              <form className="grid grid-cols-1 gap-5">
                {bookFamily?.map((item: TData, index: number) => {
                  return (
                    <div
                      className="grid grid-cols-1 gap-5 p-4 pb-10 bg-white rounded-lg shadow-md field-group md:grid-cols-2 xl:grid-cols-3"
                      key={index}
                    >
                      <div className="field">
                        <label htmlFor="surname">Surname</label>
                        <input type="text" id="surname" placeholder="" disabled value={item.name} />
                      </div>
                      <div className="field">
                        <label htmlFor="givenNames">Given names</label>
                        <input type="text" id="givenNames" placeholder="" disabled value={item.dob} />
                      </div>
                      <div className="field">
                        <label htmlFor="nameInLao">Name in Lao</label>
                        <input type="text" id="nameInLao" placeholder="" disabled value={item.nation} />
                      </div>
                      <div className="field">
                        <label htmlFor="sex">Sex</label>
                        <input type="text" id="sex" placeholder="" disabled value={item.nationality} />
                      </div>
                      <div className="field">
                        <label htmlFor="placeOfBirth">Place of birth</label>
                        <input type="text" id="placeOfBirth" placeholder="" disabled value={item.relationship} />
                      </div>
                      <div className="field">
                        <label htmlFor="placeOfBirth">Place of birth</label>
                        <input type="text" id="placeOfBirth" placeholder="" disabled value={item.religion} />
                      </div>
                    </div>
                  );
                })}
                {/* <div className="field">
                  <label htmlFor="mrzCode">MRZ code</label>
                  <input type="text" id="mrzCode" placeholder="" disabled {...register("mrzCode")} />
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default PassportPage;
