import { Card } from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import Container from "../../components/Container";
import PageHeader from "../../components/PageHeader";
import BrandsHeader from "./components/BrandsHeader/BrandsHeader";
import BrandsList from "./components/BrandsList/BrandsList";

const BrandsPage = () => {
    const navigate = useNavigate();

    const [search, setSearch] = React.useState("");

    return (
        <>
            <Container>
                <PageHeader title={"Brands"}>
                    <Button variant="primary" color="primary" onClick={() => navigate("/category/add/")} style={{ width: "100%" }}>
                        Создать Brands
                    </Button>
                </PageHeader>
                <Card>
                    <BrandsHeader setSearch={setSearch} />
                    <BrandsList search={search} />
                </Card>
            </Container>
        </>
    );
};

export default BrandsPage;
