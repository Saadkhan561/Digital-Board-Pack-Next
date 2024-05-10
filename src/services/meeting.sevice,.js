import {axios} from '../utils/axios'

export const insertMeeting = async(data) => {
    try {
        const res = await axios.post('/insertMeeting', data)
        return res.data
    } catch(error) {
        throw new Error(error)
    }
}

export const getAllMeetings = async() => {
    try {
        const res = await axios.get('/showMeetings')
        return res.data
    } catch(error) {
        throw new Error(error)
    }
}
