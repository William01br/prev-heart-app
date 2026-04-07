import React, { createContext, useContext, useState } from "react";

type FormData = {
  nome?: string;
  cpf?: string;
  password?: string;
  email?: string;
  phone?: string;
  role?: string;
};

type FormDataContextType = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
};

const FormDataContext = createContext<FormDataContextType | null>(null);

export const FormDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [formData, setFormData] = useState<FormData>({});

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetFormData = () => setFormData({});

  return (
    <FormDataContext.Provider
      value={{ formData, updateFormData, resetFormData }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context)
    throw new Error("useFormData must be used inside of FormDataProvider");
  return context;
};
