import { Button, Card, Checkbox, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { Autocomplete, Backlink } from "@saleor/macaw-ui";
import React, { useState } from "react";
import { useSelector } from "react-redux";
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



const CategoriesAdd = (props) => {
    const [file, setFile] = useState(null)
    const categories = useSelector((state) => state.categories);
    const classes = useStyles(props);


    const [newData, setNewData] = React.useState({
        name: "",
        slug: "",
        description: "",
        is_active: false,
    });
    const handleChange = ({ name, value }) => {
        setNewData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('name', newData.name);
        formData.append('slug', newData.slug);
        formData.append("description", newData.description);
        formData.append("is_active", newData.is_active);
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
                        <TextField fullWidth label={"Название категории"} name="name" value={newData?.name} onChange={(e) => handleChange(e.target)} />
                        <TextField fullWidth label={"slug категории"} name="slug" value={newData?.slug} onChange={(e) => handleChange(e.target)} />
                        <FormSpacer />
                        <TextField multiline fullWidth label="description категории" name="description" value={newData?.description} onChange={(e) => handleChange(e.target)} />
                        <Checkbox checked={newData?.is_active} onChange={(e) => setNewData(prev => ({ ...prev, is_active: e.target.checked }))} />
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
                <Button onClick={handleSubmit}>Save</Button>
            </div>
        </Container>
    );
}

export default CategoriesAdd;
