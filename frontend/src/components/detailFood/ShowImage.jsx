import React from "react"
import { useState } from "react"
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const ShowImage = ({ listImage }) => {
  const [numImg, setNumImg] = useState(0);
  const handleThumbnailClick = (index) => {
    setNumImg(index); // Cập nhật ảnh lớn khi nhấn vào thumbnail
  };
  const listShow = listImage.slice(0, 4)
  return (
    <div className="w-full h-full px-[5%] flex-row text-center ">
      <div className="h-[70%] w-auto  mx-auto mt-2 inline-block mb-0">
        {listImage && listImage.length > 0 ? (
          <img className="h-full object-contain border-[1.5px] border-slate-300 " src={listImage[numImg]} alt="Image" />
        ) : (
          <p>Không có ảnh để hiển thị</p>
        )}
      </div>
      <ScrollArea className=" overflow-clip whitespace-nowrap pb-[5px] mt-1 pr-1">
   
    {listShow && listShow.length > 0 && listImage.map((image, index) => (
          <div
            key={index}
            className={` inline-block flex-shrink-0 cursor-pointer ml-2  ${index === numImg ? 'border-[3px] border-orange-300' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index}`}
              className="object-cover h-[95px] w-[100px] border-[1.5px] border-slate-300"
            />
          </div>
        ))}
  
       
   
      <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
     
    </div>
  )
}
export default ShowImage;