"use client";

import { JoinFormData } from "@/types/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import JoinForm from "@/components/JoinForm";

export default function JoinPage() {

  
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">JOIN</h1>
      <JoinForm/>
    </div>
  );
}