import React, {useState , useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import io from 'socket.io-client';

import Card from './Card'

import data from './imagesData'

//https://www.colombia.co/visita-colombia/experiencias-unicas/12-lugares-que-no-puedes-dejar-de-ver-en-colombia/
//https://padondenosvamos.com/lugares-turisticos-de-colombia/
//https://viajerocasual.com/comidas-tipicas-de-colombia/

export default function Lottery(props) {

    let initialState = data
    const [items, setItems] = useState([...initialState])

    const [itemsSelected, setItemsSelected] = useState([

    ])
    const [name, setName] = useState("")

    const [socket, setSocket] = useState(null);

    const drawCard = () => {
        if(items.length > 0){
            const newItems = [items.shift(), ...itemsSelected ]
            socket.emit("draw_card", {itemsSelected: newItems, items: items, name: name})
        }
    }

    const resetGame = () => {
        socket.emit("draw_card", {itemsSelected: [], items: [...initialState], name: name})
    }

    const shuffleItems = () => {
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        setItems([...items])
    }
    
    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_SOCKET);
        newSocket.on("set_itemsSelected", data => {
            setItemsSelected(data)
        })
        newSocket.on("set_items", data => {
            setItems(data)
        })
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket])

    return (
        <div>
            <Grid container justifyContent="center"  direction="row" style={{marginTop: 20}}>
                <Grid item xs>
                    <Grid container>
                        {items.map(i => {
                            return (
                            <Grid key={"griditems"+i.id}  item xs={6}>
                                <Card key={"items"+i.id} image={i.background}/>
                            </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                {props.auth && (<Grid item xs={2}>
                    <TextField id="name" label="Name" value={name}  onChange={(e) => setName(e.target.value ?e.target.value  : "")} />
                    <Button onClick={() => drawCard()} >Draw a card</Button>
                    <Button onClick={() => resetGame()} >Reset game</Button>
                    <Button onClick={() => shuffleItems()} >Shuffle cards</Button>
                </Grid>)}
                <Grid item xs>
                    <Grid container>
                        {itemsSelected.map(i => {
                            return (
                            <Grid key={"gridselecteditems"+i.id}  item xs={6}>
                                <Card key={"selecteditems"+i.id}  width={220} height={140} image={i.photo} title={i.name}/>
                            </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
