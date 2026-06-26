import type { StateCreator } from 'zustand'
import type { AddressDTO } from '@/schemas/address'

interface AddressState {
  address: AddressDTO
}

interface AddressActions {
  setAddress: (address: AddressDTO) => void
}

export type AddressStore = AddressState & AddressActions

export const createAddressStore: StateCreator<AddressStore> = (set) => {
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
  }
}
