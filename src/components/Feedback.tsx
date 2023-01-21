import {Button, Container, Textarea, TextInput, Title} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const encode = (data: any) => {
    return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])).join("&");
}

export function Feedback() {
    const navigate = useNavigate();
    const [state, setState] = useState({ email: "", message: "" })

    const handleChange = (e:any) =>
    setState({...state, [e.target.name]: e.target.value })

    const handleSubmit = (e:any) => {
        e.preventDefault()

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "feedbackForm", ...state })
        })
        .then(() => navigate("/success"))
        .catch(error => alert(error))
    }

    return (
        <Container size="sm">
            <Title align="center">
                Send your feedback
            </Title>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type="hidden"
                    name="form-name"
                    value="feedbackForm"/>
                <TextInput
                    type="email"
                    name="email"
                    label="Email"
                    mt="md"
                    value={state.email}
                    onChange={handleChange}
                    withAsterisk/>
                <Textarea
                    name="message"
                    label="Your message"
                    mt="md"
                    value={state.message}
                    onChange={handleChange}
                    withAsterisk></Textarea>
                <Button type="submit" mt="md">Submit</Button>
            </form>
        </Container>
    )
}