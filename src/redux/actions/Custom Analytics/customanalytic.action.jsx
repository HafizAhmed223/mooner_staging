import { getBookingObjectService } from "../../../services/Custom Analytics/bookingobject.service"

export const getCustomAnalyticsObject=()=>{
    try {
        const  {data}=getBookingObjectService();
        console.log(data,"respomse data")
    } catch (error) {
        console.log(error)
    }
}