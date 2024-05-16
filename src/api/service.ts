import { Credentials, UserDTO, UserProfileDTO } from '@redux/authSlice'
import {
  Interview,
  InterviewFeedback,
  InterviewRequestDTO,
} from '@redux/interviewSlice'
import { Interviewer } from '@redux/interviewerSlice'
import { MenteeDto, MentorDto } from '@redux/onboardingSlice'
import { Specialization } from '@redux/specializationSlice'
import { Talent, TalentCreationRequest } from '@redux/talentSlice'
import ky from 'ky'
import { PageableRequest, PageableResponse } from 'services/types'

class ApiService {
  server_domain_endpoint = import.meta.env.VITE_SERVER_DOMAIN_ENDPOINT

  register(userDTO: UserDTO) {
    return ky.post(`${this.server_domain_endpoint}/user/register`, {
      json: {
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: userDTO.email,
        phoneNumber: userDTO.phoneNumber,
        username: userDTO.username,
        password: userDTO.password,
      },
    })
  }

  login(credentials: Credentials) {
    return ky.post(`${this.server_domain_endpoint}/auth/login`, {
      json: {
        username: credentials.username,
        password: credentials.password,
      },
      credentials: 'include',
    })
  }

  logout() {
    return ky.get(`${this.server_domain_endpoint}/logout`, {
      credentials: 'include',
    })
  }

  getCurrentUser() {
    return ky
      .get(`${this.server_domain_endpoint}/user/me`, {
        credentials: 'include',
      })
      .json<UserProfileDTO>()
  }

  updateUser(userDTO: UserDTO) {
    return ky
      .put(`${this.server_domain_endpoint}/user/${userDTO.username}`, {
        json: userDTO,
      })
      .json<UserDTO>()
  }

  getSpecializations() {
    return ky
      .get(`${this.server_domain_endpoint}/specialization`)
      .json<Specialization[]>()
  }

  createSpecialization(specialization: Specialization) {
    return ky
      .post(`${this.server_domain_endpoint}/specialization`, {
        json: specialization,
      })
      .json<Specialization>()
  }

  updateSpecialization(id: number, specialization: Specialization) {
    return ky
      .put(`${this.server_domain_endpoint}/specialization/${id}`, {
        json: specialization,
      })
      .json<Specialization>()
  }

  getTalents() {
    return ky.get(`${this.server_domain_endpoint}/talent`).json<Talent[]>()
  }

  getTalentsPageable(request: PageableRequest) {
    return ky
      .get(
        `${this.server_domain_endpoint}/talent/page?size=${request.size}&page=${request.page}&sort=${request.sort}`,
      )
      .json<PageableResponse<Talent>>()
  }

  updateTalentStatus(id: number, request: TalentCreationRequest) {
    return ky
      .put(`${this.server_domain_endpoint}/talent/status/${id}`, {
        json: request,
        credentials: 'include',
      })
      .json<Talent>()
  }

  searchTalents(query: string, type: string) {
    return ky
      .get(
        `${this.server_domain_endpoint}/talent/search?query=${query}&type=${type}`,
      )
      .json<Talent[]>()
  }

  getInterviewees() {
    return ky
      .get(`${this.server_domain_endpoint}/talent/interviewees`)
      .json<Talent[]>()
  }

  getMentees() {
    return ky.get(`${this.server_domain_endpoint}/mentee`).json<MenteeDto[]>()
  }

  getMentors() {
    return ky.get(`${this.server_domain_endpoint}/mentor`).json<MentorDto[]>()
  }

  createTalent(talent: TalentCreationRequest) {
    return ky
      .post(`${this.server_domain_endpoint}/talent`, {
        json: talent,
      })
      .json<Talent>()
  }

  uploadCV(talentId: number, formData: FormData) {
    return ky
      .post(`${this.server_domain_endpoint}/talent/upload/${talentId}`, {
        body: formData,
      })
      .json<TalentCreationRequest>()
  }

  getCV(id: number) {
    return ky.get(`${this.server_domain_endpoint}/talent/cv/${id}`).text()
  }

  sendOnboardingDocument(menteeId: number, documentUrl: string) {
    return ky.post(
      `${this.server_domain_endpoint}/mentee/${menteeId}/onboarding/email`,
      {
        body: documentUrl,
        credentials: 'include',
      },
    )
  }

  getInterviewers(request: PageableRequest) {
    return ky
      .get(
        `${this.server_domain_endpoint}/interviewer?size=${request.size}&page=${request.page}&sort=${request.sort}`,
      )
      .json<PageableResponse<Interviewer>>()
  }

  createInterviewer(interviewer: Interviewer) {
    return ky
      .post(`${this.server_domain_endpoint}/interviewer`, {
        json: interviewer,
      })
      .json<Interviewer>()
  }

  updateInterviewer(id: number, interviewer: Interviewer) {
    return ky
      .put(`${this.server_domain_endpoint}/interviewer/update/${id}`, {
        json: interviewer,
      })
      .json<Interviewer>()
  }

  deleteInterviewer(id: number) {
    return ky
      .delete(`${this.server_domain_endpoint}/interviewer/${id}`)
      .json<boolean>()
  }

  getAllInterviewes() {
    return ky
      .get(`${this.server_domain_endpoint}/interview`)
      .json<Interview[]>()
  }

  createInterview(interview: InterviewRequestDTO) {
    console.log(interview)
    return ky
      .post(`${this.server_domain_endpoint}/interview`, {
        json: interview,
        credentials: 'include',
      })
      .json<Interview>()
  }

  submitFeedback(feedback: InterviewFeedback, interviewID: number) {
    return ky
      .post(
        `${this.server_domain_endpoint}/feedback?interviewID=${interviewID}`,
        {
          json: feedback,
        },
      )
      .json<InterviewFeedback>()
  }
}

export default new ApiService()
