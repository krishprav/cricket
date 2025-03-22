import { toast } from 'react-hot-toast';

export const useToast = () => {
  return {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    info: (message) => toast(message),
    custom: (message, options) => toast(message, options),
  };
};
