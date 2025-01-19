import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React from "react";

const bookingData=[
    {
        id:1,
        name:"kamran",
        email:"kami@gmail.com",
        address:"Lahore"
    }
]
const BookingTable=()=>{
    return(
       <>
       <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Address</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bookingData.map((item,index)=>(
                    <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell >{item.address}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
       </TableContainer>
       </>
    )
}

export default BookingTable;