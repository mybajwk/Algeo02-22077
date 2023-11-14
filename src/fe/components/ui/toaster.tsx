import toast, { type Toast as ToastType, Toaster } from 'react-hot-toast';

import { XIcon } from "lucide-react"

interface ToastProps {
  status: 'error' | 'success';
  description: string;
  toastLoadingId?: string;
}

function title(inputString: string) {
  if (inputString.length > 0) {
    return (
      inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
    );
  } else {
    return '';
  }
}

function callLoading(desc: string) {
  return loadingToast(desc);
}

function callToast({ status, description, toastLoadingId }: ToastProps): void {
  toast.dismiss(toastLoadingId);
  status == 'success' ? successToast(description) : errorToast(description);
}

function ToastComponent({
  toastprops: t,
  description,
}: { toastprops: ToastType } & { description: string }) {
  return (
    <>
      <div className='flex gap-7 ml-3'>
        <div className='flex flex-col'>
          <h1 className='text-base md:text-xl font-poppins'>
            <strong>{title(t.type)}</strong>
          </h1>
          <p className='text-xs md:text-base font-poppins'>
            {description || t.type}
          </p>
        </div>
        <div className='w-8 justify-center rounded-full flex items-center self-center'>
          <button
            className='aspect-square w-full items-center flex'
            onClick={() => toast.dismiss(t.id)}
          >
            <div>
              <XIcon
                className='fill-[#c7c7c7] hover:fill-slate-500 transition-all duration-300'
                size={20}
              ></XIcon>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

const successToast = (desc: string) =>
  toast.success((t) => <ToastComponent toastprops={t} description={desc} />);
const errorToast = (desc: string) =>
  toast.error((t) => <ToastComponent toastprops={t} description={desc} />);
const loadingToast = (desc: string): string => {
  return toast.loading((t) => (
    <ToastComponent toastprops={t} description={desc} />
  ));
};

function Toast() {
  return (
    <div>
      <Toaster
        position='top-center'
        containerStyle={{}}
        toastOptions={{
          style: {
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), , 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            borderWidth: '0.125rem',
            borderRadius: '0.25rem',
            paddingInline: '1.25rem',
            maxWidth: '85%',
            minWidth: '250px',

          },

          error: {
            style: { borderColor: '#EF1B27' },
            duration: 3500,
          },

          success: {
            style: {
              borderColor: '#3FB160 ',
            },
            duration: 3500,
          },
          loading: {
            style: {
              borderColor: '#fbbf24',
            },
          },
        }}
      ></Toaster>
    </div>
  );
}

export default Toast;
export { callLoading, callToast };