import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import LoginPage from "./Auth/LoginPage/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AppSidebar from "./layout/Sidebar";
import BrandsPage from "./pages/Brands/BrandsPage";
import BrandsAdd from "./pages/Brands/components/BrandsAdd/BrandsAdd";
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
import ProductAttributeAdd from "./Products/components/ProductAttributeAdd";
import AttributeValue from "./Products/components/AtributeValue";
import Attribute from "./Products/components/Atribute";
import Brand from "./Products/components/Brand";
import ProductInventors from "./Products/components/ProductInventors";
import ProductMedia from "./Products/components/ProductMedia";
import ProductStocks from "./Products/components/ProductStocks";
import ProductTypeAttributes from "./Products/components/ProductTypeAttribute";
import ProductType from "./Products/components/ProductType";
import Stocks from "./Products/components/Stocks";
import Users from "./Products/components/Users";
import UsersAdd from "./Products/components/UsersAdd";
import UsersEdit from "./Products/components/UsersEdit"
import Checkout from "./Products/components/Checkout";

import HomePage from "./pages/HomePage";
import SliderAdd from "./Slider/SliderAdd";
import SliderEdit from "./Slider/SliderEdit";

import ProductEdit from "./Products/ProductEdit";
import BrandsEdit from "./pages/Brands/components/BrandsAdd/BrandsEdit";


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
                    <Route path="product-type" element={<ProductType />} />
                    <Route path="stocks" element={<Stocks />} />

                    <Route path="users" element={<Users />} />
                    <Route path="users/add" element={<UsersAdd />} />
                    <Route path="users/edit/:id" element={<UsersEdit />} />


                    <Route path="checkout" element={<Checkout />} />





                    <Route path="product-attribute-values" element={<ProductDetailPage />} />
                    <Route path="products/add" element={<ProductAdd />} />
                    <Route path="products/edit/:id" element={<ProductEdit />} />
                    


                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="category/:id" element={<CategoriesUpdatePage />} />
                    <Route path="category/add" element={<CategoriesAdd />} />
                    <Route path="category/edit/:id" element={<CategoriesEdit />} />




                    <Route path="sliders" element={<SliderList />} />
                    <Route path="sliders/add" element={<SliderAdd />} />
                    <Route path="sliders/edit/:id" element={<SliderEdit />} />



                    <Route path="sliders" element={<SliderList />} />

                    <Route path="brands" element={<BrandsPage />} />
                    <Route path="brands/add" element={<BrandsAdd />} />
                    <Route path="brands/edit/:id" element={<BrandsEdit />} />                    

                    <Route path="aksiya" element={<BrandsPage />} />

                    <Route path="product_attribute" element={<ProductAttribute />} />
                    <Route path="product-attribute/edit/:id" element={<ProductAttributeEdit />} />
                    <Route path="product-attribute/add" element={<ProductAttributeAdd />} />
                </Route>
            </Route>
            <Route path="/auth" element={<Auth />}>
                <Route path="login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;