import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreHoriz, Edit } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    const handleMenuOpen = (event, company) => {
        setAnchorEl(event.currentTarget);
        setSelectedCompany(company);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCompany(null);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <caption style={{ padding: '10px', textAlign: 'left' }}>A list of your recently registered companies</caption>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Logo</strong></TableCell>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>Date</strong></TableCell>
                        <TableCell align="right"><strong>Action</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterCompany?.map((company) => (
                        <TableRow key={company._id}>
                            <TableCell>
                                <Avatar src={company.logo} alt={company.name} />
                            </TableCell>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={(event) => handleMenuOpen(event, company)}>
                                    <MoreHoriz />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            {/* Popover Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                keepMounted
            >
                <MenuItem onClick={() => { 
                    navigate(`/admin/companies/${selectedCompany?._id}`); 
                    handleMenuClose(); 
                }}>
                    <Edit fontSize="small" style={{ marginRight: 8 }} />
                    Edit
                </MenuItem>
            </Menu>
        </TableContainer>
    );
}

export default CompaniesTable;
