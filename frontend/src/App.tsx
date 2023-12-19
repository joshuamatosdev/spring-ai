import {FormEvent, useEffect, useState} from 'react'
import {Button, CircularProgress, CssBaseline, FormControl, Grid, Stack, TextField} from '@mui/material';
import './App.css';
import axios from 'axios';
import ResponsiveAppBar from './ResponsiveAppBar.tsx';
import {AiMessage} from './AiMessage.tsx';
import {AiDataGrid} from './AiDataGrid.tsx';

function App() {
    const [data, setData] = useState<AiMessage[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (query: string) => {
        setIsLoading(true);
        const url = `http://localhost:8081/ai/search?searchQuery=${encodeURIComponent(query)}`;
        axios.get<AiMessage[]>(url).then((response) => {
            setData(response.data);
        })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });


    };

    const postMessage = async (createMessageProps: AiMessage) => {
        setIsLoading(true);
        const url = `http://localhost:8081/ai`;
        axios.post<AiMessage>(url, createMessageProps, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                fetchData('');
                setSearchQuery('');
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    useEffect(() => {
        fetchData('')
            .catch((error) => {
                console.log(error);
            });
    }, []);


    const handleSearchSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetchData(searchQuery);
    };


    const handleCreateMessage = (event: FormEvent) => {
        event.preventDefault();

        const createMessageProps: AiMessage = {
            message: message,
        };

        postMessage(createMessageProps);
    };

    if (!data) {
        return <div> No data </div>
    }
    const filterData = data.filter((item) => {
        return item.message.toLowerCase().includes(searchQuery.toLowerCase())
    });


    return (
        <Stack width="100%" alignItems="center">
            <CssBaseline/>
            <ResponsiveAppBar/>
            <Grid container gap={3} sx={{width: "100%", maxWidth: '1080px', mt: 5}}>
                <Grid item container display="flex" flexDirection="row" spacing={3}>
                    <Grid item xs={6} gap={2}>
                        <form onSubmit={handleSearchSubmit} style={{width: '100%',}}>
                            <FormControl
                                sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    placeholder="Search messages..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    sx={{mr: 1}}
                                />
                                <Button variant="contained" type="submit">Search</Button>
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid item xs={6}>
                        <form onSubmit={handleCreateMessage} style={{width: '100%',}}>
                            <FormControl
                                sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    placeholder="Search messages..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    sx={{mr: 1}}
                                />
                                <Button variant="contained" type="submit">Chat</Button>
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid item
                          xs={12}
                          sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              flexGrow: 1,
                          }}
                    >
                        {
                            isLoading ? <CircularProgress
                                size="10rem"
                                sx={{
                                    color: '#000',
                                    justifyContent: 'center', mt: 20
                                }}
                            /> : <AiDataGrid data={filterData}/>
                        }
                    </Grid>
                </Grid></Grid>
        </Stack>
    );
}

export default App;


