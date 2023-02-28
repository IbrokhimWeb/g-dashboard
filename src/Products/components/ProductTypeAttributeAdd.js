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
  import { useNavigate } from "react-router-dom";
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
  
  const ProductTypeAttributeAdd = (props) => {
    const navigate = useNavigate();
    const [newData, setNewData] = useState({
        
        product_attribute: 0,
        product_type: 0,
    });
    console.log(newData);
    const [productsType, setProductsType] = useState(null);
    const [isProductsType, setIsProductsType] = useState(newData?.product_type);
    const [productsAttribute, setProductsAttribute] = useState(null);
    const [isProductsAttribute, SetIsProductsAttribute] = useState(newData?.product_attribute);
    const classes = useStyles(props);
  
      const handleSubmit = async () => {
      const res = await $host.post(`/dashboard/product-type-attribute/`, {
        product_attributes: {
          name: newData.product_attribute,
          description: ''
        },
        product_types: {
          name: newData.product_type
        },
      });
      res?.statusText ? navigate("/product-type-attribute") : alert("Nimadir hato ketdi");
    };
  
    useEffect(() => {
      $host
        .get("dashboard/product-type/")
        .then((res) => setProductsType(res.data.results))
        .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
      $host
        .get("dashboard/product-attribute/")
        .then((res) => setProductsAttribute(res.data.results))
        .catch((error) => console.error(error));
    }, []);
  
    return (
      <Container>
        <Backlink onClick={() => navigate("/product-type-attribute")}>Тип аттрибутов продукта</Backlink>
        <PageHeader title="Создать новый тип аттрибутов продукта" />
        <div>
        <div className={classes.mainCardInfo}>
          <FormControl fullWidth>
                <InputLabel id="demo-simple-gh-label">Тип продуктов</InputLabel>
                <Select
                labelId="demo-simple-gh-label"
                id="demo-simple-select"
                value={isProductsType}
                onChange={e => {
                    setIsProductsType(newData?.product_type);
                    setNewData(prev => ({
                    ...prev, product_type
                         : e.target.value
                                }))
                                }}
                                >
                                    {
                    productsType?.map((name) => (
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
            <FormControl fullWidth>
                <InputLabel id="demo-simple-gh-label">Атрибут продуктов</InputLabel>
                <Select
                labelId="demo-simple-gh-label"
                id="demo-simple-select"
                value={isProductsAttribute}
                onChange={e => {
                    SetIsProductsAttribute(newData?.product_attribute);
                    setNewData(prev => ({
                    ...prev, product_attribute
                         : e.target.value
                                }))
                                }}
                                >
                                    {
                    productsAttribute?.map((name) => (
                      <MenuItem 
                        key={name.id} 
                        value={name.name}>
                          {name.name}
                        </MenuItem>
                    ))
                  }   

                  </Select>
            </FormControl>
            </div>
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
  
  export default ProductTypeAttributeAdd;
  