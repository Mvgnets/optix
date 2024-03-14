import React, { useState } from 'react';
import useAxios from 'axios-hooks';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Datagrid, type IMovie } from './Components/Datagrid';
import { Alert, Container, Skeleton, Stack } from '@mui/material';
import ReviewForm from './Components/ReviewForm';

export const App = () => {
    const [selectedMovie, setSelectedMovie] = useState<IMovie>();
    const [openReviewModal, setOpenReviewModal] = useState(false);

    const [{ data: movieCompanyData, loading: movieCompanyLoading, error: movieCompanyError }, executeCompanies] = useAxios(
        'http://localhost:3000/movieCompanies'
    );

    const [{ data: movieData, loading: movieLoading, error: movieError }, executeMovies] = useAxios(
        'http://localhost:3000/movies'
    );

    const refetch = async () => {
        try {
            await executeCompanies();
            await executeMovies();
        } catch (e) {
            console.log('Error: ' + e);
        }
    };

    const pageLoaded = !movieCompanyLoading && !movieLoading && !movieCompanyError && !movieError;

    return (
        <Container maxWidth="lg">
            <Box>
                <Typography sx={{ textAlign: 'center' }} variant='h2'>Welcome to Movie database!</Typography>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 1 }}>
                    <Box>
                        {pageLoaded && movieData && <Typography>Total movies displayed {movieData.length}</Typography>}
                    </Box>
                    <Button variant="contained" onClick={() => {
                        refetch();
                    }}>Refresh</Button>
                </Stack>

                {selectedMovie && <ReviewForm selectedMovie={selectedMovie} openReviewModal={openReviewModal} setOpenReviewModal={setOpenReviewModal} />}
                {(movieCompanyLoading || movieLoading) && <Skeleton variant="rectangular" width={1152} height={371} />}

                {(movieCompanyError || movieError) && <Alert severity='error'>Error loading data</Alert>}

                {pageLoaded && <Datagrid movies={movieData} companies={movieCompanyData} setSelectedMovie={setSelectedMovie} setOpenReviewModal={setOpenReviewModal} />}
            </Box>
        </Container>
    );
};
