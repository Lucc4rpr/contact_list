import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../app/store'
import { removeContact, Contact } from '../../features/contacts/contactsSlice'
import { ListContainer, ContactItem, Button } from './styles'

interface ContactListProps {
  onEdit: (contact: Contact | null) => void
}

const ContactList: React.FC<ContactListProps> = ({ onEdit }) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts)
  const dispatch: AppDispatch = useDispatch()

  const handleRemove = (id: number) => {
    dispatch(removeContact(id))
  }

  return (
    <ListContainer>
      {contacts.map((contact) => (
        <ContactItem key={contact.id}>
          <div>
            {contact.name} - {contact.email} - {contact.phone}
          </div>
          <div>
            <Button onClick={() => onEdit(contact)}>Editar</Button>
            <Button onClick={() => handleRemove(contact.id)}>Remover</Button>
          </div>
        </ContactItem>
      ))}
    </ListContainer>
  )
}

export default ContactList
