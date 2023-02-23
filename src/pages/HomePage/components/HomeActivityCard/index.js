import { Card, CardContent, List, ListItem, ListItemText, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CardTitle from "../../../../components/CardTitle";

const useStyles = makeStyles(
    {
      loadingProducts: {
        paddingBottom: "10px",
        paddingTop: "10px",
      },
      noProducts: {
        paddingBottom: "16px",
        paddingTop: "16px",
      },
      listItem: {
        paddingLeft: 0,
      },
    },
    { name: "HomeActivityCard" },
);
  

const HomeActivityCard = () => {
    const classes = useStyles();

    return (
        <Card>
            <CardTitle
                title={"Активность"}
            />
            <CardContent>
                <List dense>
                    <ListItem className={classes.listItem}>
                        <ListItemText
                            primary={
                                <Typography>
                                    Заказ № 12789 был размещен
                                </Typography>
                            }
                            secondary={"4 часа назад"}
                        />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemText
                            primary={
                                <Typography>
                                    Заказ № 12789 был размещен
                                </Typography>
                            }
                            secondary={"4 часа назад"}
                        />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemText
                            primary={
                                <Typography>
                                    Заказ № 12789 был размещен
                                </Typography>
                            }
                            secondary={"4 часа назад"}
                        />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemText
                            primary={
                                <Typography>
                                    Заказ № 12789 был размещен
                                </Typography>
                            }
                            secondary={"4 часа назад"}
                        />
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <ListItemText
                            primary={
                                <Typography>
                                    Заказ № 12789 был размещен
                                </Typography>
                            }
                            secondary={"4 часа назад"}
                        />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}

export default HomeActivityCard;