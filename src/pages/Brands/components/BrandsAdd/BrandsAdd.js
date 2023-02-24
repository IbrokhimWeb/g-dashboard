import { Button, Card, Checkbox, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { Autocomplete, Backlink } from "@saleor/macaw-ui";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardSpacer from "../../../../components/CardSpacer";
import CardTitle from "../../../../components/CardTitle";
import Container from "../../../../components/Container";
import FormSpacer from "../../../../components/FormSpacer/FormSpacer";
import PageHeader from "../../../../components/PageHeader/";
import $host from "../../../../http";

const useStyles = makeStyles(
    theme => ({
        mainCardInfo: {
            paddingTop: 0,
            padding: `${theme.spacing(3)} ${theme.spacing(4)}`
        },
    })
);



const BrandsAdd = (props) => {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const classes = useStyles(props);

    const sendToPreviousURL = () => {
        navigate("/brands")
    }


    const [newData, setNewData] = React.useState({
        url: "",
        category: "",
        product: "",
        is_active: false,
    });
    const handleChange = ({ name, value }) => {
        setNewData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("url", newData.url);
        formData.append("category", newData.category);
        formData.append("product", newData.product);
        formData.append("images", file);
        const res = await $host.post(`/dashboard/brands/`, formData)
        res?.statusText ? navigate("/brands") : alert("Nimadir hato ketdi");
    }

    return (
        <Container>
            <Backlink onClick={() => sendToPreviousURL()}>Brands</Backlink>
            <PageHeader title="Создать новый бренд" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                    <TextField
                        fullWidth
                        label={"url бренда"}
                        name="url"
                        value={newData?.url}
                        onChange={(e) => handleChange(e.target)}
                    />
                    <CardSpacer />
                    <TextField
                        fullWidth
                        label={"категория бренда"}
                        name="category"
                        value={newData?.category}
                        onChange={(e) => handleChange(e.target)}
                    />
                    <CardSpacer />
                    <TextField
                        fullWidth
                        label={"продукт бренда"}
                        name="product"
                        value={newData?.product}
                        onChange={(e) => handleChange(e.target)}
                    />
                    <CardSpacer />
                    <Button variant="contained" component="label">
                        Upload File
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            multiple
                            hidden
                        />
                    </Button>
                    <span style={{ marginLeft: "10px" }}>
                        {file ? file.name : "Выберите изображение"}
                    </span>
                    </div>
                </Card>
                <CardSpacer />
                <Button onClick={handleSubmit}>Добавить</Button>
            </div>
        </Container>
    );
}

export default BrandsAdd;
