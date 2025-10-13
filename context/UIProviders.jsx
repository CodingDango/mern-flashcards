'use client'

import OptionsMenuManagerProvider from "@/context/OptionsMenuManagerProvider";
import ModalProvider from "@/context/ModalProvider";

const UIProviders = ({ children }) => (
  <OptionsMenuManagerProvider>
    <ModalProvider>
    {children}
    </ModalProvider>
  </OptionsMenuManagerProvider>
)

export default UIProviders;