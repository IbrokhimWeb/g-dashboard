import { Button, Card, makeStyles, TextField } from "@material-ui/core";
  import { Backlink } from "@saleor/macaw-ui";
  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import CardSpacer from "../components/CardSpacer";
  import Container from "../components/Container";
  import PageHeader from "../components/PageHeader";
  import $host from "../http";
import CardTitle from "../components/CardTitle";
  
  const useStyles = makeStyles((theme) => ({
    mainCardInfo: {
      paddingTop: 0,
      padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
    },
  }));
  
  
  const SliderAdd = (props) => {
    const params = useParams()
      const navigate = useNavigate();
      const [newData, setNewData] = useState(null);
      console.log(newData);
      const classes = useStyles(props);
      
      const handleSubmit = async () => {
          
          const res = await $host.put(`/dashboard/products/${params.id}/`, newData);
          res?.statusText ? navigate("/sliders") : alert("Nimadir hato ketdi");
        };  

        useEffect(() => $host.get(`/dashboard/products${params.id}/`).then((res) => setNewData(res.data.results)).catch((error) => console.error(error)),[]);

    return (
      <Container>
        <Backlink onClick={() => navigate("/products")}>Категории</Backlink>
        <PageHeader title="Создать новую Категории" />
        <div>
          <Card>
            <CardTitle title={"Основная информация"} />
            <div className={classes.mainCardInfo}>
                <TextField type="url" fullWidth label={"Название категории"} name="name" value={newData?.url} onChange={(e) => setNewData(prev => ({...prev, name: e.target.value}) )}/>
                <CardSpacer />
                <TextField type="url" fullWidth label={"Название категории"} name="name" value={newData?.url} onChange={(e) => setNewData(prev => ({...prev, name: e.target.value}) )}/>
                <CardSpacer />
                <TextField type="url" fullWidth label={"Название категории"} name="name" value={newData?.url} onChange={(e) => setNewData(prev => ({...prev, name: e.target.value}) )}/>
            
            </div>
          </Card>

          <Button
            style={{ float: "right", marginTop: "10px", padding: "10px 70px" }}
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </Container>
    );
  };
  
  export default SliderAdd;
  