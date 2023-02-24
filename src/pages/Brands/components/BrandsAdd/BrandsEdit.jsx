import { Button, Card, Checkbox, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { Autocomplete, Backlink } from "@saleor/macaw-ui";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CardSpacer from "../../../../components/CardSpacer";
import CardTitle from "../../../../components/CardTitle";
import Container from "../../../../components/Container";
import FormSpacer from "../../../../components/FormSpacer/FormSpacer";
import PageHeader from "../../../../components/PageHeader";
import $host from "../../../../http";

const useStyles = makeStyles(
    theme => ({
        mainCardInfo: {
            paddingTop: 0,
            padding: `${theme.spacing(3)} ${theme.spacing(4)}`
        },
    })
);



const BrandsEdit = (props) => {
    const navigate = useNavigate()
    const params = useParams();
    const [file, setFile] = useState(null)
    const [data, setData] = useState(null);
    const classes = useStyles(props);

    const sendToPreviousURL = () => {
        navigate("/brands")
    }

    useEffect(() => {
        (async () =>
            await $host.get("dashboard/brands/")
                .then((res) => setData({ ...res.data.results.find(e => e.id === +params.id) }))
                .catch((error) => console.error(error))
        )();
    }, []);

    const handleChange = ({ name, value }) => {
        setData(prevData => ({ ...prevData, [name]: value }))
    }


    const handleEdit = async () => {
        const formData = new FormData();
        formData.append("url", data.url);
        formData.append("category", data.category);
        formData.append("product", data.product);
        formData.append("images", file);
        const res = await $host.post(`/dashboard/brands/`, formData)
        res?.statusText ? navigate("/brands") : alert("Nimadir hato ketdi");
    }



    return (
        <Container>
            <Backlink onClick={() => sendToPreviousURL()}>Brands</Backlink>
            <PageHeader title="Редактировать бренд" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField fullWidth placeholder={"url бренда"} name="url" value={data?.url} onChange={(e) => handleChange(e.target)} />
                        <FormSpacer />
                        <TextField fullWidth placeholder={"категория бренда"} name="category" value={data?.category} onChange={(e) => handleChange(e.target)} />
                        <FormSpacer />
                        <TextField fullWidth placeholder={"продукт бренда"} name="product" value={data?.product} onChange={(e) => handleChange(e.target)} />
                        <FormSpacer />
                        <Button variant="contained" component="label">Upload File<input type="file" onChange={(e) => setFile(e.target.files[0])} multiple hidden /></Button>
                        <img style={{ borderRadius: "10px", marginTop: "10px", marginLeft: "20px", marginBottom: "-30px" }} width={70} src={data?.file} alt="" />
                    </div>
                </Card>
                <CardSpacer />
                <Button onClick={handleEdit}>Сохранить</Button>
            </div>
        </Container>
    );
}

export default BrandsEdit;
