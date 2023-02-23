import homeIcon from "../../assets/images/menu-home-icon.svg";
import catalogIcon from "../../assets/images/menu-catalog-icon.svg";
import ordersIcon from "../../assets/images/menu-orders-icon.svg";
import customerIcon from "../../assets/images/menu-customers-icon.svg";
import discountsIcon from "../../assets/images/menu-discounts-icon.svg";

const MenuStructure = () => {

    return [
        {
            ariaLabel: "home",
            iconSrc: homeIcon,
            label: "Главная",
            id: "home",
            url: "/"
        },
        {
            ariaLabel: "catolog",
            iconSrc: catalogIcon,
            label: "Каталог",
            id: "catalog",
            children: [
                {
                    ariaLabel: "products",
                    label: "Товары",
                    id: "products",
                    url: "/products",
                },
                {
                    ariaLabel: "categories",
                    label: "Категории",
                    url: "/categories",
                    id: "categories"
                },
                {
                    ariaLabel: "sliders",
                    label: "Sliders",
                    url: "/sliders",
                    id: "sliders"
                },
                {
                    ariaLabel: "brands",
                    label: "Brands",
                    url: "/brands",
                    id: "brands"
                },

            ]
        },
        {
            ariaLabel: "orders",
            label: "Товары",
            id: "orders",
            iconSrc: ordersIcon,
            children: [
                {
                    ariaLabel: "orders",
                    label: "Атрибут продукта",
                    id: "orders",
                    url: "/product_attribute",
                },
                {
                    ariaLabel: "installments",
                    label: "Рассрочки",
                    id: "installments",
                    url: "/installments-orders"
                }
            ]
        },
        {
            ariaLabel: "customers",
            label: "Клиенты",
            id: "customers",
            url: "/customers",
            iconSrc: customerIcon
        },
        {
            ariaLabel: "aksiya",
            label: "Aksiya",
            id: "aksiya",
            url: "/aksiya",
            iconSrc: discountsIcon
        }
    ]
}

export default MenuStructure()
    ;