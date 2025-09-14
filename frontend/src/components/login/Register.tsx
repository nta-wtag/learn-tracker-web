import React from "react";
import InputField from "../InputField";
import Button from "../Button";

interface RegisterProps {
  authData: { email: string; password: string; username: string };
  setAuthData: React.Dispatch<React.SetStateAction<any>>;
}

function Register({ authData, setAuthData }: RegisterProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      alert(`Registration success...\nUsername: ${authData.username}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
      <InputField
        type="text"
        placeholder="Username"
        value={authData.username}
        onChange={(e) => setAuthData((prev: any) => ({ ...prev, username: e.target.value }))}
      />
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
      <Button text="Register" onClick={handleSubmit} />
    </form>
  );
}

export default Register;
