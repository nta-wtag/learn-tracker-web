import React from "react";
import InputField from "../InputField";
import Button from "../Button";

interface Props {
  authData: { email: string; password: string; username: string };
  setAuthData: React.Dispatch<React.SetStateAction<any>>;
  errors: { email?: string; password?: string; username?: string };
  onSubmit: (e: React.FormEvent) => void; // <- added
}

function Register({ authData, setAuthData, errors, onSubmit }: Props) {
  return (
    <form className="flex flex-col space-y-4 w-full" onSubmit={onSubmit}>
      <InputField
        type="text"
        placeholder="Username"
        value={authData.username}
        onChange={(e) => setAuthData((prev: any) => ({ ...prev, username: e.target.value }))}
        error={errors.username}
      />
      <InputField
        type="email"
        placeholder="Email"
        value={authData.email}
        onChange={(e) => setAuthData((prev: any) => ({ ...prev, email: e.target.value }))}
        error={errors.email}
      />
      <InputField
        type="password"
        placeholder="Password"
        value={authData.password}
        onChange={(e) => setAuthData((prev: any) => ({ ...prev, password: e.target.value }))}
        error={errors.password}
      />
      <Button text="Register" type="submit"/>
    </form>
  );
}


export default Register;
