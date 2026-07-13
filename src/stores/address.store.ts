import type { StateCreator } from 'zustand'
import type { Address } from '@/schemas/address'

interface AddressState {
  address: Address
}

interface AddressActions {
  setAddress: (address: Address) => void
  resetAddress: () => void
}

export type AddressStore = AddressState & AddressActions

export const createAddressStore: StateCreator<AddressStore> = (set, _, store) => {
  return {
    address: {
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      postalCode: '',
      phone: '',
      city: '',
      countryId: '',
      remember: false,
    },

    setAddress(address) {
      set({ address })
    },

    resetAddress() {
      set(store.getInitialState())
    },
  }
}
