import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Card from './Card'

import data from './imagesData'

//https://www.colombia.co/visita-colombia/experiencias-unicas/12-lugares-que-no-puedes-dejar-de-ver-en-colombia/
//https://padondenosvamos.com/lugares-turisticos-de-colombia/
//https://viajerocasual.com/comidas-tipicas-de-colombia/



export default function Lottery() {
    let initialState = data
    const [items, setItems] = useState([...initialState])

    const [itemsSelected, setItemsSelected] = useState([

    ])

    const drawCard = () => {
        if(items.length > 0){
            setItemsSelected([items.shift(), ...itemsSelected ])
        }
    }

    const resetGame = () => {
        setItems([...initialState])
        setItemsSelected([])
    }

    const shuffleItems = () => {
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        setItems([...items])
    }

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
                <Grid item xs={2}>
                    <Button onClick={() => drawCard()} >Draw a card</Button>
                    <Button onClick={() => resetGame()} >Reset game</Button>
                    <Button onClick={() => shuffleItems()} >Shuffle cards</Button>
                </Grid>
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
