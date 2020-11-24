import React from "react";
import { Nomination } from "../models/nomination";

interface ListProps {
    data: Nomination[],
    onClick: React.Dispatch<React.SetStateAction<Nomination | undefined>>
}
 
export function List({ data, onClick }: ListProps) { 
  return ( 
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Quantity</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {data.map(
                nomination => (
                    <tr key={nomination.id}>
                        <td>{nomination.id}</td>
                        <td>{nomination.quantity}</td>
                        <td>{nomination.status}</td>  
                        <td>
                            <button onClick={() => onClick(nomination)}>Edit</button>    
                        </td>  
                    </tr>
                )
            )}
        </tbody>
    </table>
  );
}