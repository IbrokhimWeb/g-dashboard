import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import LoginPage from "./Auth/LoginPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AppSidebar from "./layout/Sidebar";
import BrandsPage from "./pages/Brands/BrandsPage";
import CategoriesAdd from "./pages/CategoriesAdd/CategoriesAdd";
import CategoriesEdit from "./pages/CategoriesAdd/CategoriesEdit";
import CategoriesPage from "./pages/CategoriesPage";
import CategoriesUpdatePage from "./pages/CategoriesUpdatePage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import Products from "./Products";
import ProductAdd from "./Products/components/ProductAdd/ProductAdd";
import SliderList from "./Slider/Slider";
import ProductAttribute from "./Products/components/ProductAttribute";
import ProductAttributeEdit from "./Products/components/ProductAttributeEdit";
import AttributeValue from "./Products/components/AtributeValue";
import Attribute from "./Products/components/Atribute";
import Brand from "./Products/components/Brand";
import ProductInventors from "./Products/components/ProductInventors";
import ProductMedia from "./Products/components/ProductMedia";
import ProductStocks from "./Products/components/ProductStocks";
import ProductTypeAttributes from "./Products/components/ProductTypeAttribute";

import HomePage from "./pages/HomePage";


const AppRoutes = () => {
    const isAuth = useSelector((state) => state.user.isAuth);

    return (
        <Routes>
            <Route element={<PrivateRoute isAuth={isAuth} />}>
                <Route path="/" element={<AppSidebar />}>
                    <Route index element={<HomePage />} />
                    <Route path="products" element={<Products />} />


                    <Route path="attribute-values" element={<AttributeValue />} />
                    <Route path="attribute" element={<Attribute />} />
                    <Route path="product-brand" element={<Brand />} />
                    <Route path="product-inventors" element={<ProductInventors />} />
                    <Route path="product-media" element={<ProductMedia />} />
                    <Route path="product-stocks" element={<ProductStocks />} />
                    <Route path="product-type-attribute" element={<ProductTypeAttributes />} />





                    <Route path="products/:id" element={<ProductDetailPage />} />
                    <Route path="products/add" element={<ProductAdd />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="category/:id" element={<CategoriesUpdatePage />} />
                    <Route path="category/add" element={<CategoriesAdd />} />
                    <Route path="category/edit/:id" element={<CategoriesEdit />} />
                    <Route path="sliders" element={<SliderList />} />
                    <Route path="brands" element={<BrandsPage />} />
                    <Route path="aksiya" element={<BrandsPage />} />
                    <Route path="product_attribute" element={<ProductAttribute />} />
                    <Route path="product-attribute/edit/:id" element={<ProductAttributeEdit />} />
                </Route>
            </Route>
            <Route path="/auth" element={<Auth />}>
                <Route path="login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;