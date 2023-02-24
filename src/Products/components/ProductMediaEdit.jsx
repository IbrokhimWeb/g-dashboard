import {
  Button,
  Card,
  Checkbox,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Autocomplete, Backlink } from "@saleor/macaw-ui";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CardSpacer from "../../components/CardSpacer";
import CardTitle from "../../components/CardTitle";
import Container from "../../components/Container";
import FormSpacer from "../../components/FormSpacer/FormSpacer";
import PageHeader from "../../components/PageHeader";
import $host from "../../http";

const useStyles = makeStyles((theme) => ({
  mainCardInfo: {
    paddingTop: 0,
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  },
}));

const ProductMediaEdit = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const classes = useStyles(props);

  const [newData, setNewData] = useState({
    img_url: null,
    alt_text: "",
    is_feature: false,
    product_inventory: null,
  });
  const [products, setProducts] = useState(null)
  const handleChange = ({ name, value }) => {
    setNewData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(
    () =>
      $host.get(`dashboard/product-media/`).then((res) => console.log(res)),
    []
  );


  useEffect(
    () =>
      $host.get(`dashboard/products/`)
      .then((res) => setProducts(res.data.results))
      .catch(err => console.error(err))
      ,[]
  );

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("product_inventory", newData.product_inventory);
    formData.append("is_feature", newData.is_feature);
    formData.append("alt_text", newData.alt_text);
    formData.append("img_url", newData.img_url);

    const res = await $host.post(
      `/dashboard/product-media/${params}/`,
      formData
    );
    res?.statusText ? navigate("/product-media") : alert("Nimadir hato ketdi");
  };

  return (
    <Container>
      <Backlink onClick={() => navigate("/categories")}>Категории</Backlink>
      <PageHeader title="Создать новую Категории" />
      <div>
        <Card>
          <CardTitle title={"Основная информация"} />
          <div className={classes.mainCardInfo}>
            <TextField
              fullWidth
              label={"alt_text"}
              name="alt_text"
              value={newData?.alt_text}
              onChange={(e) => handleChange(e.target)}
            />
            <Checkbox
              checked={newData?.is_feature}
              onChange={(e) =>
                setNewData((prev) => ({ ...prev, is_active: e.target.checked }))
              }
            />
            is_feature <br />
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                onChange={(e) => newData(prev => ({...prev, img_url:e.target.files[0]}))}
                multiple
                hidden
              />
            </Button>
            <span style={{ marginLeft: "10px" }}>
              {newData.img_url ? newData.img_url.name : "Выберите изображение"}
            </span>
          </div>
        </Card>
        <CardSpacer />
        <FormControl fullWidth>
                <InputLabel id="demo-simple-gh-label">Products</InputLabel>
                <Select
                  labelId="demo-simple-gh-label"
                  id="demo-simple-select"
                  value={newData.product_inventory}
                  onChange={(e) => {
                    newData(prev => ({...prev, }));
                    setNewData(prev => ({ ...prev, product_inventory:e.target.value }))}}
                >
                  {
                    products?.map(({ name, id }) => (<MenuItem key={id} value={name}>{name}</MenuItem>))
                  }

                </Select>
              </FormControl>
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

export default ProductMediaEdit;
