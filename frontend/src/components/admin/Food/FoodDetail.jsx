import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash, Pencil } from "lucide-react"
import { toast } from "sonner";
import foodApi from "@/apis/foodApi";
import { useNavigate } from "react-router-dom";
export default function FoodDetail(props) {
    const navigate=useNavigate()
    const[food,setFood]= useState(props.food)
    const[types,setTypes]=useState(props.types)
    const [isEdit, setIsEdit] = React.useState(false)
    const [name, setName] = React.useState(food.name);
    const [price, setPrice] = React.useState(food.price);
    const [typeSelected, setTypeSelected] = React.useState(food.foodType.typeId);
    const [description, setDesciption] = React.useState(food.description);
    const [image1, setImage1] = React.useState(food.image1);
    const [image2, setImage2] = React.useState(food.image2);
    const [image3, setImage3] = React.useState(food.image3);
    const [itemLeft, setItemLeft] = React.useState(food.itemleft)
    const resetData=()=>{
        setName(food.name);
        setPrice(food.price);
        setDesciption(food.description);
        setTypeSelected(food.foodType.typeId);
        setImage1(food.image1);
        setImage2(food.image2);
        setImage3(food.image3)
        setItemLeft(food.itemleft)
    }
    const updateData=()=>{
        food.name=name;
        food.price=price;
        food.image1=image1;
        food.image2=image2;
        food.image3=image3;
        food.description=description;
        food.typeId=typeSelected;
        food.itemleft=itemLeft;
    }
    const updateFood=async()=>{
        console.log(name)
        if(name==food.name && price==food.price && image1==food.image1 && image2==food.image2 && image3==food.image3
            && description==food.description && typeSelected==food.foodType.typeId && itemLeft==food.itemleft)
            {
               
                toast.info("No change information", {
                    cancel: {
                      label: "Close",
                    },
                  })
            }
            else{
                const response= await foodApi.updateFood({FoodId:food.foodId,Name:name,Image1:image1,Image2:image2,Image3:image3,
                    Itemleft:itemLeft,Description:description,Price:price,TypeId:typeSelected})
                    if(response && response.status=='success')
                    {
                        updateData()
                        setIsEdit(false)
                        toast.success("Update successful", {
                            cancel: {
                              label: "Close",
                            },
                          })
                    }else{
                        toast.error("Error", {
                            cancel: {
                              label: "Close",
                            },
                          })
                    }
            }
    }
    const deleteFood=async()=>{
        
        const response=await foodApi.deleteFood(food.foodId);
        if(response && response.status=='success')
        {
        navigate("/admin/food")
            toast.success("Delete successful", {
                cancel: {
                  label: "Close",
                },
              })
        }else{
            toast.error("Error", {
                cancel: {
                  label: "Close",
                },
              })
        }

    }
    return (
        <div>
            <div className=" gap-9  bg-white  border border-stroke rounded-lg shadow-lg ">
                <div className="border-b border-stroke py-3 px-6.5 flex items-center justify-center">
                    <h3 className="font-semibold text-xl text-center">
                        <span className="text-red-500 font-bold">{!isEdit?(""):("Edit ")}</span>
                       Deatail Food Id {food.foodId}
                    </h3>
                    <div className="ml-auto">
                        <Button
                            variant="ghost" className="p-2"
                            onClick={()=>{setIsEdit(!isEdit);resetData()}} >
                            <Pencil size={20} />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" className="p-2"><Trash size={20} /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        food and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={deleteFood} className="bg-red-500 hover:bg-red-400">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="flex flex-col gap-5.5 p-6.5 basis-3/6 mt-7">
                        <div>
                            <label >
                                Food Id
                            </label>
                            <input
                                type="text"
                                value={food.foodId}
                                disabled
                                placeholder="Default Input"
                                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label >
                                Food Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(a)=>setName(a.target.value)}
                                disabled={!isEdit}
                                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Type
                            </label>
                            <div className="relative z-20 bg-white dark:bg-form-input">
                                <select

                                    value={typeSelected}
                                    disabled={!isEdit}
                                    onChange={(e) => {
                                        setTypeSelected(e.target.value);
                                    }}
                                    className={`disabled:bg-whiter relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `} >
                                    <option value="" disabled className="text-gray-600 font-bold dark:text-bodydark">
                                        Select Type
                                    </option>
                                    {types.map((type) => {
                                        return (
                                            <option value={type.typeId} className="text-body dark:text-bodydark">
                                                {type.nameType}
                                            </option>
                                        )
                                    })}
                                </select>
                                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
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
                            <label >
                                In stock
                            </label>
                            <input
                                type="text"
                                onChange={(a)=>setItemLeft(a.target.value)}
                                value={itemLeft}
                                disabled={!isEdit}
                                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label >
                                Price
                            </label>
                            <input
                                type="text"
                                value={price}
                                onChange={(a)=>setPrice(a.target.value)}
                                disabled={!isEdit}
                                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div>
                            <label >
                                Rating
                            </label>
                            <input
                                type="text"
                                value={food.rating}
                                disabled
                                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label >
                                Number Rating
                            </label>
                            <input
                                type="text"
                                value={food.numberRating}
                                disabled
                                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-5.5 p-6.5 basis-3/6">
                        <div className="flex justify-between mt-0">
                            <div className="border-2 border-gray-300 rounded-lg p-1 w-1/4 items-center justify-center flex h-26">
                                <img src={image1} className="h-full w-auto rounded-lg " />
                            </div>
                            <div className="border-2 border-gray-300 rounded-lg p-1 w-1/4 items-center justify-center flex h-26">
                                <img src={image2} className="h-full w-auto rounded-lg " />
                            </div>
                            <div className="border-2 border-gray-300 rounded-lg p-1 w-1/4 items-center justify-center flex h-26">
                                <img src={image3} className="h-full w-auto rounded-lg" />
                            </div>
                        </div>

                        <div>
                            <label >
                                Image 1
                            </label>
                            <input
                                type="text"
                                value={image1}
                                onChange={(a)=>setImage1(a.target.value)}
                                disabled={!isEdit}
                                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label >
                                Image 2
                            </label>
                            <input
                                type="text"
                                value={image2}
                                onChange={(a)=>setImage2(a.target.value)}
                                disabled={!isEdit}
                                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div>
                            <label >
                                Image 3
                            </label>
                            <input
                                type="text"
                                value={image3}
                                onChange={(a)=>setImage3(a.target.value)}
                                disabled={!isEdit}
                                className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Description
                            </label>
                            <textarea
                                rows={6}
                                disabled={!isEdit}
                                placeholder="Default textarea"
                                onChange={(e)=>setDesciption(e.target.value)}
                                value={description}
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>


                    </div>

                </div>
                {!isEdit?(""):(
                    <div className="text-center  mb-4 mt-2">
                    <Button onClick={updateFood}  className="bg-blue-500 hover:bg-blue-400 active:scale-95 ease-in-out transition text-white font-bold mr-2" >Save</Button>
                    <Button onClick={()=>{setIsEdit(false);resetData()}} className="bg-red-500 hover:bg-red-400 active:scale-95 ease-in-out transition text-white font-bold ml-2">Cancel</Button>
                </div>
                )}
                
            </div>
        </div>
    )
}