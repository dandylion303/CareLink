import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";

const URL = import.meta.env.VITE_API_URL

export const NewRequestForm = ()=>{
    const {
        register,
        handleSubmit, 
        formState:{errors}
    } = useForm()
}