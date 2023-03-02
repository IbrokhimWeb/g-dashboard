import {
    Box,
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
  import { Backlink } from "@saleor/macaw-ui";
  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import CardSpacer from "../../components/CardSpacer";
  import Container from "../../components/Container";
  import PageHeader from "../../components/PageHeader";
  import $host from "../../http";
  import CardTitle from "../../components/CardTitle";
import FormSpacer from "../../components/FormSpacer/FormSpacer";
import { formToJSON } from "axios";
  
  const useStyles = makeStyles((theme) => ({
    mainCardInfo: {
      paddingTop: 0,
      padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
    },
  }));
  
  const ProductTypeEdit = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [newData, setNewData] = useState(null);
    console.log(newData);
    const [productsTypeAttribute, setProductsTypeAttribute] = useState(null);
    const [isProductsTypeAttribute, setIsProductsTypeAttribute] = useState(newData?.product_type_attribute);
    const classes = useStyles(props);


  const handleEdit = async () => {
      const formData = new FormData();
      formData.append("name", newData.name);
      formData.append('product_type_attribute', newData.product_type_attribute);
      const res = await $host.patch(`/dashboard/product-type/${params?.id}/`, formData)
      res?.statusText ? navigate("/product-type") : alert("Nimadir hato ketdi");


  };
  
    useEffect(() => {
      $host
        .get("dashboard/product-type-attribute/")
        .then((res) => setProductsTypeAttribute(res.data.results))
        .catch((error) => console.error(error));
    }, []);

    return (
      <Container>
        <Backlink onClick={() => navigate("/product-type")}>Тип продуктов</Backlink>
        <PageHeader title="Редактировать тип продукта" />
        <div>
        <Card>
        <CardTitle title={"Основная информация"} />
                    <div className={classes.mainCardInfo}>
                    <TextField fullWidth placeholder={"Name"} name="name" value={newData?.name} onChange={(e) =>
                setNewData((prev) => ({ ...prev, name: e.target.value }))} />
          <CardSpacer />
          <FormControl fullWidth>
                <InputLabel id="demo-simple-gh-label">Тип аттрибутов продукта</InputLabel>
                <Select
                labelId="demo-simple-gh-label"
                id="demo-simple-select"
                value={isProductsTypeAttribute}
                onChange={e => {
                    setIsProductsTypeAttribute(e.target.value);
                    setNewData(prev => ({
                    ...prev, product_type_attribute
                         : e.target.value
                                }))
                                }}
                                >
                                    {
                    productsTypeAttribute?.map((name) => (
                      <MenuItem 
                        key={name.id} 
                        value={name.name}>
                          {name.name}
                        </MenuItem>
                    ))
                  }   

                  </Select>
            </FormControl>
            <FormSpacer />
            </div>
            </Card>
          <Button
            style={{ float: "right", marginTop: "10px", padding: "10px 70px" }}
            variant="contained"
            onClick={handleEdit}
          >
            Save
          </Button>
        </div>
      </Container>
    );
  };
  
  export default ProductTypeEdit;
  