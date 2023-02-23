import {
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@saleor/macaw-ui";
import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "../components/Checkbox/Checkbox";
import ResponsiveTable from "../components/ResponsiveTable/ResponsiveTable";
import $host from "../http";
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
  { name: "SliderList" }
);

const SliderList = memo(() => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [sliders, setSliders] = useState([]);
  console.log(sliders);
  useEffect(
    () =>
      $host
        .get("dashboard/sliders/")
        .then((res) => setSliders(res.data.results))
        .catch((error) => console.error(error)),

    []
  );

  return (
    <div className={classes.tableContainer}>
      <ResponsiveTable className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell style={{ width: "20px" }}>Id</TableCell>
            <TableCell>Названия слайдера</TableCell>
            <TableCell>Изображения слайдера</TableCell>
            <TableCell>Время создания</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sliders.map((slider) => (
            <TableRow key={slider.id}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell style={{ width: "20px" }}>{slider.id}</TableCell>
              <TableCell>
                <a style={{ color: "aqua" }} href={slider.url}>
                  {slider.url}
                </a>
              </TableCell>
              <TableCell>
                <img src={slider.images} alt={slider.slug} height={60} />
              </TableCell>
              <TableCell>{slider.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ResponsiveTable>
    </div>
  );
});

export default SliderList;
