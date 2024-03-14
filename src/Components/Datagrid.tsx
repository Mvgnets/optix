import React from 'react';
import { DataGrid, type GridColDef, type GridRowSelectionModel } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

interface IMovieCompany {
  id: string
  name: string
}

export interface IMovie {
  id: string
  reviews: number[]
  title: string
  filmCompanyId: string
  cost: number
  releaseYear: number
}

interface IDatagridProps {
  companies: IMovieCompany[]
  movies: IMovie[]
  setSelectedMovie: React.Dispatch<React.SetStateAction<IMovie | undefined>>
  setOpenReviewModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const Datagrid = ({ companies, movies, setSelectedMovie, setOpenReviewModal }: IDatagridProps) => {
    const movieColumns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, headerAlign: 'left', align: 'left' },
        {
            field: 'reviews',
            headerName: 'Reviews',
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            valueGetter: (params) => {
                const sum = params.row.reviews.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

                return (sum / params.row.reviews.length).toFixed(1) || '';
            }
        },

        {
            field: 'title',
            headerName: 'Movie Title',
            type: 'number',
            flex: 1,
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'filmCompanyId',
            headerName: 'Film Company',
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            valueGetter: (params) =>
                `${companies.find((item: IMovieCompany) => item.id === params.row.filmCompanyId)?.name || ''}`
        }
    ];

    const onRowsSelectionHandler = (ids: GridRowSelectionModel) => {
        const selectedRowsData = ids.map((id) => movies.find((row) => row.id === id));
        if (selectedRowsData[0]) {
            setSelectedMovie(selectedRowsData[0]);
            setOpenReviewModal(true);
        }
    };

    return (
        <Box width={'100%'}>
            {movies &&
        <DataGrid
            rows={movies}
            columns={movieColumns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5
                    }
                }
            }}
            pageSizeOptions={[5]}
            onRowSelectionModelChange={(ids) => { onRowsSelectionHandler(ids); }}
        />
            }
        </Box>
    );
};
