import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SignUp } from '@clerk/react';

const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const accountType = searchParams.get('type') === 'client' ? 'client' : 'student';

  return (
    <div className="flex flex-col items-center py-10">
      <div className="mb-5 flex gap-2 rounded-xl bg-white p-1 border border-surface-border">
        <Link to="/register?type=student" className={`px-4 py-2 rounded-lg text-xs font-bold ${accountType === 'student' ? 'bg-brand-600 text-white' : 'text-surface-muted'}`}>
          Student Freelancer
        </Link>
        <Link to="/register?type=client" className={`px-4 py-2 rounded-lg text-xs font-bold ${accountType === 'client' ? 'bg-brand-600 text-white' : 'text-surface-muted'}`}>
          Client / Recruiter
        </Link>
      </div>
      <SignUp
        routing="hash"
        signInUrl="/login"
        forceRedirectUrl="/dashboard"
        unsafeMetadata={{ role: accountType }}
      />
      <p className="mt-5 text-center text-xs text-surface-muted">
        Already registered? <Link to="/login" className="font-bold text-brand-600">Sign in</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
