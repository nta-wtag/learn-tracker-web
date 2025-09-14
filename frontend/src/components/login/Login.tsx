import React from "react";
import Button from "../Button";
import InputField from "../InputField";

interface Props {
  authData: { email: string; password: string; username: string };
  setAuthData: React.Dispatch<React.SetStateAction<any>>;
  errors: { email?: string; password?: string};
  onSubmit: (e: React.FormEvent) => void; // <- added
}

function Login({ authData, setAuthData, errors, onSubmit }: Props) {
  return (
    <form className="flex flex-col space-y-4 w-full" onSubmit={onSubmit}>
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
      <Button text="Login" type='submit' />
    </form>
  );
}

export default Login;
