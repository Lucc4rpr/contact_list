import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import ContactForm from './components/ContactForm/ContactForm'
import ContactList from './components/ContactList/ContactList'
import { Contact } from './features/contacts/contactsSlice'
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  justify-content: center;
  height: 100vh;
`

const App: React.FC = () => {
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  const clearEditingContact = () => {
    setEditingContact(null)
  }

  return (
    <Provider store={store}>
      <AppContainer>
        <h1>Lista de Contatos</h1>
        <ContactForm
          editingContact={editingContact || undefined}
          clearEditingContact={clearEditingContact}
        />
        <ContactList onEdit={setEditingContact} />
      </AppContainer>
    </Provider>
  )
}

export default App
