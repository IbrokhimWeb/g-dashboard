import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import $host from "../../http";

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        paddingLeft: theme.spacing(4),
        borderBottom: "1px solid rgba(37, 41, 41, 0.1)",
    },
    headerTitle: {
        fontSize: "1.6rem",
        fontWeight: 500,
        margin: 0,
        padding: `0 ${theme.spacing(1)}`,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1.4),
        borderBottom: "2px solid #000",
    },
    headerSearch: {
        padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
        display: "flex",
    },
    headerInput: {
        flex: 1,
    },
    headerInputField: {
        padding: "10.5px 12px",
    },
}));

const FilterBar = (props) => {
    const classes = useStyles(props);
    const navigate = useNavigate();
    const [reload, setReload] = React.useState(1);
    const [data, setData] = React.useState([]);
    const [search, setSearch] = React.useState("");
    

    React.useEffect(() => {
        (async () => {
            try {
                const res = await $host.get(`dashboard/product-attribute/`);
                setData(res.data.results);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [reload]);

    const handleRemuve = async (id) => {
        try {
            const res = await $host.delete(`dashboard/product-attribute/${id}/`);
            setReload((prev) => prev + 1);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={classes.headerBorder}>
            <div className={classes.header} >
                <h3 className={classes.headerTitle}>Атрибут продукта</h3>
            </div>
            <div className={classes.headerSearch}>
                <TextField
                    className={classes.headerInput}
                    inputProps={{ placeholder: "Поиск атрибутов" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <TableContainer className={classes.table}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Название</TableCell>
                        <TableCell style={{ textAlign: "center"}}>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                        ?.filter((item) => {
                            return search?.toLowerCase() === ""
                                ? item
                                : item.name?.toLowerCase().includes(search.toLowerCase()) ||
                                String(item.id)
                                    ?.toLowerCase()
                                    .includes(search.toLowerCase());
                        })
                        .map(({ id, name }) =>
                                <TableRow key={id}>
                                    <TableCell> {id} </TableCell>
                                    <TableCell onClick={() => navigate(`/product_attribute/${id}`)}> {name} </TableCell>
                                    <TableCell
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "5px",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <ion-icon
                                            onClick={() => navigate(`/product-attribute/edit/${id}`) }
                                            name="create-outline"
                                        ></ion-icon>
                                        <ion-icon
                                            onClick={() => handleRemuve(id)}
                                            name="trash-outline"
                                        ></ion-icon>
                                    </TableCell>
                                </TableRow>
                            
                        )}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default FilterBar;
