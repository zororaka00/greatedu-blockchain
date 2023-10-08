import React, { useState } from 'react';
import { Container, Card, CardContent, Button, Typography, FormControl, TextField, Select, MenuItem } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';

import MedicalCheckupAbi from '../assets/healthcare/MedicalCheckup.json';

function HealthcarePage() {
    const [textId, setTextId] = useState('0');
    const handleId = (event: any) => setTextId(event.target.value);
    const [textIdentityHash, setTextIdentityHash] = useState('');
    const handleIdentityHash = (event: any) => setTextIdentityHash(event.target.value);
    const [textIsHealthy, setIsHealthy] = useState(0);
    const handleIsHealthy = (event: any) => setIsHealthy(event.target.value);

    const { address } = useAccount();
    const contractAddressMedicalCheckup = '0xD3a812aa6574dDF2748b43a7b4b7E6DC590683F5';
    const { data: getDataCheckup } = useContractRead({
        address: contractAddressMedicalCheckup,
        abi: MedicalCheckupAbi as any,
        functionName: 'dataCheckup',
        args: [textId]
    });
    
    const { config: configMedicalCheckup } = usePrepareContractWrite({
      address: contractAddressMedicalCheckup,
      abi: MedicalCheckupAbi,
      functionName: 'newDataCheckup',
      args: [textIdentityHash, textIsHealthy == 1 ? true : false]
  });
  const { write: writeNewDataCheckup } = useContractWrite(configMedicalCheckup);
  console.log({ getDataCheckup });
    return (
        <Container fixed>
        <ConnectButton />
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Healthcare (Data Checkup)
                    </Typography>
                </CardContent>
                <CardContent>
                    <FormControl>
                        <Typography gutterBottom variant="h5" component="div">
                            Identity Hash: { getDataCheckup && (getDataCheckup as any)[0] != '' ? (getDataCheckup as any)[0] : '-' }<br/>
                            Is Healthy: { getDataCheckup && (getDataCheckup as any)[0] != '' ? String((getDataCheckup as any)[1]) : '-' }<br/>
                            Created Date: { getDataCheckup && (getDataCheckup as any)[0] != '' ? String(new Date(Number((getDataCheckup as any)[2]) * 1000)) : '-' }
                        </Typography>
                        <TextField
                            value={textId}
                            onChange={handleId}
                            label="Input Id" type="text" size='medium' />
                    </FormControl>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Healthcare (New Data Checkup)
                    </Typography>
                </CardContent>
                <CardContent>
                    <FormControl>
                        <TextField
                            value={textIdentityHash}
                            onChange={handleIdentityHash}
                            label="Input Identity Hash" type="text" size='medium' />
                        <Select
                            value={textIsHealthy}
                            onChange={handleIsHealthy}
                        >
                            <MenuItem value={1}>True</MenuItem>
                            <MenuItem value={0}>False</MenuItem>
                        </Select>
                        <Button
                            onClick={writeNewDataCheckup}
                            variant="contained">Submit</Button>
                    </FormControl>
                </CardContent>
            </Card>
        </Container>
    );
}

export { HealthcarePage };