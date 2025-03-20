import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsTreemap from "highcharts/modules/treemap";

// Initialize the Treemap module
if (typeof HighchartsTreemap === "function") {
    HighchartsTreemap(Highcharts);
}

const TreemapChart = () => {
    const sqlResult = [
        ["Softvan", "bi"], ["Softvan", "Nimesh"], ["Softvan", "VIshal"], ["Softvan", "Sunil"],
        ["Softvan", "test"], ["Softvan", "Test"], ["Softvan", "Sunil"], ["BAPS Shatabdi Mahotsav", "org"],
        ["BAPS Shatabdi Mahotsav", "NesterBI"], ["Survey", "Shaishav"], ["Survey", "Darshan"],
        ["Survey", "Ravi"], ["Survey", "Abhishek"], ["Survey", "Ishani"], ["SPORTS COMMISSION", "Brinda"],
        ["SPORTS COMMISSION", "Rohan"], ["SPORTS COMMISSION", "Test"], ["SPORTS COMMISSION", "Harshal"],
        ["SPORTS COMMISSION", "shaishav"], ["SPORTS COMMISSION", "Darshan"], ["SPORTS COMMISSION", "Naim"],
        ["Inc", "Nester"], ["Stark", "test"], ["DEMO CHEMICALS", "Root"], ["DEMO CHEMICALS", "Sandipsinh"],
        ["DEMO CHEMICALS", "ALPS CHEMICAL"], ["DEMO CHEMICALS", "Hemangi"], ["DEMO CHEMICALS", "Simran"],
        ["DEMO CHEMICALS", "Harshil"], ["Demo-Org", "test"], ["Demo-Org", "demo"], ["Demo-Org", "Data"],
        ["Softvan HRMS", "Manushi"], ["Ravin", "test"], ["Ravin", "Sanjay"], ["Sparsh", "Shivam"],
        ["Sparsh", "Soham"], ["APS", "Harshal"], ["APS", "Vraj"], ["Army", "Himanshu"], ["Army", "hevin"],
        ["Army", "Harsh"], ["samved", "Super"], ["samved", "rushikesh"]
    ];

// // Step 1: Assign unique IDs to each organization (A, B, C, ...)
//     const organizations = {};
//     let idCounter = 65; // ASCII 'A'
//
//     sqlResult.forEach(([org]) => {
//         if (!organizations[org]) {
//             organizations[org] = String.fromCharCode(idCounter++);
//         }
//     });
//
// // Step 2: Generate the treemap data for organizations
//     const treemapData = Object.keys(organizations).map(org => ({
//         id: organizations[org],
//         name: org,
//         color: `#${Math.floor(Math.random() * 16777215).toString(16)}` // Random color
//     }));
//
// // Step 3: Add users as children of organizations
//     sqlResult.forEach(([org, user]) => {
//         treemapData.push({
//             name: user,
//             parent: organizations[org],
//             value: Math.floor(Math.random() * 5000) + 1000 // Random value for visualization
//         });
//     });
// Step 1: Get unique organizations
    const uniqueOrganizations = [...new Set(sqlResult.map(([org]) => org))];
    const uniqueOrganizations1=[...new Set(sqlResult.map((item)=>item))]
    console.log(uniqueOrganizations)
// Step 2: Generate the treemap data for organizations
    const treemapData = uniqueOrganizations.map(org => ({
        id: org,  // Use organization name as ID
        name: org,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}` // Random color
    }));

// Step 3: Add users as children of organizations
    sqlResult.forEach(([org, user]) => {
        treemapData.push({
            name: user,
            parent: org,  // Use the organization name as parent ID
            value: Math.floor(Math.random() * 5000) + 1000 // Random value for visualization
        });
    });
// Step 4: Print the JSON output
    console.log(JSON.stringify(treemapData, null, 2));

    const options = {
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'stripes',
            alternateStartingDirection: true,
            borderColor: '#ffffff',
            borderRadius: 6,
            borderWidth: 2,
            dataLabels: {
                style: {
                    textOutline: 'none'
                }
            },
            levels: [{
                level: 1,
                layoutAlgorithm: 'strip',
                dataLabels: {
                    enabled: true,
                    align: 'left',
                    verticalAlign: 'top',
                    style: {
                        fontSize: '15px',
                        fontWeight: 'bold'
                    }
                }
            }],
            data: treemapData
        }],
        title: {
            text: 'Norwegian regions and counties by area',
            align: 'left'
        },
        subtitle: {
            text:
                'Source: <a href="https://snl.no/Norge" target="_blank">SNL</a>',
            align: 'left'
        },
        tooltip: {
            useHTML: true,
            pointFormat:
                'The area of <b>{point.name}</b> is <b>{point.value} km<sup>' +
                '2</sup></b>'
        }
    };

    return <HighchartsReact highcharts={Highcharts} options={options} containerProps={{
        style: {
            width: "100%",
            height: "400%"
        }
    }}/>;
};

export default TreemapChart;
