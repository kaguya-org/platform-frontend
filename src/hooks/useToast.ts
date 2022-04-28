import { ToastContext, ToastContextProps } from "@/contexts/toast";

import { useContext } from "react";

function useToast(): ToastContextProps   {
    const context = useContext(ToastContext);
  
    if (!context) throw new Error('useToast must be used within a ToastProvider');
  
    return context;
}

export { useToast }