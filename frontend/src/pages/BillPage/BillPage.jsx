import { Button, Pagination } from "antd";
import { Link } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import BillContent from "./BillContent";
import { AuthContext } from "@/components/authProvider/AuthProvider";
import billApi from "@/apis/billApi";
import { formatDate } from "@/lib/utils";

const statuses = [
  { id: 1, status: "Completed" },
  { id: 2, status: "Failed" },
  { id: 3, status: "Pending" },
  { id: 4, status: "Ongoing" },
  { id: 5, status: "All" },
];

function BillPage() {
  const { userData } = useContext(AuthContext);
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [total, setTotal] = useState(4);
  const [page, setPage] = useState(1);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchUserBills = async () => {
      try { 
        const response = await billApi.getBills(page, 4, userData.userId);
        if (response.status === "success" && Array.isArray(response.data)) {
          setBills(response.data);
          setTotal(response.pagination.totalItems);
        } else {
          setBills([]);
        }
      } catch (error) {
        console.error("Failed to fetch user ratings:", error);
      }
    };

    if (userData && userData.userId) {
      fetchUserBills();
    }
  }, [userData, page]);

  const handleBillClick = (bill) => {
    // Toggle visibility of the bill content
    if (selectedBill?.billId === bill.billId) {
      setSelectedBill(null);
    } else {
      setSelectedBill(bill);
    }
  };
  const handleStatusClick = (status) => {
    setSelectedStatus(status.status === selectedStatus ? null : status.status);
    setSelectedBill(null);
  };

  const getParsedAddress = (addressString) => {
    try {
      const addressObj = JSON.parse(addressString);
      return `${addressObj.address}, ${addressObj.ward}, ${addressObj.district}, ${addressObj.city}`;
    } catch (error) {
      console.error("Failed to parse address:", error);
      return "Address not available";
    }
  };

  return (
    <div className="px-24 bg-gray-100 pb-24 mt-14">
      <h2 className="pt-6 text-xl mb-4">Lịch sử thanh toán</h2>
      <div className="status flex justify-between bg-white p-3 rounded-xl my-3">
        <div className="title">
          <p>Tình trạng đơn hàng</p>
        </div>
        <div className="status-controller flex gap-5">
          {statuses.map((sta) => (
            <Button
              key={sta.id}
              type={selectedStatus === sta.status ? "primary" : "default"}
              onClick={() => handleStatusClick(sta)}
            >
              {sta.status}
            </Button>
          ))}
        </div>
      </div>
      <div className="">
        {bills
          .filter((bill) => !selectedStatus || selectedStatus === "All" || bill.status === selectedStatus)
          .map((bill) => (
            <div key={bill.billId} className="rounded-lg mb-2">
              <div
                className={`px-5 items-center rounded-xl flex justify-between p-4 cursor-pointer ${
                  selectedBill?.billId === bill.billId ? "bg-orange-200 hover:opacity-80" : "bg-white hover:shadow-lg"
                }`}
                onClick={() => handleBillClick(bill)} // Toggle visibility on click
              >
                <p className="basis-1/4">Đơn hàng {bill.billId}</p>
                <p className="basis-[10%] text-center">{bill.status}</p>
                <p className="basis-1/4 text-center">{formatDate(bill.date)}</p>
                <p className="basis-[40%] text-end">{getParsedAddress(bill.address)}</p>
              </div>
              {/* Show BillContent only for the selected bill */}
              {selectedBill?.billId === bill.billId && <BillContent bill={bill} />}
            </div>
          ))}
      </div>

      <div className="w-full flex justify-center mt-5">
        <Pagination
          className="items-center"
          onChange={(page) => {
            setPage(page);
          }}
          total={total}
          defaultCurrent={1}
          pageSize={4}
        />
      </div>
    </div>
  );
}

export default BillPage;
