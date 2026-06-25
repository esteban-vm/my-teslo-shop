import type { StateCreator } from 'zustand'
import type { AddressSchemas } from '@/schemas'

type Address = AddressSchemas.AddressDTO

interface AddressState {
  address: Address
}

interface AddressActions {
  setAddress: (address: Address) => void
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
      remember: true,
    },

    setAddress(address) {
      set({ address })
    },
  }
}
