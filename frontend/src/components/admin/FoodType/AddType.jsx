import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import foodApi from "@/apis/foodApi"

import { toast } from "sonner"
export default function AddType(props) {
    const types = props.types
    const [name, setName] = React.useState("")
    const [selected, setSelected] = useState(0)
    const addType=async()=>{
        
       
        if(name)
        {
            const response= await foodApi.addFoodType({NameType:name,ParentId:selected})
            if(response)
            {
                
                if(response.status=='success')
                {
                    setName("")
                    setSelected(0)
                    props.setTypes((prev)=>[...prev, response.data])
                    toast.success("Successul", {
                        cancel: {
                          label: "Close",
                        },
                      })
                }else{
                    toast.error(response.message, {
                        cancel: {
                          label: "Close",
                        },
                      })
                }

              
            }else{
                toast.error("Error", {
                    cancel: {
                      label: "Close",
                    },
                  })
            }
        }
        }
       
    return (
        <div className=" w-full bg-white border shadow-md rounded-lg px-4 py-5">
            <div className="font-bold text-lg mb-6">Create a new food type</div>
            <div>
                <label >
                    Name Type
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(a) => setName(a.target.value)}
                    
                    className="w-full mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>
            <div className="mt-4">
                <label className="mb-3 block text-black dark:text-white">
                    Parent
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                    <select

                        value={selected}
                        
                        onChange={(e) => {
                            setSelected(e.target.value);
                        }}
                        className={`disabled:bg-whiter relative z-20 w-full appearance-none rounded-lg border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `} >
                        <option value="0" className="text-gray-600 font-bold dark:text-bodydark">
                            No parent
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
                        <ChevronDown color="gray" />
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-center mt-6">
            <Button onClick={addType} className="bg-blue-500 hover:bg-blue-400 active:scale-95 active:shadow-md transition ease-in-out 
            text-center font-bold text-white ">Create</Button>

            </div>
        </div>
    )
}