"use client";
import { useEffect, useState } from 'react';
import { FaUsers, FaMoneyBillWave, FaChartLine, FaUserFriends } from 'react-icons/fa';

const StatusCard = () => {
  const [statusData, setStatusData] = useState([
    {
      title: 'สมาชิก',
      value: '0',
      unit: 'คน',
      icon: FaUsers,
      color: 'text-blue-500'
    },
    {
      title: 'พร้อมขาย',
      value: '0',
      unit: 'รายการ',
      icon: FaMoneyBillWave,
      color: 'text-green-500'
    },
    {
      title: 'ขายแล้ว',
      value: '0',
      unit: 'รายการ',
      icon: FaChartLine,
      color: 'text-red-500'
    },
    {
      title: 'หมวดหมู่',
      value: '0',
      unit: 'กลุ่ม',
      icon: FaUserFriends,
      color: 'text-purple-500'
    }
  ]);

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        // อัพเดทข้อมูลจาก API
        setStatusData([
          {
            ...statusData[0],
            value: data.userCount.toString()
          },
          {
            ...statusData[1],
            value: data.availableProducts.toString()
          },
          {
            ...statusData[2],
            value: data.soldProducts.toString()
          },
          {
            ...statusData[3],
            value: data.categoryCount.toString()
          }
        ]);
      } catch (error) {
        console.error('Error fetching status data:', error);
      }
    };

    fetchStatusData();
  }, []);

  return (
    <div className="max-w-[1090px] mx-auto px-4 lg:px-0 font-kanit">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up">
        {statusData.map((status, index) => {
          const Icon = status.icon;
          return (
            <div
              key={index}
              className="w-full h-[130px] bg-[#FFD369] rounded-[40px] p-6 transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between h-full">
                <div className="flex flex-col justify-between h-full">
                  <h3 className="text-[#222831] text-3xl font-medium">
                    {status.title}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[#222831] text-2xl font-bold">
                      {status.value}
                    </span>
                    <span className="text-[#222831] text-1xl">
                      {status.unit}
                    </span>
                  </div>
                </div>
                <div className={`text-4xl ${status.color}`}>
                  <Icon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusCard;