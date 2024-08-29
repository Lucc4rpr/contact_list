import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  addContact,
  editContact,
  Contact
} from '../../features/contacts/contactsSlice'
import { FormContainer, Input, Button, FormTitle } from './styles'

interface ContactFormProps {
  editingContact?: Contact
  clearEditingContact: () => void
}

const ContactForm: React.FC<ContactFormProps> = ({
  editingContact,
  clearEditingContact
}) => {
  const [name, setName] = useState(editingContact?.name || '')
  const [email, setEmail] = useState(editingContact?.email || '')
  const [phone, setPhone] = useState(editingContact?.phone || '')
  const dispatch = useDispatch()

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name)
      setEmail(editingContact.email)
      setPhone(editingContact.phone)
    }
  }, [editingContact])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingContact) {
      dispatch(editContact({ ...editingContact, name, email, phone }))
      clearEditingContact()
    } else {
      dispatch(
        addContact({
          id: Date.now(),
          name,
          email,
          phone
        })
      )
    }

    setName('')
    setEmail('')
    setPhone('')
  }

  return (
    <FormContainer>
      <FormTitle>
        {editingContact ? 'Editar Contato' : 'Adicionar Contato'}
      </FormTitle>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Button type="submit">{editingContact ? 'Salvar' : 'Adicionar'}</Button>
      </form>
    </FormContainer>
  )
}

export default ContactForm
