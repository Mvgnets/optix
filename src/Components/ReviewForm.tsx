import React, { useState } from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import useAxios from 'axios-hooks';
import { type IMovie } from './Datagrid';
import Bowser from 'bowser';

interface Inputs {
    review: number
}

interface IReviewFormProps {
    selectedMovie: IMovie
    openReviewModal: boolean
    setOpenReviewModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ReviewForm = ({ selectedMovie, openReviewModal, setOpenReviewModal }: IReviewFormProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const [toastOpen, setToastOpen] = useState(false);

    const parser = Bowser.getParser(navigator.userAgent);

    const [
        { response },
        executePut
    ] = useAxios(
        {
            url: 'http://localhost:3000/submitReview',
            method: 'post'
        },
        { manual: true }
    );

    const onSubmit = async (data: Inputs): Promise<void> => {
        await executePut({
            data: {
                review: data.review
            }
        }).then(openToast).then(() => { setOpenReviewModal(false); }).catch((error) => { console.log('Error: ' + error); });
        reset();
    };
    const openToast = (): void => {
        setToastOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setToastOpen(false);
    };

    const isMobile = (parser.getPlatformType() === 'mobile' || window.innerWidth < 1000);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    {isMobile
                        ? <Dialog
                            open={openReviewModal}
                        >
                            <DialogTitle>New review</DialogTitle>
                            <DialogContent>
                                <Stack direction={'row'} spacing={1}>
                                    <TextField fullWidth {...register('review', { required: 'Please add a review', maxLength: { value: 100, message: 'Review submissions must be 100 characters or less' } })} id="review" name="review" />
                                </Stack>
                                {errors.review && <Alert severity="error" sx={{ my: 1 }}>{errors.review.message}</Alert>}

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => { setOpenReviewModal(false); }}>Cancel</Button>
                                <Button variant='contained' onClick={handleSubmit(onSubmit)}>Submit</Button>
                            </DialogActions>
                        </Dialog>
                        : <Box>
                            {selectedMovie.title ? 'You have selected ' + selectedMovie.title : 'No Movie Title'}
                            {<p>Please leave a review below</p>}
                            <Stack direction={'row'} spacing={1}>
                                <TextField fullWidth {...register('review', { required: 'Please add a review', maxLength: { value: 100, message: 'Review submissions must be 100 characters or less' } })} id="review" name="review" />
                                <Button variant='contained' type='submit'>Submit</Button>
                            </Stack>
                            {errors.review && <Alert severity="error" sx={{ my: 1 }}>{errors.review.message}</Alert>}
                        </Box>}

                    {response?.data?.message && <Snackbar
                        open={toastOpen}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message={response.data.message}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    />}
                </Box>
            </form>

        </>
    );
};

export default ReviewForm;
