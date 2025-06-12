import { Button, Form, Input } from 'antd'
import React from 'react'

const AboutUsPage = () => {
  return (
    <div className=' container mt-16'>
        {/* UpperPicture */}
      <div className="upperProfile px-8 py-8 rounded-xl">
          <div className="relative bg-cover bg-center h-[400px] bg-transparent  rounded-xl"
           style={{ backgroundImage: `url(https://www.venetianlasvegas.com/adobe/dynamicmedia/deliver/dm-aid--08bd4846-22b9-4c34-bef8-c5944eb8e4b0/dining-room-1-1920x1080.jpg?quality=65&preferwebp=true&width=1920` }}>
            <div className="middleTitle flex flex-col justify-center h-[400px]">
              <div className="title flex text-5xl text-white justify-center ">
                <p>-</p>
                <p className='font-blackChancery font-bold'> About Us </p>
                <p>-</p>
              </div>
              <div className="icon"></div>
            </div>
          </div>
      </div>
      <div className="content flex flex-col my-10 mx-40 gap-10">
        <div className="first flex flex-col lg:flex-row items-center justify-between p-6 rounded-lg ">
            <div className="text flex flex-col w-full lg:w-1/2 space-y-4 p-4">
                <div className="header">
                    <p className="text-4xl font-black font-blackChancery text-orange-500 text-center lg:text-left">
                        IT Basement Delicious Foods
                    </p>
                </div>
                <div className="sub-header text-xl font-bold text-center lg:text-left">
                    <p>Catering to Your Requirements</p>
                </div>
                <div className="text  text-sm">
                    <p className="text-gray-700">
                        At IT Basement, we believe that food is not just about sustenance; it's about creating experiences and memories. Our talented chefs combine fresh, high-quality ingredients with innovative culinary techniques to create dishes that are not only delicious but also beautifully presented.
                    </p>
                    <p className="mt-4 text-gray-700">
                        Whether you're planning a cozy family gathering, a corporate event, or a grand wedding celebration, we offer customizable catering options tailored to your specific needs. Our menu features a wide variety of cuisines, from traditional favorites to modern delights, ensuring that there is something for everyone to enjoy.
                    </p>
                    <p className="mt-4 text-gray-700">
                        Join us at IT Basement for an unforgettable dining experience, where every meal is a celebration of flavor. Discover our latest specials and let us cater your next event to perfection!
                    </p>
                </div>
            </div>
            <div className="img w-full lg:w-1/2 bg-cover bg-center h-[400px] rounded-xl shadow-lg"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D)` }}>
            </div>
        </div>

        <div className="second flex flex-col lg:flex-row items-center justify-between p-6 rounded-lg">
          <div className="img w-full lg:w-1/2 bg-cover bg-center h-[400px] rounded-xl shadow-lg"
                  style={{ backgroundImage: `url(https://goviettrip.com/uploaded/hanoi/le-beaulieu-restaurant.jpg` }}>
          </div>
          <div className="text flex flex-col w-full lg:w-1/2 space-y-4 p-4">
              <div className="header">
                  <p className="text-4xl font-black font-blackChancery text-orange-500 text-center lg:text-left">
                      Modern Design
                  </p>
              </div>
              <div className="sub-header text-xl font-bold text-center lg:text-left">
                  <p>Always Give You the Best Feel</p>
              </div>
              <div className="text text-sm">
                  <p className="text-gray-700">
                      At IT Basement, we believe that the dining experience goes beyond just great food; it encompasses a beautifully crafted environment. Our restaurant boasts a modern design that seamlessly blends elegance with comfort, creating the perfect backdrop for any occasion.
                  </p>
                  <p className="mt-4 text-gray-700">
                      From the moment you step inside, you’ll be greeted by a thoughtfully curated interior, featuring contemporary furnishings, soothing color palettes, and tasteful artwork that reflect our commitment to quality. Each element is designed to evoke a sense of warmth and sophistication, inviting you to relax and enjoy your meal.
                  </p>
                  <p className="mt-4 text-gray-700">
                      Whether you're enjoying a quiet dinner with loved ones or celebrating a special event, our modern design enhances your experience, making every moment memorable. Join us at IT Basement and immerse yourself in an atmosphere that elevates your dining journey to new heights.
                  </p>
              </div>
          </div>
        </div>
      </div>
      <div className="lowerPicture px-8 py-8 rounded-xl">
          <div className="relative bg-cover bg-center h-[400px] bg-transparent  rounded-xl"
           style={{ backgroundImage: `url(https://www.shutterstock.com/image-photo/table-food-top-view-260nw-467823860.jpg` }}>
            <div className="middleTitle flex flex-col justify-center h-[400px]">
              <div className="title flex text-5xl text-white justify-center ">
                <p>-</p>
                <p className='font-blackChancery font-semibold'> Create your our aperitif </p>
                <p>-</p>
              </div>
              <div className="icon"></div>
            </div>
          </div>
      </div>
      <div className="third flex flex-col lg:flex-row items-center justify-between p-6 rounded-lg mx-40  ">
            <div className="text flex flex-col w-full lg:w-1/2 space-y-4 p-4">
                <div className="header">
                    <p className="text-4xl font-black font-blackChancery text-orange-500 text-center lg:text-left">
                        Buffet delicious
                    </p>
                </div>
                <div className="sub-header text-xl font-bold text-center lg:text-left">
                    <p>Goodness Without Borders</p>
                </div>
                <div className="text  text-sm">
                    <p className="text-gray-700">
                        At IT Basement, we believe that food is not just about sustenance; it's about creating experiences and memories. Our talented chefs combine fresh, high-quality ingredients with innovative culinary techniques to create dishes that are not only delicious but also beautifully presented.
                    </p>
                    <p className="mt-4 text-gray-700">
                        Whether you're planning a cozy family gathering, a corporate event, or a grand wedding celebration, we offer customizable catering options tailored to your specific needs. Our menu features a wide variety of cuisines, from traditional favorites to modern delights, ensuring that there is something for everyone to enjoy.
                    </p>
                    <p className="mt-4 text-gray-700">
                        Join us at IT Basement for an unforgettable dining experience, where every meal is a celebration of flavor. Discover our latest specials and let us cater your next event to perfection!
                    </p>
                </div>
            </div>
            <div className="img w-full grid grid-cols-2 grid-rows-2 gap-1 h-[400px] rounded-xl shadow-lg lg:w-1/2 ">
              <div className="img1 bg-center bg-no-repeat bg-cover rounded-lg"style={{ backgroundImage: `url(https://tiki.vn/blog/wp-content/uploads/2023/09/thumb-10-696x392.jpg` }}>
              </div>
              <div className="img1 bg-center bg-no-repeat bg-cover rounded-lg"style={{ backgroundImage: `url(https://down-vn.img.susercontent.com/vn-11134259-7r98o-lwwn4m23932x77` }}>
              </div>
              <div className="img1 bg-center bg-no-repeat bg-cover rounded-lg"style={{ backgroundImage: `url(https://down-vn.img.susercontent.com/vn-11134259-7r98o-lwwn4nen4el769` }}>
              </div>
              <div className="img1 bg-center bg-no-repeat bg-cover rounded-lg"style={{ backgroundImage: `url(https://down-vn.img.susercontent.com/vn-11134259-7r98o-lwwn4nompsd7d9` }}>
              </div>
            </div>
      </div>
      <div className="message bg-gray-700 flex justify-center gap-10 p-10 items-center">
          <div className="text text-white">
            <p>Keep up with the lates restaurant news and events.</p>
            <p>Enter your email and subscribe to our newsletter.</p>
          </div>
          <div className="form">
          <Form
            name="subscribe"
            layout="inline" // Optional: Change layout to inline for a more compact form
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                style={{ width: '300px' }} // Optional: Adjust width as needed
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary">
                Subscribe
              </Button>
            </Form.Item>
          </Form>
          </div>
      </div>
      
    </div>
  )
}

export default AboutUsPage