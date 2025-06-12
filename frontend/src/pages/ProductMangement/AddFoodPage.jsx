import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Default from "../../assets/defaultImage.png";
import foodApi from "@/apis/foodApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AddFoodPage() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [imageValid1, setImageValid1] = React.useState(false);
  const [imageValid2, setImageValid2] = React.useState(false);
  const [imageValid3, setImageValid3] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const [typeSelected, setTypeSelected] = React.useState("");
  const [description, setDesciption] = React.useState("");
  const [image1, setImage1] = React.useState("");
  const [image2, setImage2] = React.useState("");
  const [image3, setImage3] = React.useState("");
  const [itemLeft, setItemLeft] = React.useState(0);
  const [types, setTypes] = useState([]);
  async function loadData() {
    const response = await foodApi.getAllFoodTypes();
    if (response && response.status == "success") {
      setTypes(response.data);
    } else {
      toast.success("Error when fetching data", {
        cancel: {
          label: "Close",
        },
      });
      return;
    }
  }
  useEffect(() => {
    loadData();
  }, []);
  const addFood = async () => {
    if (!name || !description || !typeSelected) {
      toast.warning("Infomation invalid", {
        cancel: {
          label: "Close",
        },
      });
      return;
    }
    if (!imageValid1 || !imageValid2 || !imageValid3) {
      toast.warning("Url image invalid", {
        cancel: {
          label: "Close",
        },
      });
      return;
    }
    const response = await foodApi.addFood({ Name: name, Image1: image1, Image2: image2, Image3: image3, Itemleft: itemLeft, Description: description, Price: price, TypeId: typeSelected });
    if (response && response.status == "success") {
      toast.success("Successful", {
        cancel: {
          label: "Close",
        },
      });
      resetData();
      return;
    } else {
      toast.error("Error", {
        cancel: {
          label: "Close",
        },
      });
      return;
    }
  };
  const resetData = () => {
    setName("");
    setImageValid1(false);
    setImageValid2(false);
    setImageValid3(false);
    setPrice(0);
    setTypeSelected("");
    setDesciption("");
    setImage1("");
    setImage2("");
    setImage3("");
    setItemLeft(0);
  };
  return (
    <div>
      <div className=" gap-9  bg-white rounded-sm border border-stroke shadow-md ">
        <div className="border-b border-stroke py-3 px-6.5 flex ">
          <h3 className="font-semibold text-xl ">Add Food</h3>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col gap-5.5 p-6.5 basis-3/6 mt-[26px]">
            <div>
              <label>Food Name</label>
              <input
                type="text"
                value={name}
                onChange={(a) => setName(a.target.value)}
                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">Type</label>
              <div className="relative z-20 bg-white dark:bg-form-input">
                <select
                  value={typeSelected}
                  onChange={(e) => {
                    setTypeSelected(e.target.value);
                  }}
                  className={`disabled:bg-whiter relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
                >
                  <option value="" disabled className="text-gray-600 font-bold dark:text-bodydark">
                    Select Type
                  </option>
                  {types.map((type) => {
                    return (
                      <option value={type.typeId} className="text-body dark:text-bodydark">
                        {type.nameType}
                      </option>
                    );
                  })}
                </select>
                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill="#637381"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label>In stock</label>
              <input
                type="number"
                onChange={(a) => setItemLeft(a.target.value)}
                value={itemLeft}
                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(a) => setPrice(a.target.value)}
                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">Description</label>
              <textarea
                rows={6}
                placeholder="Default textarea"
                value={description}
                onChange={(a) => setDesciption(a.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col gap-5.5 p-6.5 basis-3/6">
            <div className="flex justify-between mt-0">
              <div className="border-2 border-gray-300 rounded-lg p-1 w-1/4 items-center justify-center flex h-26">
                <img
                  src={image1}
                  className="h-full w-auto rounded-lg "
                  onError={(e) => {
                    e.currentTarget.src = Default;
                    setImageValid1(false);
                  }}
                />
              </div>
              <div className="border-2 border-gray-300 rounded-lg p-1 w-1/4 items-center justify-center flex h-26">
                <img
                  src={image2}
                  className="h-full w-auto rounded-lg "
                  onError={(e) => {
                    e.currentTarget.src = Default;
                    setImageValid2(false);
                  }}
                />
              </div>
              <div className="border-2 border-gray-300 rounded-lg p-1 w-1/4 items-center justify-center flex h-26">
                <img
                  src={image3}
                  className="h-full w-auto rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = Default;
                    setImageValid3(false);
                  }}
                />
              </div>
            </div>

            <div>
              <label>Image 1</label>
              <input
                type="text"
                value={image1}
                onChange={(a) => {
                  setImage1(a.target.value);
                  setImageValid1(true);
                }}
                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label>Image 2</label>
              <input
                type="text"
                value={image2}
                onChange={(a) => {
                  setImage2(a.target.value);
                  setImageValid2(true);
                }}
                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label>Image 3</label>
              <input
                type="text"
                value={image3}
                onChange={(a) => {
                  setImage3(a.target.value);
                  setImageValid3(true);
                }}
                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="text-center  mb-4 mt-2">
          <Button onClick={addFood} className="bg-blue-500 hover:bg-blue-400 active:scale-95 ease-in-out transition text-white font-bold mr-2">
            Save
          </Button>
          {/* <Button  className="bg-red-500 hover:bg-red-400 active:scale-95 ease-in-out transition text-white font-bold ml-2">Cancel</Button> */}
        </div>
      </div>
    </div>
  );
}
