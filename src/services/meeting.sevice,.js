import useUserStore from '@/stores/useUserStore'
import {axios} from '../utils/axios'

export const insertMeeting = async(data) => {
    try {
        const res = await axios.post('/insertMeeting', data)
        return res.data
    } catch(error) {
        throw new Error(error)
    }
}

export const updateAgendaDocument = async(data) => {
    console.log(data)
    try {
        const res = await axios.put('/UpdateAgenda', data)
        return res.data
    } catch(error) {
        throw new Error(error)
    }
}

export const updateMeetingMinDocument = async(data) => {
    console.log(data)
    try {
        const res = await axios.put('/UpdateMeetingMin', data)
        return res.data
    } catch(error) {
        throw new Error(error)
    }
}

export const getAllMeetings = async(params) => {
    try {
        // if (params.role === "User") {
        //     const res = await axios.get('/showUserMeetings')
        //     return res
        // } else {
        //     const res = await axios.get('/showMeetings')
        // }
        const res = await axios.get('/showUserMeetings')
        return res.data
    } catch(error) {
        throw new Error(error)
    }
}

export const getUserMeetings =async() => {
    try {
        const res = await axios.get('/showUserMeetings')
        return res.data
    } catch(error) {
        throw new Error(error)
    }
}

export const getMeetingById = async(params) => {
    const{id} = params
    try{
        const res = await axios.get(`/getMeeting/${id}`)
        return res.data
    } catch(error) {
        throw new Error(error)
    }
}
