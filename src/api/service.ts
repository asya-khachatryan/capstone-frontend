import ky from 'ky';
import { UserDTO, Credentials, UserProfileDTO } from '@redux/authSlice';
import { Specialization } from '@redux/specializationSlice';
import { TalentRequestDTO, TalentResponseDTO} from '@redux/talentSlice';


class ApiService {

    server_domain_endpoint = import.meta.env.VITE_SERVER_DOMAIN_ENDPOINT;

    register(userDTO: UserDTO) {
        return ky.post(`${this.server_domain_endpoint}/user/register`, {
            json: {
                "firstName": userDTO.firstName,
                "lastName": userDTO.lastName,
                "email": userDTO.email,
                "phoneNumber": userDTO.phoneNumber,
                "username": userDTO.username,
                "password": userDTO.password,
            }
        });
    }

    login(credentials: Credentials) {
        return ky.post(`${this.server_domain_endpoint}/auth/login`, {
            json: {
                "username": credentials.username,
                "password": credentials.password
            }, credentials: 'include'
        });
    }

    getCurrentUser() {
        return ky.get(`${this.server_domain_endpoint}/user/me`).json<UserProfileDTO>();
    }

    getSpecializations() {
        return ky.get(`${this.server_domain_endpoint}/specialization`).json<Specialization[]>();
    }

    getTalents() {
        return ky.get(`${this.server_domain_endpoint}/talent`).json<TalentRequestDTO[]>();
    }

    createTalent(talent: TalentRequestDTO) {
        console.log("here")
        console.log(JSON.stringify(talent))
        return ky.post(`${this.server_domain_endpoint}/talent`,
            {
                json: talent
            }
        ).json<TalentResponseDTO>();
    }

    uploadCV(talentId: number, formData: FormData) {
        return ky.post(`${this.server_domain_endpoint}/upload/${talentId}`,
            {
                body: formData
            }
        ).json<TalentRequestDTO>();
    }


}

export default new ApiService();
