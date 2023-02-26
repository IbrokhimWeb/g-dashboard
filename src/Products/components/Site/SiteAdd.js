import { Button, Card, Checkbox, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { Autocomplete, Backlink } from "@saleor/macaw-ui";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardSpacer from "../../../components/CardSpacer";
import CardTitle from "../../../components/CardTitle";
import Container from "../../../components/Container";
import FormSpacer from "../../../components/FormSpacer/FormSpacer";
import PageHeader from "../../../components/PageHeader";
import $host from "../../../http";

const useStyles = makeStyles(
    theme => ({
        mainCardInfo: {
            paddingTop: 0,
            padding: `${theme.spacing(3)} ${theme.spacing(4)}`
        },
    })
);



const SiteAdd = (props) => {
    const navigate = useNavigate()
    const classes = useStyles(props);

    const sendToPreviousURL = () => {
        navigate("/site-settings")
    }


    const [newData, setNewData] = React.useState({
        description: "",
        link: ""
    });
    const handleChange = ({ name, value }) => {
        setNewData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('link', newData.link);
        formData.append('description', newData.description);
        const res = await $host.post(`/dashboard/site-settings/`, formData)
        res?.statusText ? navigate("/site-settings") : alert("Nimadir hato ketdi");
    }

    return (
        <Container>
            <Backlink onClick={() => sendToPreviousURL()}>Ссылки</Backlink>
            <PageHeader title="Создать новую ссылку" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField type="url" fullWidth placeholder={"Ссылка"} name="link" value={newData?.link} onChange={(e) => handleChange(e.target)} />
                        <CardSpacer />
                        <TextField type="string" fullWidth placeholder={"Описание"} name="description" value={newData?.description} onChange={(e) => handleChange(e.target)} />
                    </div>
                </Card>
                <CardSpacer />
                <Button onClick={handleSubmit}>Добавить</Button>
            </div>
        </Container>
    );
}

export default SiteAdd;
