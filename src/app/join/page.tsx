"use client";

import { JoinFormData } from "@/types/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function JoinPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<JoinFormData>({
    email: '',
    password: '',
    username: '',
    id: '',
    phone: '',
    addr: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  console.log(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("가입 성공!");
        router.push("/login");
      } else {
        alert(data.message || "가입 실패");
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert("가입 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">JOIN</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2" htmlFor="id">ID</label>
          <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="id" name="id" value={formData.id} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-2" htmlFor="password">PASSWORD</label>
          <input className="border border-gray-300 rounded-md p-2 w-full" type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-2" htmlFor="username">USERNAME</label>
          <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-2" htmlFor="email">EMAIL</label>
          <input className="border border-gray-300 rounded-md p-2 w-full" type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-2" htmlFor="phone">PHONE</label>
          <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div>
          <label className="block mb-2" htmlFor="addr">ADDR</label>
          <input className="border border-gray-300 rounded-md p-2 w-full" type="text" id="addr" name="addr" value={formData.addr} onChange={handleChange} />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full" type="submit">가입하기</button>
      </form>
    </div>
  );
}