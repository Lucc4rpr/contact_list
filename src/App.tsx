import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import { Contact } from './features/contacts/contactsSlice'

const App: React.FC = () => {
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  const clearEditingContact = () => {
    setEditingContact(null)
  }

  return (
    <Provider store={store}>
      <div>
        <h1>Contact List</h1>
        <ContactForm
          editingContact={editingContact || undefined}
          clearEditingContact={clearEditingContact}
        />
        <ContactList setEditingContact={setEditingContact} />
      </div>
    </Provider>
  )
}

export default App
