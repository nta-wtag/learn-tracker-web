import React from "react";
import Button from "../Button";
import InputField from "../InputField";

interface LoginProps {
  authData: { email: string; password: string; username: string };
  setAuthData: React.Dispatch<React.SetStateAction<any>>;
}

function Login({ authData, setAuthData }: LoginProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      alert(`Login success...\nEmail: ${authData.email}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
      <InputField
        type="email"
        placeholder="Email"
        value={authData.email}
        onChange={(e) => setAuthData((prev: any) => ({ ...prev, email: e.target.value }))}
      />
      <InputField
        type="password"
        placeholder="Password"
        value={authData.password}
        onChange={(e) => setAuthData((prev: any) => ({ ...prev, password: e.target.value }))}
      />
      <Button text="Login" onClick={handleSubmit} />
    </form>
  );
}

export default Login;
