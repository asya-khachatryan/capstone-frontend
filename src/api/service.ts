import { Credentials, UserDTO, UserProfileDTO } from '@redux/authSlice'
import { MenteeDto, MentorDto } from '@redux/onboardingSlice'
import { Specialization } from '@redux/specializationSlice'
import { TalentRequestDTO, TalentResponseDTO } from '@redux/talentSlice'
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

  updateUser(userDTO: UserDTO) {
    return ky
      .put(`${this.server_domain_endpoint}/user/${userDTO.username}`, {
        json: userDTO,
      })
      .json<UserDTO>()
  }

  getCurrentUser() {
    return ky
      .get(`${this.server_domain_endpoint}/user/me`, {
        credentials: 'include',
      })
      .json<UserProfileDTO>()
  }

  getSpecializations() {
    return ky
      .get(`${this.server_domain_endpoint}/specialization`)
      .json<Specialization[]>()
  }

  getTalents() {
    return ky
      .get(`${this.server_domain_endpoint}/talent`)
      .json<TalentResponseDTO[]>()
  }

  getTalentsPageable(request: PageableRequest) {
    return ky
      .get(
        `${this.server_domain_endpoint}/talent/page?size=${request.size}&page=${request.page}&sort=${request.sort}`,
      )
      .json<PageableResponse<TalentResponseDTO>>()
  }

  searchTalents(query: string, type: string) {
    return ky
      .get(
        `${this.server_domain_endpoint}/talent/search?query=${query}&type=${type}`,
      )
      .json<TalentResponseDTO[]>()
  }

  getInterviewees() {
    return ky
      .get(`${this.server_domain_endpoint}/talent/interviewees`)
      .json<TalentResponseDTO[]>()
  }

  getMentees() {
    return ky
      .get(`${this.server_domain_endpoint}/user/mentee`)
      .json<MenteeDto[]>()
  }

  getMentors() {
    return ky
      .get(`${this.server_domain_endpoint}/user/mentor`)
      .json<MentorDto[]>()
  }

  createTalent(talent: TalentRequestDTO) {
    return ky
      .post(`${this.server_domain_endpoint}/talent`, {
        json: talent,
      })
      .json<TalentResponseDTO>()
  }

  uploadCV(talentId: number, formData: FormData) {
    return ky
      .post(`${this.server_domain_endpoint}/upload/${talentId}`, {
        body: formData,
      })
      .json<TalentRequestDTO>()
  }

  getCV(id: number) {
    return ky.get(`${this.server_domain_endpoint}/talent/cv/${id}`).text()
  }
}

export default new ApiService()
