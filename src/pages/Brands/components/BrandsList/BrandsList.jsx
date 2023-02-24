import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import ResponsiveTable from "../../../../components/ResponsiveTable/ResponsiveTable";
import { fetchCategories } from "../../../../http/productApi";
import {
    hideAppLoader,
    showAppLoader,
} from "../../../../store/appReducer/actions";
import $host from "../../../../http";
const useStyles = makeStyles(
    (theme) => ({
        [theme.breakpoints.up("md")]: {
            colName: {
                minWidth: 300,
            },
            colPrice: {
                width: 300,
            },
            colPublished: {
                width: 200,
            },
            colType: {
                width: 300,
            },
            colDate: {
                width: 200,
            },
        },
        colAttribute: {
            width: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        colFill: {
            padding: 0,
            width: "100%",
        },
        colName: {
            wordBreak: "break-all",
            "&$colNameFixed": {
                width: 300,
            },
        },
        colAvatar: {
            wordBreak: "break-all",
        },
        colNameFixed: {},
        colNameHeader: {
            // marginLeft: AVATAR_MARGIN,
        },
        colNameWrapper: {
            display: "block",
        },
        colPrice: {
            textAlign: "right",
        },
        colPublished: {},
        colType: {
            minWidth: "300px",
            wordBreak: "break-all",
        },
        link: {
            cursor: "pointer",
        },
        table: {
            tableLayout: "fixed",
        },
        tableContainer: {
            overflowX: "scroll",
        },
        textLeft: {
            textAlign: "left",
        },
        textRight: {
            textAlign: "right",
        },
        productName: {
            cursor: "pointer",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
        },
        width160: {
            width: "160px",
        },
    }),
    { name: "ProductList" }
);

const BrandsList = memo(({ search }) => {
    const [data, setData] = React.useState([]);
    const classes = useStyles();
    const navigate = useNavigate();
    // const categories = useSelector((state) => state.categories);
    const [brands, setBrands] = useState([]);
    console.log(brands);

    useEffect(
        () =>
            $host
                .get("dashboard/brands/")
                .then((res) => setBrands(res.data.results))
                .catch((error) => console.error(error)),
        []
    );

    const handleRemuve = async (id) => {
        try {
            const res = await $host.delete(`dashboard/brands/${id}/`);
            setData(
                data.filter((post) => {
                return post.id != id;
            }));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={classes.tableContainer}>
            <ResponsiveTable className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox />
                        </TableCell>
                        <TableCell style={{ width: "20px" }}>ID</TableCell>
                        <TableCell style={{ width: "200px" }}>Марка</TableCell>
                        <TableCell>Создан</TableCell>
                        <TableCell>Обновлен</TableCell>
                        <TableCell style={{ textAlign: "center" }}>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {brands
                        ?.filter((item) =>
                            search?.toLowerCase() === ""
                                ? item
                                : item.name?.toLowerCase().includes(search?.toLowerCase()) ||
                                String(item.id)?.toLowerCase().includes(search.toLowerCase())
                        )
                        .map(
                            brand =>
                                <TableRow key={brand.id}>
                                    <TableCell padding="checkbox">
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell style={{ width: "20px" }}>{brand.id}</TableCell>
                                    <TableCell>
                                        <img height={30} src={brand.images} alt="brand_image" />
                                    </TableCell>
                                    <TableCell>{brand.created_at}</TableCell>
                                    <TableCell>{brand.updated_at}</TableCell>
                                    <TableCell style={{ width: "100%", display: "flex", alignItems: "center", gap: "5px", justifyContent: "center" }}>
                                        <ion-icon onClick={() => navigate(`/brands/edit/${brand.id}`)} name="create-outline"></ion-icon>
                                        <ion-icon onClick={() => handleRemuve(brand.id)} name="trash-outline"></ion-icon>
                                    </TableCell>
                                </TableRow>
                        )}
                </TableBody>
            </ResponsiveTable>
        </div>
    );
});

export default BrandsList;
