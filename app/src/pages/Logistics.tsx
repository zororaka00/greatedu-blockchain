import React, { useState } from 'react';
import { Container, Card, CardContent, Button, Typography, FormControl, TextField } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';

import InventoryManagementAbi from '../assets/logistics/InventoryManagement.json';

function LogisticsPage() {
    const [textItemName, setTextItemName] = useState('');
    const handleItemName = (event: any) => setTextItemName(event.target.value);
    const [textAddItemName, setTextAddItemName] = useState('');
    const handleAddItemName = (event: any) => setTextAddItemName(event.target.value);
    const [textAddStockQuantity, setAddStockQuantity] = useState('0');
    const handleAddStockQuantity = (event: any) => setAddStockQuantity(event.target.value);
    const [textReduceItemName, setTextReduceItemName] = useState('');
    const handleReduceItemName = (event: any) => setTextReduceItemName(event.target.value);
    const [textReduceStockQuantity, setReduceStockQuantity] = useState('0');
    const handleReduceStockQuantity = (event: any) => setReduceStockQuantity(event.target.value);

    const { address } = useAccount();
    const contractAddressInventoryManagement = '0x8e861e5fda5B6cd7b78b0414f8b3fF3C0cba7b2b';
    const { data: getDataStock } = useContractRead({
        address: contractAddressInventoryManagement,
        abi: InventoryManagementAbi as any,
        functionName: 'inventory',
        args: [textItemName]
    });
    
    const { config: configAddStock } = usePrepareContractWrite({
      address: contractAddressInventoryManagement,
      abi: InventoryManagementAbi,
      functionName: 'addStock',
      args: [textAddItemName, textAddStockQuantity]
    });
    const { write: writeAddStock } = useContractWrite(configAddStock);
    
    const { config: configReduceStock } = usePrepareContractWrite({
      address: contractAddressInventoryManagement,
      abi: InventoryManagementAbi,
      functionName: 'reduceStock',
      args: [textReduceItemName, textReduceStockQuantity]
    });
    const { write: writeReduceStock } = useContractWrite(configReduceStock);
    console.log({ getDataStock });
    return (
        <Container fixed>
        <ConnectButton />
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Logistics (Data Stock)
                    </Typography>
                </CardContent>
                <CardContent>
                    <FormControl>
                        <Typography gutterBottom variant="h5" component="div">
                            Stock: { getDataStock ? Number(getDataStock) : 0 }
                        </Typography>
                        <TextField
                            value={textItemName}
                            onChange={handleItemName}
                            label="Input Item Name" type="text" size='medium' />
                    </FormControl>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Logistics (Add Stock)
                    </Typography>
                </CardContent>
                <CardContent>
                    <FormControl>
                        <TextField
                            value={textAddItemName}
                            onChange={handleAddItemName}
                            label="Input Item Name" type="text" size='medium' />
                        <TextField
                            value={textAddStockQuantity}
                            onChange={handleAddStockQuantity}
                            label="Input Stock Quantity" type="text" size='medium' />
                        <Button
                            onClick={writeAddStock}
                            variant="contained">Submit</Button>
                    </FormControl>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Logistics (Reduce Stock)
                    </Typography>
                </CardContent>
                <CardContent>
                    <FormControl>
                        <TextField
                            value={textReduceItemName}
                            onChange={handleReduceItemName}
                            label="Input Item Name" type="text" size='medium' />
                        <TextField
                            value={textReduceStockQuantity}
                            onChange={handleReduceStockQuantity}
                            label="Input Stock Quantity" type="text" size='medium' />
                        <Button
                            onClick={writeReduceStock}
                            variant="contained">Submit</Button>
                    </FormControl>
                </CardContent>
            </Card>
        </Container>
    );
}

export { LogisticsPage };