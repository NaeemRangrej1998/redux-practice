// import React, { useState, useMemo } from "react";
// import {
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//     Paper, TablePagination, Checkbox, Select, MenuItem
// } from "@mui/material";
// import Papa from "papaparse";
// import HighchartsReact from "highcharts-react-official";
// import Highcharts from "highcharts";
//
// const CSVUpload = () => {
//     const [data, setData] = useState([]); // Stores CSV Data
//     const [headers, setHeaders] = useState([]); // Stores dynamic headers
//     const [selectedColumn, setSelectedColumn] = useState(""); // Column for counting
//     const [selectedRows, setSelectedRows] = useState([]); // Stores selected rows
//
//     // Pagination State
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//
//     // Handle CSV File Upload
//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (!file) return;
//
//         Papa.parse(file, {
//             complete: (result) => {
//                 if (result.data.length > 1) {
//                     setHeaders(Object.keys(result.data[0])); // Extract headers dynamically
//                     setData(result.data.slice(1)); // Remove headers from data
//                     setSelectedColumn(""); // Reset selection
//                     setSelectedRows([]); // Reset selected rows
//                 }
//             },
//             header: true, // Treat first row as headers
//             skipEmptyLines: true, // Avoid empty rows
//         });
//     };
//
//     // Handle Row Selection
//     const handleSelectRow = (index) => {
//         setSelectedRows((prevSelected) =>
//             prevSelected.includes(index)
//                 ? prevSelected.filter((i) => i !== index) // Deselect if already selected
//                 : [...prevSelected, index] // Select if not selected
//         );
//     };
//
//     // Handle Column Selection for Chart
//     const handleColumnChange = (event) => {
//         setSelectedColumn(event.target.value);
//         setSelectedRows([]); // Reset selection when column changes
//     };
//
//     // Pagination Handlers
//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };
//
//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };
//
//     // Memoized Paginated Data (Improves Performance)
//     const paginatedData = useMemo(() => {
//         const start = page * rowsPerPage;
//         const end = start + rowsPerPage;
//         return data.slice(start, end);
//     }, [data, page, rowsPerPage]);
//
//     // Memoized Chart Data (Counts unique values in selected column)
//     const chartData = useMemo(() => {
//         if (!selectedColumn) return [];
//
//         const counts = {}; // Store occurrences
//
//         selectedRows.forEach((index) => {
//             const value = data[index][selectedColumn]; // Get column value
//             counts[value] = (counts[value] || 0) + 1; // Count occurrences
//         });
//
//         return Object.entries(counts).map(([key, count]) => ({ name: key, y: count }));
//     }, [selectedRows, data, selectedColumn]);
//
//     return (
//         <div style={{ padding: 20 }}>
//             <h2>Upload CSV and Analyze Data</h2>
//
//             {/* CSV Upload */}
//             <input type="file" accept=".csv" onChange={handleFileUpload} />
//
//             {/* Dropdown for Column Selection */}
//             {headers.length > 0 && (
//                 <Select value={selectedColumn} onChange={handleColumnChange} displayEmpty style={{ marginLeft: 10 }}>
//                     <MenuItem value="" disabled>Select Column</MenuItem>
//                     {headers.map((header) => (
//                         <MenuItem key={header} value={header}>{header}</MenuItem>
//                     ))}
//                 </Select>
//             )}
//
//             {/* Dynamic Table with Checkboxes */}
//             {headers.length > 0 && (
//                 <TableContainer component={Paper} style={{ marginTop: 10 }}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Select</TableCell>
//                                 {headers.map((header, index) => (
//                                     <TableCell key={index}>{header}</TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {paginatedData.map((row, rowIndex) => {
//                                 const actualIndex = page * rowsPerPage + rowIndex;
//                                 return (
//                                     <TableRow key={actualIndex}>
//                                         <TableCell>
//                                             <Checkbox
//                                                 checked={selectedRows.includes(actualIndex)}
//                                                 onChange={() => handleSelectRow(actualIndex)}
//                                             />
//                                         </TableCell>
//                                         {headers.map((header, colIndex) => (
//                                             <TableCell key={colIndex}>{row[header]}</TableCell>
//                                         ))}
//                                     </TableRow>
//                                 );
//                             })}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//
//             {/* Pagination */}
//             {headers.length > 0 && (
//                 <TablePagination
//                     rowsPerPageOptions={[5, 10, 20, 50]}
//                     component="div"
//                     count={data.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             )}
//
//             {/* Highcharts Visualization */}
//             {selectedRows.length > 0 && selectedColumn && (
//                 <div style={{ marginTop: 30 }}>
//                     <h3>Chart for {selectedColumn}</h3>
//                     <HighchartsReact
//                         highcharts={Highcharts}
//                         options={{
//                             chart: { type: "column" },
//                             title: { text: `Selected ${selectedColumn} Data` },
//                             xAxis: { type: "category" },
//                             yAxis: { title: { text: "Count" } },
//                             series: [{ name: selectedColumn, data: chartData }],
//                         }}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default CSVUpload;
import React, {useState, useMemo} from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TablePagination, Checkbox, Select, MenuItem
} from "@mui/material";
import Papa from "papaparse";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const CSVUpload = () => {
    const [data, setData] = useState([]); // Stores CSV Data
    const [headers, setHeaders] = useState([]); // Dynamic headers
    const [selectedColumn, setSelectedColumn] = useState(""); // Column for analysis
    const [selectedRows, setSelectedRows] = useState([]); // Selected rows
    const [aggregateFunction, setAggregateFunction] = useState("count"); // Default function
    const [chartType, setChartType] = useState("column"); // Default chart type

    // Pagination State
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Handle CSV File Upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            complete: (result) => {
                if (result.data.length > 1) {
                    setHeaders(Object.keys(result.data[0])); // Extract headers dynamically
                    setData(result.data.slice(1)); // Remove headers from data
                    setSelectedColumn(""); // Reset selection
                    setSelectedRows([]); // Reset selected rows
                }
            },
            header: true,
            skipEmptyLines: true,
        });
    };

    // Handle Row Selection
    const handleSelectRow = (index) => {
        setSelectedRows((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index)
                : [...prevSelected, index]
        );
    };

    // Handle Column Selection
    const handleColumnChange = (event) => {
        setSelectedColumn(event.target.value);
        setSelectedRows([]);
    };

    // Handle Aggregate Function Change
    const handleAggregateFunctionChange = (event) => {
        setAggregateFunction(event.target.value);
    };

    // Handle Chart Type Change
    const handleChartTypeChange = (event) => {
        setChartType(event.target.value);
    };

    // Pagination Handlers
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Memoized Paginated Data
    const paginatedData = useMemo(() => {
        const start = page * rowsPerPage;
        const end = start + rowsPerPage;
        return data.slice(start, end);
    }, [data, page, rowsPerPage]);

    // Compute Chart Data Based on Aggregate Function
    const chartData = useMemo(() => {
        if (!selectedColumn) return [];

        const counts = {}; // Store occurrences

        selectedRows.forEach((index) => {
            const value = data[index][selectedColumn]; // Get column value

            if (aggregateFunction === "count") {
                counts[value] = (counts[value] || 0) + 1;
            } else {
                const numericValue = parseFloat(value) || 0; // Convert to number
                counts[value] = (counts[value] || 0) + numericValue;
            }
        });

        if (aggregateFunction === "average") {
            Object.keys(counts).forEach((key) => {
                counts[key] = counts[key] / selectedRows.length || 0;
            });
        }

        return Object.entries(counts).map(([key, value]) => ({name: key, y: value}));
    }, [selectedRows, data, selectedColumn, aggregateFunction]);

    return (
        <div style={{padding: 20}}>
            {/* CSV Upload */}
            <input type="file" accept=".csv" onChange={handleFileUpload}/>

            {headers.length > 0 && (
                <>
                    {/* Dropdowns for Column & Aggregate Function */}
                    <div style={{marginTop: 10}}>
                        <Select value={selectedColumn} onChange={handleColumnChange} displayEmpty
                                style={{marginRight: 10}}>
                            <MenuItem value="" disabled>Select Column</MenuItem>
                            {headers.map((header) => (
                                <MenuItem key={header} value={header}>{header}</MenuItem>
                            ))}
                        </Select>

                        <Select value={aggregateFunction} onChange={handleAggregateFunctionChange}>
                            <MenuItem value="count">Count</MenuItem>
                            <MenuItem value="sum">Sum</MenuItem>
                            <MenuItem value="average">Average</MenuItem>
                        </Select>
                    </div>
                </>
            )}

            {/* Dynamic Table with Checkboxes */}
            {headers.length > 0 && (
                <Paper sx={{width: "100%", overflow: 'hidden', border: "none", elevation: '1'}}>
                    <TableContainer style={{marginTop: 10}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Select</TableCell>
                                    {headers.map((header, index) => (
                                        <TableCell key={index}>{header}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedData.map((row, rowIndex) => {
                                    const actualIndex = page * rowsPerPage + rowIndex;
                                    return (
                                        <TableRow key={actualIndex}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedRows.includes(actualIndex)}
                                                    onChange={() => handleSelectRow(actualIndex)}
                                                />
                                            </TableCell>
                                            {headers.map((header, colIndex) => (
                                                <TableCell key={colIndex}>{row[header]}</TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}

            {/* Pagination */}
            {headers.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}

            {/* Highcharts Visualization */}
            {selectedRows.length > 0 && selectedColumn && (
                <div style={{marginTop: 30}}>
                    {/* Chart Type Dropdown Inside Chart Section */}
                    <div style={{marginBottom: 10}}>
                        <label>Select Chart Type: </label>
                        <Select value={chartType} onChange={handleChartTypeChange} style={{marginLeft: 10}}>
                            <MenuItem value="column">Column</MenuItem>
                            <MenuItem value="bar">Bar</MenuItem>
                            <MenuItem value="pie">Pie</MenuItem>
                            <MenuItem value="line">Line</MenuItem>
                        </Select>
                    </div>

                    <h3>{aggregateFunction.toUpperCase()} for {selectedColumn} - {chartType.toUpperCase()}</h3>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            chart: {type: chartType},
                            title: {text: `${aggregateFunction.toUpperCase()} for ${selectedColumn}`},
                            xAxis: {type: "category"},
                            yAxis: {title: {text: "Value"}},
                            series: [{name: selectedColumn, data: chartData}],
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default CSVUpload;


