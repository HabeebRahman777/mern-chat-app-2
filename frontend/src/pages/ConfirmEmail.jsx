
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import toast from "react-hot-toast";

const ConfirmEmail = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axiosInstance
        .get(`/auth/confirm-email?token=${token}`)
        .then((res) => {
          if (res.data.success) {
            toast.success('Email confirmed successfully!');
            setTimeout(() => navigate('/login', { replace: true }), 1000);
          } else {
            toast.error('Confirmation failed');
          }
        })
        .catch(() => {
          toast.error('Invalid or expired confirmation link');
        });
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50 px-4">
      <p className="text-gray-700 text-lg">Confirming your email...</p>
    </div>
  );
};

export default ConfirmEmail;
