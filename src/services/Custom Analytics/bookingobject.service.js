import API from "../../api";

export const getBookingObjectService=async()=>{
    await API.post(`ticket_management/custom_filter/`)
}