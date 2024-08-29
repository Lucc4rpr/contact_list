import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../app/store'
import { removeContact, Contact } from '../features/contacts/contactsSlice'
import styled from 'styled-components'

const ContactItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`

interface ContactListProps {
  setEditingContact: (contact: Contact | null) => void
}

const ContactList: React.FC<ContactListProps> = ({ setEditingContact }) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts)
  const dispatch: AppDispatch = useDispatch()

  const handleRemove = (id: number) => {
    dispatch(removeContact(id))
  }

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
  }

  return (
    <div>
      {contacts.map((contact) => (
        <ContactItem key={contact.id}>
          <div>
            {contact.name} - {contact.email} - {contact.phone}
          </div>
          <button onClick={() => handleEdit(contact)}>Edit</button>
          <button onClick={() => handleRemove(contact.id)}>Remove</button>
        </ContactItem>
      ))}
    </div>
  )
}

export default ContactList
