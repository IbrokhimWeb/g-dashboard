import { Button, Card, Checkbox, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { Autocomplete, Backlink } from "@saleor/macaw-ui";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardSpacer from "../../components/CardSpacer";
import CardTitle from "../../components/CardTitle";
import Container from "../../components/Container";
import FormSpacer from "../../components/FormSpacer/FormSpacer";
import PageHeader from "../../components/PageHeader";
import $host from "../../http";

const useStyles = makeStyles(
    theme => ({
        mainCardInfo: {
            paddingTop: 0,
            padding: `${theme.spacing(3)} ${theme.spacing(4)}`
        },
    })
);



const CategoriesEdit = (props) => {
    const params = useParams();
    const [file, setFile] = useState(null)
    const categories = useSelector((state) => state.categories);
    const [data, setData] = useState(null);
    const classes = useStyles(props);

    useEffect(() => {
        (async () =>
            await $host.get("dashboard/categories/")
                .then((res) => setData({ ...res.data.results.find(e => e.id === +params.id) }))
                .catch((error) => console.error(error))
        )();
    }, []);

    const handleChange = ({ name, value }) => {
        setData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleEdit = () => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('slug', data.slug);
        formData.append("description", data.description);
        formData.append("is_active", data.is_active);
        formData.append("background_image", file);
        const request = new XMLHttpRequest();
        request.open("POST", "https://yruoebgair.tk/dashboard/categories/");
        request.send(formData);
    }

    return (
        <Container>
            <Backlink>Категории</Backlink>
            <PageHeader title="Создать новую Категории" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField fullWidth placeholder={"Название категории"} name="name" value={data?.name} onChange={(e) => handleChange(e.target)} />
                        <TextField fullWidth placeholder={"slug категории"} name="slug" value={data?.slug} onChange={(e) => handleChange(e.target)} />
                        <FormSpacer />
                        <TextField multiline fullWidth placeholder="description категории" name="description" value={data?.description} onChange={(e) => handleChange(e.target)} />
                        <Checkbox checked={data?.is_active} onChange={(e) => setData(prev => ({ ...prev, is_active: e.target.checked }))} />
                        <Button variant="contained" component="label">Upload File<input type="file" onChange={(e) => setFile(e.target.files[0])} multiple hidden /></Button>
                    </div>
                </Card>
                <CardSpacer />
                <Card>
                    <CardTitle title={"Родительское категория"} />
                    <div className={classes.mainCardInfo}>
                        <Autocomplete
                            fullWidth
                            choices={categories}
                            onChange={(e) => console.log(e)}
                            label="Родительское категория"
                        >
                            {({ highlightedIndex, getItemProps }) =>
                                categories.map((category, categoryIndex) => (
                                    category.isParent &&
                                    <MenuItem selected={highlightedIndex === categoryIndex} {...getItemProps({ item: category, index: categoryIndex })}>
                                        {category.name}
                                    </MenuItem>
                                ))
                            }
                        </Autocomplete>
                    </div>
                </Card>
                <Button onClick={handleEdit}>Edit</Button>
            </div>
        </Container>
    );
}

export default CategoriesEdit;
