import "./CardNews.scss"
import { useState, useEffect } from 'react';
import axios from 'axios'
import dateFormat from "dateformat";
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from "../SearchInput/SearchInput"
import { connect } from 'react-redux';
import parse from 'html-react-parser'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

const CardNews = (value: any) => {
    

    interface Inews {
        featured: Boolean
        id: number
        imageUrl: "string"
        newsSite: "string"
        publishedAt: "string"
        summary: "string"
        title: "string"
        url: "string"
    }

    const [globalArrOfData, setGlobalArrOfData] = useState<Inews[]>()


    useEffect(() => {
        // Make a request for a user with a given ID
        axios.get('https://api.spaceflightnewsapi.net/v3/articles?_limit=100')
            .then(function (response: any) {
                // handle success
                setGlobalArrOfData(response.data)
            })
            .catch(function (error: any) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])

    const [inputText, setInputText] = useState<string>("")

    //marking by yellow
    let insertMarkHandler = (string: string, pos: number, len: number) => {
        let t1 = string.slice(0, 200)
        return parse(t1.slice(0, pos) + "<mark>" + t1.slice(pos, pos + len) + "</mark>" + t1.slice(pos + len))
    }


    //searching in the titles
    let globalArrOfDataFiltered = globalArrOfData?.filter((el) => {
        return inputText ? el.title.includes(inputText) : true
    })

   


     //cheking in the summary list and add to filtered array
    if (globalArrOfDataFiltered && globalArrOfData) {
        globalArrOfDataFiltered = globalArrOfDataFiltered.concat(
            globalArrOfData?.filter((el) => {
                return el.summary.includes(inputText)
            })
        )
        globalArrOfDataFiltered = [... new Set(globalArrOfDataFiltered)] //delete doubling objects
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={0.5}>
                    </Grid>
                    <Grid item xs={11.0}>
                        <div className="filter-label monts-600"> Filter by keywords</div>
                        <Toolbar>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    onChange={(e) => {
                                        setInputText(e.target.value)
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Toolbar>

                        <div
                            className="results monts-600"> Results: {globalArrOfDataFiltered ? globalArrOfDataFiltered.length : null}</div>
                        <div className="containerCards">

                            {globalArrOfDataFiltered ? globalArrOfDataFiltered.map((el, index) =>
                                <div className="cardNews" key={el.id || index}>
                                    <div className="imgCard"><img src={el.imageUrl}
                                        alt={"Unfortunately this image is not available"}
                                        className="imgCard" /></div>
                                    <div className="dates monts">{dateFormat(el.publishedAt, "mmmm dS, yyyy")}</div>

                                    <div className="title monts">{
                                        (el.title.search(inputText) === -1)
                                            ? el.title.slice(0, 200)
                                            : insertMarkHandler(el.title, el.title.search(inputText), inputText.length)
                                    }</div>

                                    <div className="small-content monts">{
                                        (el.summary.search(inputText) === -1)
                                            ? el.summary.slice(0, 200)
                                            : insertMarkHandler(el.summary, el.summary.search(inputText), inputText.length)
                                    }</div>

                                    <Link to={`/solo/${el.id}`} className="arrow monts-600-bold"> <img
                                        src={require('./arrow.png')} className="imgArrow" /> Read More</Link>
                                </div>
                            ) : null}
                        </div>
                    </Grid>
                    <Grid item xs={0.4}>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export function mapStateToProps({ value }: any) {
    return {
        value,
    };
}

export default connect(mapStateToProps, null)(CardNews);
//export default CardNews;