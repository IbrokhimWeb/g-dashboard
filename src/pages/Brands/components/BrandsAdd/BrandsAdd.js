import { Box, Button, Card, Checkbox, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import { Backlink } from "@saleor/macaw-ui";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardSpacer from "../../../../components/CardSpacer";
import Container from "../../../../components/Container";
import PageHeader from "../../../../components/PageHeader";
import $host from "../../../../http";
import CardTitle from "../../../../components/CardTitle";

const useStyles = makeStyles((theme) => ({
    mainCardInfo: {
        paddingTop: 0,
        padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
    },
}));


const BrandsAdd = (props) => {
    const navigate = useNavigate();
    const [newData, setNewData] = useState({
        url: "",
        category: 0,
        product: 0
    });
    console.log(newData);
    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    const [isCategories, setIsCategories] = useState(newData?.category);
    const [isProducts, SetIsProducts] = useState(newData?.product);
    const classes = useStyles(props);

    const handleSubmit = async () => {
        const res = await $host.post(`/dashboard/brands/`, newData);
        res?.statusText ? navigate("/brands") : alert("Nimadir hato ketdi");
    };

    useEffect(() => {
        $host.get("dashboard/categories/")
          .then((res) => setCategories(res.data.results))
          .catch((error) => console.error(error))
      }, []);

    useEffect(() => {
        $host.get("dashboard/products/")
            .then((res) => setProducts(res.data.results))
            .catch((error) => console.error(error))
    }, []);

    return (
        <Container>
            <Backlink onClick={() => navigate("/brands")}>Бренды</Backlink>
            <PageHeader title="Создать новый бренд" />
            <div>
                <Card>
                    <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                        <TextField fullWidth placeholder={"url бренда"} name="url" value={newData?.url} onChange={(e) => setNewData(prev => console.log(({ ...prev, name: e.target.value })))} />
                        <CardSpacer />
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Категория бренда</InputLabel>
                                {/* <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={e => {
                                        setAge(e.target.value);
                                        setNewData(prev => ({ ...prev, category: e.target.value }))
                                    }}
                                >
                                    {
                                        ["process", "success", "failed", "deleted"].map((e, i) => (
                                            <MenuItem key={i} value={e}>{e}</MenuItem>
                                        ))
                                    }

                                </Select> */}
                                <Select
                                    labelId="demo-simple-gh-label"
                                    id="demo-simple-select"
                                    value={isCategories}
                                    onChange={e => {
                                        setIsCategories(e.target.value);
                                        setNewData(prev => ({
                                            ...prev, category
                                                : e.target.value
                                        }))
                                    }}
                                >
                                    {
                                        categories?.map(({ name, id }) => (<MenuItem key={id} value={id}>{name}</MenuItem>))
                                    }   

                                </Select>
                            </FormControl>
                            <CardSpacer />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-gh-label">Продукт бренда</InputLabel>
                                <Select
                                    labelId="demo-simple-gh-label"
                                    id="demo-simple-select"
                                    value={isProducts}
                                    onChange={e => {
                                        SetIsProducts(e.target.value);
                                        setNewData(prev => ({
                                            ...prev, product
                                                : e.target.value
                                        }))
                                    }}
                                >
                                    {
                                        products?.map(({ name, id }) => (<MenuItem key={id} value={id}>{name}</MenuItem>))
                                    }   

                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </Card>

                <Button
                    style={{ float: "right", marginTop: "10px", padding: "10px 70px" }}
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </div>
        </Container>
    );
};

export default BrandsAdd;
