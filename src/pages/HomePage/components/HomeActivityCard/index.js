import { Card, CardContent, List, ListItem, ListItemText, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CardTitle from "../../../../components/CardTitle";
import $host from "../../../../http";
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
const [data, setData] = React.useState([]);
const [reload, setReload] = React.useState(1);
React.useEffect(() =>{
    (async () =>{
        try {
            const res = await $host.get(`checkout/checkout/all/?limit=10`);
             setData(res.data.results);
             console.log(res.data.results);
          } catch (error) {
            console.error(error);
          }
        })();
      }, [reload]);

      
      

    return (
        <Card>
            <CardTitle
                title={"Активность"}
            />
            <CardContent>
                <List dense>
                {data?.map((e) =>(
                    <ListItem className={classes.listItem} style={{
                        display: "flex",
                        flexDirection:" column"
                    }}>
                    {e.cart.map((el)=>(
                        <ListItemText
                         primary={
                             <Typography variant="p">
                                Заказ № {el.id} был размещен   
                             </Typography>
                         }
                         secondary={el.created_at}
                     />
                    )) }
                    </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}

export default HomeActivityCard;