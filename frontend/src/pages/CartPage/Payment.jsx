import { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import axios from "axios";
import Dialog from "./Dialog";
export default function PayingPage({ addressRef, handleAddBill }) {
  const [showAcceptPayment, setShowAcceptPayment] = useState(false);

  const onFinish = (values) => {
    setShowAcceptPayment(true);
  };
  const handlePayment = () => {
    const values = form.getFieldsValue();
    const sltCityIdx = city.findIndex((c) => c.value === values.city);
    const sltDisIdx = district.findIndex((d) => d.value === values.district);
    const sltWardIdx = ward.findIndex((w) => w.value === values.ward);
    const newObj = {
      ...values,
      city: city[sltCityIdx].label,
      district: district[sltDisIdx].label,
      ward: ward[sltWardIdx].label,
    };
    handleAddBill(newObj);
  };
  const [validateAddress, setValidateAddress] = useState([]);
  const [form] = Form.useForm();
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const getCity = async () => {
    const response = await axios.get("https://provinces.open-api.vn/api/");
    const dataCity = [];
    response.data.map((city) => {
      dataCity.push({
        label: city.name,
        value: city.code,
      });
    });
    setCity(dataCity);
  };
  const getDistrict = async (e) => {
    const response = await axios.get(`https://provinces.open-api.vn/api/p/${e}?depth=2`);
    const dataDistrict = [];
    response.data.districts.map((district) => {
      dataDistrict.push({
        label: district.name,
        value: district.code,
      });
    });
    setDistrict(dataDistrict);
  };
  const getWards = async (e) => {
    const response = await axios.get(`https://provinces.open-api.vn/api/d/${e}?depth=2`);
    const dataWard = [];
    response.data.wards.map((ward) => {
      dataWard.push({
        label: ward.name,
        value: ward.code,
      });
    });
    setWard(dataWard);
  };
  useEffect(() => {
    getCity();
  }, []);
  return (
    <div className="mt-8">
      <div className=" bg-gray-100 rounded-lg overflow-hidden">
        <div className="bg-white px-6 py-6">
          <h1 className="uppercase font-bold text-lg border-b-[1px] border-gray-300 pb-2">Địa chỉ giao hàng</h1>
          <Form
            form={form}
            className="my-4 w-full custom-address-form flex flex-col gap-4"
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label={<p className="min-w-[150px]  text-start text-sm">Họ và tên người nhận</p>}
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ tên người nhận",
                },
              ]}
            >
              <Input className="w-full" placeholder="Nhập họ và tên người nhận" />
            </Form.Item>
            <Form.Item
              label={<p className="min-w-[150px] text-start text-sm">Số điện thoại</p>}
              name="phonenumber"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại nhận hàng",
                },
              ]}
            >
              <Input className="" placeholder="Nhập số điện thoại" />
            </Form.Item>
            <Form.Item
              label={<p className="min-w-[150px] text-start text-sm">Tỉnh/Thành Phố</p>}
              name="city"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tỉnh/thành phố",
                },
              ]}
            >
              <Select
                placeholder="Chọn tỉnh/thành phố"
                style={{ width: "100%" }}
                onChange={(e) => {
                  getDistrict(e);
                  form.setFieldsValue({ district: null, ward: null });
                  setValidateAddress((prev) => ["city"]);
                }}
                options={city}
              />
            </Form.Item>
            <Form.Item
              label={<p className="min-w-[150px] text-start text-sm">Quận/Huyện</p>}
              name="district"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn quận",
                },
              ]}
            >
              <Select
                disabled={validateAddress.includes("city") ? false : true}
                placeholder="Chọn quận/huyện"
                style={{ width: "100%" }}
                onChange={(e) => {
                  getWards(e);
                  form.setFieldsValue({ ward: null });
                  setValidateAddress((prev) => ["city", "district"]);
                }}
                options={district}
              />
            </Form.Item>
            <Form.Item
              label={<p className="min-w-[150px] text-start text-sm">Phường/Xã</p>}
              name="ward"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phường/xã",
                },
              ]}
            >
              <Select
                disabled={validateAddress.includes("district") ? false : true}
                placeholder="Chọn phường/xã"
                style={{ width: "100%" }}
                onChange={() => {
                  setValidateAddress((prev) => [...prev, "ward"]);
                }}
                options={ward}
              />
            </Form.Item>
            <Form.Item
              label={<p className="min-w-[150px] text-start text-sm">Địa chỉ nhận hàng</p>}
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số địa chỉ nhận hàng",
                },
              ]}
            >
              <Input className="" placeholder="Nhập địa chỉ nhận hàng" />
            </Form.Item>
            <button type="submit" ref={addressRef}></button>
          </Form>
        </div>
      </div>
      {showAcceptPayment && (
        <Dialog
          onClose={() => {
            setShowAcceptPayment(false);
          }}
          onYes={() => {
            handlePayment();
            setShowAcceptPayment(false);
          }}
          buttonContent={"Xác nhận"}
          message={"Bạn có chắc muốn đặt món ăn này"}
          content={"Món ăn sẽ được giao tới địa chỉ của bạn!!"}
        />
      )}
    </div>
  );
}
