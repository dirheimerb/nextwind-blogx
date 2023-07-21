export interface PanelProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  onShow: () => void;
  buttonLabel?: string;
}

export interface EmailInputProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailType: string;
  setEmailType: React.Dispatch<React.SetStateAction<string>>;
  showErrors: boolean;
}

interface PhoneInputProps {
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  phoneType: string;
  setPhoneType: React.Dispatch<React.SetStateAction<string>>;
  showErrors: boolean;
}
