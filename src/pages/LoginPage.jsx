import React from 'react';
import { Link } from 'react-router-dom';
import { SignIn } from '@clerk/react';

const LoginPage = () => (
  <div className="flex justify-center py-10">
    <div className="w-full max-w-md">
      <SignIn routing="hash" signUpUrl="/register" forceRedirectUrl="/dashboard" />
      <p className="mt-5 text-center text-xs text-surface-muted">
        New to CampusCraft? <Link to="/register" className="font-bold text-brand-600">Create an account</Link>
      </p>
    </div>
  </div>
);

export default LoginPage;
