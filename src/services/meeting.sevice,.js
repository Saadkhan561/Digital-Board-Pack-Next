import {axios} from '../utils/axios'

export const insertMeeting = async(data) => {
    try {
        const res = await axios.post('/insertMeeting', data)
        return res.data
    } catch(error) {
        throw new Error(error)
    }
}
