import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  addContact,
  editContact,
  Contact
} from '../features/contacts/contactsSlice'
import styled from 'styled-components'

const FormContainer = styled.div`
  margin: 20px;
`

interface ContactFormProps {
  editingContact?: Contact
  clearEditingContact: () => void
}

const ContactForm: React.FC<ContactFormProps> = ({
  editingContact,
  clearEditingContact
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const dispatch = useDispatch()

  // Atualiza os campos do formulário quando um contato para edição é passado
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
      clearEditingContact() // Limpa o contato sendo editado após salvar
    } else {
      dispatch(
        addContact({
          id: Date.now(), // Gera um ID único
          name,
          email,
          phone
        })
      )
    }

    // Limpa os campos do formulário
    setName('')
    setEmail('')
    setPhone('')
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">{editingContact ? 'Update' : 'Add'}</button>
      </form>
    </FormContainer>
  )
}

export default ContactForm
