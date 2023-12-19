import {DataGrid, GridColDef, GridRowParams} from '@mui/x-data-grid';
import {Dialog, DialogContent, DialogTitle, Paper} from '@mui/material';
import {AiDataGridProps} from './AiDataGridProps.ts';
import {useState} from 'react';
import {AiMessage} from './AiMessage.ts';

export function AiDataGrid({data}: AiDataGridProps) {
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<AiMessage>({} as AiMessage);

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID',},
        {field: 'message', headerName: 'Message', flex: 1,},
    ];

    const handleRowClick = (rowParams: GridRowParams) => {
        setSelectedRow(rowParams.row);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Paper
            sx={{
                borderRadius: '14px',
                border: '0px',
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.05)',
                width: '100%',
            }}
        ><DataGrid
            sx={{
                borderRadius: '14px',
                color: 'text.secondary',
                fontSize: '.8em',
                border: 0,
                textAlign: 'center',
                '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold',
                },
                '& .MuiDataGrid-cell:hover': {
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)',
                },
                '& .MuiDataGrid-cell': {
                    display: 'flex',
                    width: '100%',
                    borderBottom: '1px solid #F0F0F0',
                },
            }}
            rows={data}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {page: 0, pageSize: 10},
                },
            }}
            onRowClick={handleRowClick}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            autoHeight
            sortModel={[
                {
                    field: 'id',
                    sort: 'desc',
                },
            ]}
        />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Chat GPT Message</DialogTitle>
                <DialogContent sx={{
                    textAlign: 'left'
                }}>
                    {selectedRow?.message && formatMessageText(selectedRow)}
                </DialogContent>
            </Dialog>
        </Paper>
    )
        ;
}

function formatMessageText({id = 0, message}: AiMessage) {
    const regex = /(\d+\.\s+[^:\n]+)(:)?/g;
    const parts = message.split(regex);

    return parts.map((part ) => {
        if (part.match(regex)) {
            return parts[id + 1] === ':' ? <b key={id}>{part}</b> : <strong key={id}>{part}:</strong>;
        } else if (part !== ':') {
            return part.split('\n').map((paragraph) => (
                <p key={`${id}-${id + "p"}`}>{paragraph}</p>
            ));
        }
    }).filter(Boolean); 
}
