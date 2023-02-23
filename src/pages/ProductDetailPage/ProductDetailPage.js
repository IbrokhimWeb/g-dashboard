import { Card, TextField } from "@material-ui/core";
import { Backlink, makeStyles } from "@saleor/macaw-ui";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import FormSpacer from "../../components/FormSpacer/FormSpacer";
import PageHeader from "../../components/PageHeader";
import { fetchProductById } from "../../http/productApi";
import { hideAppLoader, showAppLoader } from "../../store/appReducer/actions";
import useRichText from "../../utils/richText/useRichText";

const useStyles = makeStyles(
    theme => ({
        productGrid: {
            display: "grid",
            gridRowGap: theme.spacing(3),
            gridColumnGap: theme.spacing(3),
            gridTemplateColumns: "9fr 4fr"
        },
        mainCardInfoHeader: {
            display: "flex",
            alignItems: "center",
            padding: `${theme.spacing(3)} ${theme.spacing(4)}`
        },
        mainCardInfoHeaderTitle: {
            fontSize: "1.7rem",
            fontWeight: 600,
            lineHeight: 1.334,
            letterSpacing: "0.02rem"
        },
        mainCardInfo: {
            paddingTop: 0,
            padding: `${theme.spacing(3)} ${theme.spacing(4)}`
        }
    })
)

const ProductDetailPage = (props) => {
    const { id } = useParams();
    const classes = useStyles(props);
    const [ loading, setLoading ] = useState(true);
    const [ productDetail, setProductDetail ] = useState({});
    const dispatch = useDispatch();
    const [ mainInfo, setMainInfo ] = useState({
        name: "",
        description: ""
    });

    const fetchProduct = async () => {
        dispatch(showAppLoader());
        const product = await fetchProductById(id);
        setProductDetail(product);
        setLoading(false);
        console.log(product)
        dispatch(hideAppLoader());
        document.title = product.product?.name;
    } 

    const handleChange = (e) => {
        setMainInfo({...mainInfo, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        setMainInfo({...mainInfo, 
            name: productDetail.product?.name,
            description: productDetail.product?.description   
        });
    }, [productDetail]);

    useEffect(() => {
        fetchProduct();
    }, []);

    if(loading) return null;

    return (
        <Container>
            <Backlink href={"/products"}>Товары</Backlink>
            <PageHeader title={productDetail.product?.name} />
            <div className={classes.productGrid}>
                <div>
                    <Card>
                        <div className={classes.mainCardInfoHeader}>
                            <div>
                                <span className={classes.mainCardInfoHeaderTitle}>Основная информация</span>
                            </div>
                        </div>
                        <div className={classes.mainCardInfo}>
                            <TextField
                                fullWidth
                                label="Название"
                                value={mainInfo.name}
                                name="name"
                                onChange={handleChange}
                            />
                            <FormSpacer/>
                            <TextField
                                multiline 
                                fullWidth
                                label="Описание"
                                name="description"
                                value={mainInfo.description}
                                onChange={handleChange}
                            />
                            <FormSpacer/>
                            <TextField
                                multiline 
                                fullWidth
                                label="Описание"
                                name="description"
                                value={mainInfo.description}
                                onChange={handleChange}
                            />
                        </div>
                    </Card>
                </div>
                <div>
                    <Card>
                        <div className={classes.mainCardInfoHeader}>
                            <div>
                                <span className={classes.mainCardInfoHeaderTitle}>Настройки товара</span>
                                    
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Container>
    );
}

export default ProductDetailPage;