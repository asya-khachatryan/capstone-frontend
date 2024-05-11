import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import {
  Specialization,
  getSpecializations,
} from '../redux/specializationSlice'
import { RootState } from '../store'
import { createPortal } from 'react-dom'
import Modal from '../components/Modal'
import apiService from '@api/service'
import { TalentRequestDTO } from '@redux/talentSlice'

const JobApplicationForm: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    specializationId: 0,
    cv: null as File | null,
  })

  const dispatch = useAppDispatch()

  const specializations: Specialization[] | undefined = useAppSelector(
    (state: RootState) => state.specialization.specializations,
  )

  useEffect(() => {
    if (specializations === undefined) {
      dispatch(getSpecializations())
      console.log(specializations)
    }
    console.log(specializations)
  }, [specializations])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, cv: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData)
    // setModalOpen(true);

    const talent: TalentRequestDTO = {
      ...formData,
    }

    if (!formData.cv) {
      console.error('No file selected')
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append('file', formData.cv)

    const response = await apiService.createTalent(talent)
    apiService.uploadCV(response.id, formDataToSend)

    setFormData({
      name: '',
      surname: '',
      email: '',
      phoneNumber: '',
      specializationId: 0,
      cv: null,
    })
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const isDisabled = false
  //form should be disabled until specializations are loaded

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Job Application</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder=" Name"
              className="form-input w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isDisabled}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Surname"
              className="form-input w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
              value={formData.surname}
              onChange={handleChange}
              required
              disabled={isDisabled}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="form-input w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isDisabled}
            />
          </div>
          {/* <div className="mb-4">
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              className="form-input w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              disabled={isDisabled}
            />
          </div> */}
          <div className="mb-4">
            <select
              id="specialization"
              name="specialization"
              className="form-select w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
              value={formData.specializationId}
              onChange={handleChange}
              required
              disabled={isDisabled}
            >
              {specializations?.map((item) => (
                <option key={item.id.toString()}>{item.specialization}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <input
              type="file"
              id="cv"
              name="cv"
              accept=".pdf,.doc,.docx"
              className="form-input w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={handleFileChange}
              required
              disabled={isDisabled}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit Application
          </button>
          {modalOpen &&
            createPortal(
              <Modal closeModal={handleCloseModal} size="lg">
                <h1>This is a modal</h1>
                <br />
                <p>This is the modal description</p>
              </Modal>,
              document.body,
            )}
        </form>
      </div>
    </div>
  )
}

export default JobApplicationForm
