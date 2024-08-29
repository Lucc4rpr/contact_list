import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Contact {
  id: number
  name: string
  email: string
  phone: string
}

interface ContactsState {
  contacts: Contact[]
}

const initialState: ContactsState = {
  contacts: []
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload)
    },
    removeContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      )
    },
    editContact: (state, action: PayloadAction<Contact>) => {
      const { id, name, email, phone } = action.payload
      const existingContact = state.contacts.find(
        (contact) => contact.id === id
      )
      if (existingContact) {
        existingContact.name = name
        existingContact.email = email
        existingContact.phone = phone
      }
    }
  }
})

export const { addContact, removeContact, editContact } = contactsSlice.actions
export default contactsSlice.reducer
