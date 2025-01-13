import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Table, TableCell,
    TableContainer,
    TableHead,
    TableRow, TableSortLabel
} from "@mui/material";

export const OpenDailog = (props) => {
    const columns = [
        {id: "is_selected", label: "", type: "checkbox"},
        {id: "message_name", label: "Message Name"},
        {id: "signal_name", label: "Signal Name"},
        {id: "signal_unit", label: "Unit"},
        {id: "channel", label: "Channel"},
        {id: "source", label: "Source"},
    ];
    const {
        isOpen, onClose
    } = props;

    return (
        <>
            <h1>Naim</h1>
            <Dialog open={isOpen} onClose={onClose} sx={{'& .MuiDialog-paper': {width: '900px', maxHeight: '1150px'}}}  fullWidth
                    maxWidth="sm">
                <DialogTitle>Update Analysis Tab</DialogTitle>
                <DialogContent>
                    <Grid item xs={12} style={{marginTop: "20px"}}>
                        <div>
                            <Paper sx={{width: "100%", overflow: 'hidden', border: "none", elevation: '0'}}>
                                <TableContainer sx={{border: "none", overflow: "auto"}}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        sx={{
                                                            minWidth: "10px",
                                                            border: "none",
                                                            alignItems: "right"
                                                        }}>
                                                        {column.type === "checkbox" ? (
                                                            <></>
                                                        ) : (
                                                            <TableSortLabel
                                                                classes={{
                                                                    root: "customSortLabel",
                                                                }}
                                                            >
                                                                {column.label}
                                                            </TableSortLabel>
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </div>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default OpenDailog